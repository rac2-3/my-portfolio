"""
Step 2: Fine-tune Whisper-small on Hindi ASR Dataset
=====================================================
Uses HuggingFace Transformers + datasets to fine-tune
openai/whisper-small on the preprocessed Hindi data.
"""

import os
import json
import torch
import numpy as np
from dataclasses import dataclass
from typing import Any, Dict, List, Union

import evaluate
from datasets import Dataset, Audio
from transformers import (
    WhisperFeatureExtractor,
    WhisperTokenizer,
    WhisperProcessor,
    WhisperForConditionalGeneration,
    Seq2SeqTrainingArguments,
    Seq2SeqTrainer,
)

# ─────────────────────────────────────────────
# CONFIG
# ─────────────────────────────────────────────
MODEL_NAME      = "openai/whisper-small"
LANGUAGE        = "Hindi"
TASK            = "transcribe"
TRAIN_MANIFEST  = "data/train_manifest.json"
OUTPUT_DIR      = "whisper-small-hindi-finetuned"
SAMPLE_RATE     = 16000
TRAIN_SPLIT     = 0.95   # 95% train, 5% validation

# Training hyperparameters
BATCH_SIZE         = 16
GRAD_ACCUM_STEPS   = 2
LEARNING_RATE      = 1e-5
WARMUP_STEPS       = 500
MAX_STEPS          = 4000
EVAL_STEPS         = 500
SAVE_STEPS         = 500
FP16               = torch.cuda.is_available()
DATALOADER_WORKERS = 4


# ─────────────────────────────────────────────
# LOAD DATA
# ─────────────────────────────────────────────
def load_manifest(path: str) -> Dataset:
    """Load JSON-lines manifest and return a HuggingFace Dataset."""
    records = []
    with open(path, encoding="utf-8") as f:
        for line in f:
            records.append(json.loads(line.strip()))
    ds = Dataset.from_list(records)
    # Cast 'audio' column so HF loads and resamples automatically
    ds = ds.cast_column("audio", Audio(sampling_rate=SAMPLE_RATE))
    return ds


# ─────────────────────────────────────────────
# FEATURE EXTRACTION
# ─────────────────────────────────────────────
feature_extractor = WhisperFeatureExtractor.from_pretrained(MODEL_NAME)
tokenizer = WhisperTokenizer.from_pretrained(
    MODEL_NAME, language=LANGUAGE, task=TASK
)
processor = WhisperProcessor.from_pretrained(
    MODEL_NAME, language=LANGUAGE, task=TASK
)


def prepare_dataset(batch):
    """Convert raw audio + text into Whisper model inputs."""
    audio = batch["audio"]
    # Compute log-mel spectrogram
    batch["input_features"] = feature_extractor(
        audio["array"],
        sampling_rate=audio["sampling_rate"],
        return_tensors="pt",
    ).input_features[0]
    # Tokenize transcription
    batch["labels"] = tokenizer(batch["sentence"]).input_ids
    return batch


# ─────────────────────────────────────────────
# DATA COLLATOR
# ─────────────────────────────────────────────
@dataclass
class DataCollatorSpeechSeq2SeqWithPadding:
    processor: Any
    decoder_start_token_id: int

    def __call__(self, features: List[Dict[str, Union[List[int], torch.Tensor]]]):
        # Pad input_features
        input_features = [{"input_features": f["input_features"]} for f in features]
        batch = self.processor.feature_extractor.pad(input_features, return_tensors="pt")

        # Pad labels
        label_features = [{"input_ids": f["labels"]} for f in features]
        labels_batch = self.processor.tokenizer.pad(label_features, return_tensors="pt")
        labels = labels_batch["input_ids"].masked_fill(
            labels_batch.attention_mask.ne(1), -100
        )
        # Remove decoder_start_token if prepended
        if (labels[:, 0] == self.decoder_start_token_id).all().cpu().item():
            labels = labels[:, 1:]
        batch["labels"] = labels
        return batch


# ─────────────────────────────────────────────
# WER METRIC
# ─────────────────────────────────────────────
metric = evaluate.load("wer")


def compute_metrics(pred):
    pred_ids   = pred.predictions
    label_ids  = pred.label_ids
    label_ids[label_ids == -100] = tokenizer.pad_token_id

    pred_str  = tokenizer.batch_decode(pred_ids,  skip_special_tokens=True)
    label_str = tokenizer.batch_decode(label_ids, skip_special_tokens=True)

    wer = 100 * metric.compute(predictions=pred_str, references=label_str)
    return {"wer": wer}


# ─────────────────────────────────────────────
# MAIN TRAINING
# ─────────────────────────────────────────────
def main():
    print("Loading dataset …")
    dataset = load_manifest(TRAIN_MANIFEST)

    # Train / Validation split
    split = dataset.train_test_split(test_size=1 - TRAIN_SPLIT, seed=42)
    train_ds = split["train"]
    val_ds   = split["test"]
    print(f"  Train: {len(train_ds)} | Val: {len(val_ds)}")

    # Feature extraction
    print("Extracting features …")
    train_ds = train_ds.map(
        prepare_dataset,
        remove_columns=train_ds.column_names,
        num_proc=4,
    )
    val_ds = val_ds.map(
        prepare_dataset,
        remove_columns=val_ds.column_names,
        num_proc=4,
    )

    # Model
    model = WhisperForConditionalGeneration.from_pretrained(MODEL_NAME)
    model.generation_config.language = LANGUAGE
    model.generation_config.task     = TASK
    model.generation_config.forced_decoder_ids = None

    # Data collator
    data_collator = DataCollatorSpeechSeq2SeqWithPadding(
        processor=processor,
        decoder_start_token_id=model.config.decoder_start_token_id,
    )

    # Training args
    training_args = Seq2SeqTrainingArguments(
        output_dir=OUTPUT_DIR,
        per_device_train_batch_size=BATCH_SIZE,
        gradient_accumulation_steps=GRAD_ACCUM_STEPS,
        learning_rate=LEARNING_RATE,
        warmup_steps=WARMUP_STEPS,
        max_steps=MAX_STEPS,
        gradient_checkpointing=True,
        fp16=FP16,
        evaluation_strategy="steps",
        per_device_eval_batch_size=8,
        predict_with_generate=True,
        generation_max_length=225,
        save_steps=SAVE_STEPS,
        eval_steps=EVAL_STEPS,
        logging_steps=25,
        report_to=["tensorboard"],
        load_best_model_at_end=True,
        metric_for_best_model="wer",
        greater_is_better=False,
        push_to_hub=False,
        dataloader_num_workers=DATALOADER_WORKERS,
    )

    # Trainer
    trainer = Seq2SeqTrainer(
        args=training_args,
        model=model,
        train_dataset=train_ds,
        eval_dataset=val_ds,
        data_collator=data_collator,
        compute_metrics=compute_metrics,
        tokenizer=processor.feature_extractor,
    )

    print("Starting training …")
    trainer.train()

    # Save final model
    trainer.save_model(OUTPUT_DIR)
    processor.save_pretrained(OUTPUT_DIR)
    print(f"\nModel saved to → {OUTPUT_DIR}/")


if __name__ == "__main__":
    main()
