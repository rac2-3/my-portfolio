# Question 1 — Hindi ASR: Preprocessing, Fine-tuning & Evaluation

## Project Structure

```
Q1_Hindi_ASR/
├── requirements.txt         # Python dependencies
├── step1_preprocess.py      # Data download & preprocessing
├── step2_finetune.py        # Whisper-small fine-tuning
├── step3_evaluate.py        # FLEURS evaluation + WER table
├── run_all.sh               # One-shot runner
└── README.md                # This file
```

---

## Setup

```bash
pip install -r requirements.txt
```

> **GPU strongly recommended.** Training on CPU will be extremely slow.  
> A single NVIDIA T4/V100 takes ~4–6 hours for 4000 steps on ~10h data.

---

## Step 1 — Data Preprocessing

### What the script does (`step1_preprocess.py`)

| Step | Operation | Detail |
|------|-----------|--------|
| 1 | **Download audio** | Fetches `.wav`/`.mp3` files from `rec_url_gcp` |
| 2 | **Download transcriptions** | Fetches text from `transcription_url` (txt or JSON) |
| 3 | **Duration filtering** | Skips clips < 1s or > 30s (Whisper's hard limit) |
| 4 | **Resampling** | All audio → 16 kHz mono (Whisper requirement) |
| 5 | **Amplitude normalisation** | Peak-normalise to ±0.9 |
| 6 | **Silence trimming** | `librosa.effects.trim(top_db=30)` removes leading/trailing silence |
| 7 | **Text cleaning** | Strip control chars, collapse whitespace, remove non-Hindi punctuation, lowercase English |
| 8 | **Manifest generation** | Saves `data/processed_manifest.csv` + HF-format `train_manifest.json` |

```bash
python step1_preprocess.py
```

---

## Step 2 — Fine-tune Whisper-small

### Training configuration

| Hyperparameter | Value |
|----------------|-------|
| Base model | `openai/whisper-small` |
| Language | Hindi |
| Task | Transcribe |
| Learning rate | 1e-5 |
| Batch size | 16 (effective 32 with grad-accum=2) |
| Warmup steps | 500 |
| Max steps | 4000 |
| Eval / save every | 500 steps |
| FP16 | Yes (if GPU available) |
| Train/Val split | 95% / 5% |
| Best model criterion | Lowest validation WER |

```bash
python step2_finetune.py
```

Output saved to `whisper-small-hindi-finetuned/`

---

## Step 3 — Evaluate on FLEURS Hindi

Evaluates both models on the **FLEURS `hi_in` test split** (automatically downloaded from HuggingFace).

```bash
python step3_evaluate.py
```

### Expected WER Results

| Model | WER (%) |
|-------|---------|
| Whisper-small (Pretrained Baseline) | ~69–72 |
| Whisper-small (Fine-tuned, ~10h Hindi) | ~30–42 |

> *Actual numbers depend on data quality and hardware. Run `step3_evaluate.py` to get your exact numbers — it prints and saves `wer_results.csv`.*

---

## Run Everything

```bash
# Install deps
pip install -r requirements.txt

# Full pipeline
python step1_preprocess.py
python step2_finetune.py
python step3_evaluate.py
```

---

## Notes

- The FLEURS dataset is downloaded automatically via `datasets.load_dataset("google/fleurs", "hi_in")`.
- `wer_results.csv`, `results_baseline.csv`, `results_finetuned.csv` are saved in the working directory after evaluation.
- Fine-tuned model checkpoints are in `whisper-small-hindi-finetuned/`.
