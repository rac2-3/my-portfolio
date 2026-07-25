"""
Step 3: Evaluate Whisper-small (Baseline & Fine-tuned) on FLEURS Hindi
=======================================================================
Computes Word Error Rate (WER) for:
  1. openai/whisper-small  (pretrained baseline)
  2. whisper-small-hindi-finetuned  (our model)
on the Hindi split of the FLEURS benchmark.
"""

import torch
import evaluate
from datasets import load_dataset, Audio
from transformers import (
    WhisperForConditionalGeneration,
    WhisperProcessor,
)
from tqdm import tqdm
import pandas as pd

# ─────────────────────────────────────────────
# CONFIG
# ─────────────────────────────────────────────
BASELINE_MODEL  = "openai/whisper-small"
FINETUNED_MODEL = "whisper-small-hindi-finetuned"   # local path
LANGUAGE        = "Hindi"
TASK            = "transcribe"
BATCH_SIZE      = 8
DEVICE          = "cuda" if torch.cuda.is_available() else "cpu"
SAMPLE_RATE     = 16_000


# ─────────────────────────────────────────────
# LOAD FLEURS HINDI TEST SET
# ─────────────────────────────────────────────
def load_fleurs_hindi() -> "datasets.Dataset":
    """Load the Hindi test split of FLEURS from HuggingFace."""
    print("Loading FLEURS Hindi test set …")
    fleurs = load_dataset("google/fleurs", "hi_in", split="test", trust_remote_code=True)
    fleurs = fleurs.cast_column("audio", Audio(sampling_rate=SAMPLE_RATE))
    print(f"  {len(fleurs)} test examples loaded")
    return fleurs


# ─────────────────────────────────────────────
# TRANSCRIPTION PIPELINE
# ─────────────────────────────────────────────
def transcribe_dataset(model_path: str, dataset, batch_size: int = BATCH_SIZE):
    """
    Run inference on a HuggingFace dataset using Whisper.
    Returns list of (prediction, reference) tuples.
    """
    print(f"\nLoading model: {model_path}")
    processor = WhisperProcessor.from_pretrained(model_path, language=LANGUAGE, task=TASK)
    model     = WhisperForConditionalGeneration.from_pretrained(model_path).to(DEVICE)
    model.eval()

    forced_decoder_ids = processor.get_decoder_prompt_ids(language=LANGUAGE, task=TASK)

    predictions = []
    references  = []

    for i in tqdm(range(0, len(dataset), batch_size), desc=f"Transcribing [{model_path}]"):
        batch = dataset.select(range(i, min(i + batch_size, len(dataset))))

        # Build input features
        input_features = processor(
            [s["array"] for s in batch["audio"]],
            sampling_rate=SAMPLE_RATE,
            return_tensors="pt",
            padding=True,
        ).input_features.to(DEVICE)

        with torch.no_grad():
            pred_ids = model.generate(
                input_features,
                forced_decoder_ids=forced_decoder_ids,
            )

        pred_texts = processor.batch_decode(pred_ids, skip_special_tokens=True)
        # FLEURS uses 'transcription' column
        ref_texts  = batch["transcription"]

        predictions.extend(pred_texts)
        references.extend(ref_texts)

    return predictions, references


# ─────────────────────────────────────────────
# WER COMPUTATION
# ─────────────────────────────────────────────
def compute_wer(predictions, references) -> float:
    metric = evaluate.load("wer")
    return 100 * metric.compute(predictions=predictions, references=references)


# ─────────────────────────────────────────────
# MAIN EVALUATION
# ─────────────────────────────────────────────
def main():
    fleurs_test = load_fleurs_hindi()

    results = {}

    # ── 1. Baseline ───────────────────────────────────────────────────────
    preds_base, refs = transcribe_dataset(BASELINE_MODEL, fleurs_test)
    wer_base = compute_wer(preds_base, refs)
    results["Whisper-small (Baseline)"] = wer_base
    print(f"Baseline WER: {wer_base:.2f}%")

    # Save baseline predictions for inspection
    pd.DataFrame({"reference": refs, "prediction": preds_base}).to_csv(
        "results_baseline.csv", index=False, encoding="utf-8"
    )

    # ── 2. Fine-tuned ─────────────────────────────────────────────────────
    preds_ft, refs = transcribe_dataset(FINETUNED_MODEL, fleurs_test)
    wer_ft = compute_wer(preds_ft, refs)
    results["Whisper-small (Fine-tuned on Hindi ~10h)"] = wer_ft
    print(f"Fine-tuned WER: {wer_ft:.2f}%")

    # Save fine-tuned predictions
    pd.DataFrame({"reference": refs, "prediction": preds_ft}).to_csv(
        "results_finetuned.csv", index=False, encoding="utf-8"
    )

    # ── 3. Results Table ──────────────────────────────────────────────────
    print("\n" + "=" * 55)
    print(f"{'Model':<40} {'WER (%)':>10}")
    print("=" * 55)
    for model_name, wer in results.items():
        print(f"{model_name:<40} {wer:>10.2f}")
    print("=" * 55)

    improvement = wer_base - wer_ft
    print(f"\nRelative improvement: {improvement:.2f}% absolute | "
          f"{improvement / wer_base * 100:.1f}% relative")

    # Save table as CSV
    df_results = pd.DataFrame(
        [{"Model": k, "WER (%)": round(v, 2)} for k, v in results.items()]
    )
    df_results.to_csv("wer_results.csv", index=False)
    print("\nSaved → wer_results.csv")


if __name__ == "__main__":
    main()
