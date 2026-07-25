#!/usr/bin/env bash
# One-shot pipeline runner for Q1 Hindi ASR
set -e

echo "============================================"
echo " Q1: Hindi ASR Fine-tuning Pipeline"
echo "============================================"

echo "[1/3] Installing dependencies..."
pip install -r requirements.txt

echo "[2/3] Preprocessing dataset..."
python step1_preprocess.py

echo "[3/3] Fine-tuning Whisper-small..."
python step2_finetune.py

echo "[4/4] Evaluating on FLEURS Hindi..."
python step3_evaluate.py

echo ""
echo "DONE! Check wer_results.csv for WER table."
