---
layout: splash
title: "Rahul Kumar"
excerpt: >
  **ML Engineer @ Google Core ML (Keras)** — I make frontier GenAI models (Gemma, Llama)
  run on edge devices, and I build the open-source infrastructure that gets them there.
header:
  overlay_color: "#0d1117"
  overlay_filter: 0.8
  actions:
    - label: "GitHub"
      url: "https://github.com/pctablet505"
    - label: "LinkedIn"
      url: "https://linkedin.com/in/rahul126"
    - label: "Email"
      url: "mailto:work.rahul126@gmail.com"
---

<style>
.stat-row{display:flex;flex-wrap:wrap;gap:.6rem .8rem;justify-content:center;margin:1.4rem auto .6rem;max-width:920px}
.stat-row>span{background:rgba(88,166,255,.08);border:1px solid rgba(88,166,255,.28);border-radius:999px;padding:.42rem .9rem;font-size:.92rem;line-height:1.2;white-space:nowrap}
.stat-row strong{color:#58a6ff}
</style>

<div class="stat-row">
  <span><strong>60+</strong> merged PRs to Google's Keras ecosystem</span>
  <span><strong>1,003</strong> contributions / yr</span>
  <span><strong>75%</strong> memory ↓ via QAT</span>
  <span><strong>10M+</strong> synthetic samples</span>
  <span>Top <strong>0.05%</strong> HackerRank Algorithms</span>
</div>

---

## Open-Source Impact
{: #open-source-impact}

60 merged PRs across Google's Keras ecosystem: **keras-team/keras** (40), **keras-team/keras-hub** (15), **keras-team/keras-io** (3), **google-ai-edge/litert-torch** (2). Contribution stats (last 12 months): 145 commits · 92 PRs · 26 issues · 10 reviews · 1,003 total contributions.

**Notable pull requests:**

| Repo | PR | Description |
|---|---|---|
| keras-team/keras | [#22758](https://github.com/keras-team/keras/pull/22758) | Add LiteRT export support for PyTorch backend |
| keras-team/keras | [#23186](https://github.com/keras-team/keras/pull/23186) | perf(torch): SDPA is_causal dispatch + bounded causal-mask cache in MultiHeadAttention |
| keras-team/keras | [#23189](https://github.com/keras-team/keras/pull/23189) | perf(torch): fast paths in convert_to_tensor/cast (+ fix spurious .to()) |
| keras-team/keras | [#22822](https://github.com/keras-team/keras/pull/22822) | Fix namespace hijacking and callable injection in deserialize_keras_object (security) |
| keras-team/keras-hub | [#2705](https://github.com/keras-team/keras-hub/pull/2705) | Implement KerasHub → LiteRT-LM export with prefill/decode signatures |
| keras-team/keras-hub | [#2773](https://github.com/keras-team/keras-hub/pull/2773) | Fix Gemma3/3n/4 preprocessor crashes with Python-only tokenizer |
| keras-team/keras-io | [#2373](https://github.com/keras-team/keras-io/pull/2373) | Guide: Exporting Keras models to LiteRT with PyTorch backend (official docs) |
| google-ai-edge/litert-torch | [#1024](https://github.com/google-ai-edge/litert-torch/pull/1024) | Fail fast on dynamic_shapes and guard arange rewrite for symbolic args |

---

## Experience
{: #experience}

### Software Engineer — Machine Learning · Google Core ML / Keras Team
**Feb 2025 – Present · Hyderabad, India**
`Python` `Keras` `TensorFlow` `PyTorch` `JAX` `LiteRT` `ONNX` `OpenVINO` `Starlark`

- Shipped LiteRT export for the PyTorch backend in Keras 3, enabling on-device deployment of PyTorch-trained models via TensorFlow Lite / LiteRT.
- Built LiteRT-LM export for KerasHub with prefill/decode signatures — on-device LLM inference (Gemma 3 270M on Android, end-to-end validated).
- Implemented Keras-native Llama 3.1 and Multimodal Gemma 3; fixed 4/8-bit quantization instabilities across backends.
- Migrated Adbrain ad-recommendation model to Keras 3.
- Authored the official [Keras.io guide for LiteRT export](https://github.com/keras-team/keras-io/pull/2373), adopted as canonical ecosystem documentation.
- Patched a namespace-hijacking vulnerability in `deserialize_keras_object` affecting model deserialization security.
- 75+ PRs across keras, keras-hub, keras-io, and litert-torch: bug fixes, perf optimizations, cross-backend compatibility (TF 2.20 / Python 3.13 / Orbax).

---

### Machine Learning Engineer · Qualcomm
**Sept 2024 – Jan 2025 · Hyderabad, India**
`Python` `C++` `DSP` `Snapdragon` `LiteRT` `Android` `NPU` `Kotlin`

- Applied QAT (Quantization-Aware Training), reducing memory bandwidth 75% on Snapdragon mobile SoCs.
- Redesigned "Magic Keeper" generative inpainting for Snapdragon Summit demo (NPU/DSP-accelerated).
- Built voice-controlled Camera Copilot demo for on-device AI pipeline showcases.
- Delivered hardware-accelerated Android demos with GPU, DSP, and NPU delegation for client benchmarking.

---

### R&D Engineer — Computer Vision · Samsung R&D Institute India (SRI-N)
**Jan 2022 – Sept 2024 · Noida, India**
`Python` `Kotlin` `Java` `Android` `YOLO` `Mask R-CNN` `U-Net` `OpenCV` `TFLite`

- **Knox Capture:** Built end-to-end damaged-barcode scanning — 10M+ synthetic samples generated via geometric/probabilistic transforms; accuracy 70% → 90% using YOLOv11, Mask R-CNN, U-Net.
- **SRIN-Satyapan:** Anti-cheat proctored exam platform serving 2,000+ concurrent users; 10,000+ registered faces; real-time face-recognition auth on Android + web portal.
- **Face recognition optimization:** Reduced embedding search O(n) → O(log n); lookup time 1,200 ms → 87 ms on Android tablets.
- **Drop detection:** Replaced a deep learning model with statistical feature engineering — 99% parameter reduction, 95% power reduction, accuracy drop <2%.
- MD Appreciation Award from Samsung R&D Managing Director for SRIN-Satyapan.

---

## Projects
{: #projects}

### Keras / KerasHub OSS — LiteRT Export Pipeline
On-device deployment infrastructure for frontier models (Gemma, Llama, Flux diffusion) via Google's Keras ecosystem. Covers PyTorch-backend export, LiteRT-LM prefill/decode, and the official keras.io documentation.

[View PRs on GitHub →](https://github.com/keras-team/keras/pulls?q=is%3Apr+author%3Apctablet505)

---

### RL Alpha Labs — Algorithmic Trading with Reinforcement Learning
JAX-native PPO and DQN agents trading across 746 NSE instruments with 3.5+ years OHLCV data. 128 vectorized environments for parallel rollout. Full portfolio management simulation with risk controls.

[Live Demo →](https://pctablet505.github.io/RLAlphaLabs/) · [Code →](https://github.com/pctablet505/AlgoTrading)

---

### ATS Optimizer
Automated job-application pipeline: ATS scoring (NLP keyword extraction + semantic similarity), LLM-powered resume tailoring, multi-portal scraping (LinkedIn, Indeed), and automated form submission. Built for 50+ applications per day.

[Code →](https://github.com/pctablet505/ats-optimizer)

---

## Skills
{: #skills}

**Core ML & GenAI**
Keras · TensorFlow · PyTorch · JAX · Quantization (QAT/PTQ) · Transformers (Llama / Gemma) · Diffusion Models · LoRA/PEFT · Reinforcement Learning

**Computer Vision**
OpenCV · Object Detection · Image Segmentation · Face Recognition · Synthetic Data Generation

**Edge & On-Device AI**
LiteRT / TFLite · ONNX · OpenVINO · Android NDK/JNI · Hexagon DSP · NPU/GPU Delegation

**Data & Statistics**
NumPy · Pandas · Feature Engineering · Probabilistic Modeling · Hypothesis Testing

**Languages**
Python · C++ · Java · Kotlin · SQL · Starlark · Bash

**Tooling**
Android Studio · Jetpack Compose · Django · Flask · Docker · CI/CD · Git

---

## Achievements
{: #achievements}

- **HackerRank Python — Global Rank #1** among all competitive programmers on the platform.
- **HackerRank Algorithms — Global Rank 1,026 / 2,219,538** (top 0.05%). [[leaderboard]](https://www.hackerrank.com/leaderboard?filter=stopslavery404&filter_on=hacker&page=1&track=algorithms&type=practice)
- **HackerRank Data Structures — Global Rank 540 / 931,788** (top 0.06%).
- **HackFest 2020 — Gold Medal, Global Rank 29 / 8,051.** Rating: 1500 → 2042. [[result]](https://www.hackerrank.com/results/hackerrank-hackfest-2020/stopslavery404)
- **TCS CodeVita Season 9 — International Rank 242** (Round 2).
- **TCS CodeVita Season 10 — International Rank 426** (Round 1).
- **World Programming Championship (IIT Bombay Techfest) — Global Rank 69.**
- **MD Appreciation Award — Samsung Research**, for architecting and delivering SRIN-Satyapan.
- **GATE 2021 — AIR 5,648** among 1,000,000+ candidates.
- **Van Emde Boas Tree** — first historically correct Python implementation with O(n log log u) space optimization. [[code]](https://github.com/pctablet505/van-Emde-Boas-Tree)

---

## Education
{: #education}

**MITx MicroMasters in Statistics and Data Science** · 2021–2023  
[micromasters.mit.edu/ds](https://micromasters.mit.edu/ds/)

**B.Tech Computer Science Engineering · BIT Sindri** · 2018–2022  
[bitsindri.ac.in](https://www.bitsindri.ac.in/)

---

## Contact
{: #contact}

- **Email:** [work.rahul126@gmail.com](mailto:work.rahul126@gmail.com)
- **GitHub:** [github.com/pctablet505](https://github.com/pctablet505)
- **LinkedIn:** [linkedin.com/in/rahul126](https://linkedin.com/in/rahul126)
- **HackerRank:** [hackerrank.com/stopslavery404](https://www.hackerrank.com/stopslavery404)
- **Résumé:** _TODO: upload PDF to assets/ and link here_

<style>
.stat-row {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem 2.5rem;
  justify-content: center;
  background: rgba(255,255,255,0.06);
  border: 1px solid rgba(255,255,255,0.12);
  padding: 1.25rem 1.5rem;
  border-radius: 6px;
  margin: 1.5rem 0 2rem;
  font-size: 0.95rem;
}
.stat-row span {
  color: #cdd6f4;
}
</style>
