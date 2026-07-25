"""
Step 1: Data Preprocessing for Hindi ASR Dataset
=================================================
This script downloads and preprocesses ~10 hours of Hindi ASR training data
from the provided dataset schema (GCP URLs).

Dataset Schema:
  - user_id       : Speaker identifier
  - recording_id  : Unique recording ID
  - language      : Language tag (e.g., 'hi')
  - duration      : Audio duration in seconds
  - rec_url_gcp   : URL to raw audio file (GCP)
  - transcription_url : URL to ground-truth transcription
  - metadata_url  : URL to recording metadata
"""

import os
import json
import requests
import pandas as pd
import numpy as np
import librosa
import soundfile as sf
from pathlib import Path
from tqdm import tqdm
import re

# ─────────────────────────────────────────────
# CONFIG
# ─────────────────────────────────────────────
DATASET_CSV    = "dataset.csv"      # Path to the manifest CSV provided by Josh Talks
RAW_AUDIO_DIR  = "data/raw_audio"
PROC_AUDIO_DIR = "data/processed_audio"
TRANS_DIR      = "data/transcriptions"
META_DIR       = "data/metadata"
TRAIN_MANIFEST = "data/train_manifest.json"

TARGET_SR      = 16000   # Whisper expects 16 kHz mono
MAX_DURATION   = 30      # seconds — Whisper max input length
MIN_DURATION   = 1       # skip very short clips

os.makedirs(RAW_AUDIO_DIR, exist_ok=True)
os.makedirs(PROC_AUDIO_DIR, exist_ok=True)
os.makedirs(TRANS_DIR, exist_ok=True)
os.makedirs(META_DIR, exist_ok=True)


# ─────────────────────────────────────────────
# HELPERS
# ─────────────────────────────────────────────
def download_file(url: str, dest_path: str) -> bool:
    """Download a file from URL to dest_path. Returns True on success."""
    if os.path.exists(dest_path):
        return True  # already cached
    try:
        r = requests.get(url, timeout=60)
        r.raise_for_status()
        with open(dest_path, "wb") as f:
            f.write(r.content)
        return True
    except Exception as e:
        print(f"  [WARN] Failed to download {url}: {e}")
        return False


def load_transcription(trans_path: str) -> str:
    """Read transcription text from a downloaded file (txt or json)."""
    try:
        with open(trans_path, "r", encoding="utf-8") as f:
            content = f.read().strip()
        # If JSON, extract the 'text' field
        try:
            data = json.loads(content)
            if isinstance(data, dict):
                return data.get("text", data.get("transcription", "")).strip()
            if isinstance(data, list):
                return " ".join([d.get("text", "") for d in data]).strip()
        except json.JSONDecodeError:
            return content  # plain text
    except Exception:
        return ""


def clean_text(text: str) -> str:
    """
    Normalize Hindi transcription text:
    - Remove extra whitespace
    - Strip punctuation except Devanagari danda (।)
    - Lowercase English characters (for code-switched text)
    - Remove non-printable characters
    """
    # Remove non-printable / control characters
    text = re.sub(r'[\x00-\x1f\x7f]', '', text)
    # Collapse multiple spaces
    text = re.sub(r'\s+', ' ', text).strip()
    # Remove punctuation except Devanagari danda and apostrophe
    text = re.sub(r"[^\u0900-\u097F\u0020a-zA-Z0-9।']", '', text)
    # Lowercase any English portions
    text = text.lower()
    return text


def preprocess_audio(src_path: str, dst_path: str) -> dict:
    """
    Load audio, resample to 16 kHz mono, normalize amplitude.
    Returns stats dict.
    """
    try:
        audio, sr = librosa.load(src_path, sr=None, mono=True)
        duration_orig = len(audio) / sr

        # Resample to 16 kHz
        if sr != TARGET_SR:
            audio = librosa.resample(audio, orig_sr=sr, target_sr=TARGET_SR)

        duration_final = len(audio) / TARGET_SR

        # Peak normalization to [-0.9, 0.9]
        peak = np.max(np.abs(audio))
        if peak > 0:
            audio = audio / peak * 0.9

        # Trim leading/trailing silence (top_db=30 for Hindi speech)
        audio, _ = librosa.effects.trim(audio, top_db=30)

        # Save as 16-bit WAV
        sf.write(dst_path, audio, TARGET_SR, subtype="PCM_16")

        return {
            "duration_before": round(duration_orig, 2),
            "duration_after":  round(len(audio) / TARGET_SR, 2),
            "orig_sr":         sr,
            "resampled":       sr != TARGET_SR,
        }
    except Exception as e:
        print(f"  [WARN] Audio preprocessing failed for {src_path}: {e}")
        return {}


# ─────────────────────────────────────────────
# MAIN PREPROCESSING PIPELINE
# ─────────────────────────────────────────────
def preprocess_dataset(csv_path: str) -> pd.DataFrame:
    """
    Full preprocessing pipeline.
    Returns a DataFrame of valid (processed_audio_path, transcription) pairs.
    """
    df = pd.read_csv(csv_path)
    print(f"Loaded dataset: {len(df)} rows")

    records = []
    stats = {
        "total": len(df),
        "downloaded_ok": 0,
        "skipped_duration": 0,
        "skipped_empty_trans": 0,
        "skipped_audio_error": 0,
        "final_count": 0,
    }

    for _, row in tqdm(df.iterrows(), total=len(df), desc="Preprocessing"):
        rec_id    = str(row["recording_id"])
        lang      = str(row.get("language", "hi"))
        duration  = float(row.get("duration", 0))

        # ── Skip based on declared duration ──────────────────────────────
        if duration < MIN_DURATION or duration > MAX_DURATION:
            stats["skipped_duration"] += 1
            continue

        # ── Download audio ────────────────────────────────────────────────
        raw_audio_path = os.path.join(RAW_AUDIO_DIR, f"{rec_id}.wav")
        if not download_file(str(row["rec_url_gcp"]), raw_audio_path):
            stats["skipped_audio_error"] += 1
            continue

        # ── Download transcription ────────────────────────────────────────
        trans_path = os.path.join(TRANS_DIR, f"{rec_id}.txt")
        if not download_file(str(row["transcription_url"]), trans_path):
            stats["skipped_empty_trans"] += 1
            continue
        text = clean_text(load_transcription(trans_path))
        if not text:
            stats["skipped_empty_trans"] += 1
            continue

        # ── Download metadata (optional) ──────────────────────────────────
        meta_path = os.path.join(META_DIR, f"{rec_id}.json")
        download_file(str(row.get("metadata_url", "")), meta_path)

        # ── Preprocess audio ──────────────────────────────────────────────
        proc_audio_path = os.path.join(PROC_AUDIO_DIR, f"{rec_id}.wav")
        audio_stats = preprocess_audio(raw_audio_path, proc_audio_path)
        if not audio_stats:
            stats["skipped_audio_error"] += 1
            continue

        # Re-check duration after trimming
        actual_dur = audio_stats.get("duration_after", duration)
        if actual_dur < MIN_DURATION or actual_dur > MAX_DURATION:
            stats["skipped_duration"] += 1
            continue

        stats["downloaded_ok"] += 1
        records.append({
            "recording_id":    rec_id,
            "user_id":         row.get("user_id", ""),
            "language":        lang,
            "audio_path":      proc_audio_path,
            "transcription":   text,
            "duration":        actual_dur,
        })

    stats["final_count"] = len(records)
    print("\n=== Preprocessing Stats ===")
    for k, v in stats.items():
        print(f"  {k:30s}: {v}")

    result_df = pd.DataFrame(records)
    result_df.to_csv("data/processed_manifest.csv", index=False)
    print(f"\nSaved processed manifest → data/processed_manifest.csv")
    return result_df


def save_hf_manifest(df: pd.DataFrame, out_path: str):
    """
    Save in HuggingFace datasets-compatible JSON lines format.
    Each line: {"audio": "path/to/file.wav", "sentence": "transcription"}
    """
    import json
    records = []
    for _, row in df.iterrows():
        records.append({
            "audio":    row["audio_path"],
            "sentence": row["transcription"],
            "id":       row["recording_id"],
            "duration": row["duration"],
        })
    with open(out_path, "w", encoding="utf-8") as f:
        for r in records:
            f.write(json.dumps(r, ensure_ascii=False) + "\n")
    print(f"Saved HF manifest → {out_path}")


# ─────────────────────────────────────────────
# ENTRY POINT
# ─────────────────────────────────────────────
if __name__ == "__main__":
    df = preprocess_dataset(DATASET_CSV)
    save_hf_manifest(df, TRAIN_MANIFEST)

    print(f"\nDataset Summary:")
    print(f"  Total valid samples : {len(df)}")
    print(f"  Total duration      : {df['duration'].sum() / 3600:.2f} hours")
    print(f"  Avg duration        : {df['duration'].mean():.2f}s")
    print(f"  Min / Max duration  : {df['duration'].min():.1f}s / {df['duration'].max():.1f}s")
