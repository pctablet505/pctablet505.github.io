---
layout: default
title: "pctablet505 (Rahul Kumar): machine learning engineer"
description: "pctablet505 is Rahul Kumar, a machine learning engineer who makes ML models smaller and faster and measures what each change bought."
image: /assets/social.png
---

<header class="top">
  <svg class="lamp" viewBox="0 0 64 64" aria-hidden="true"><path class="c" d="M32 0V18" stroke-width="5"/><rect class="c" x="25" y="16" width="14" height="9.5" rx="2.5" stroke-width="0"/><circle class="b" cx="32" cy="42.5" r="15.75" stroke-width="2.5"/></svg>
  <div class="who">
    <img src="/assets/images/sketch.jpg" alt="Rahul Kumar" width="84" height="84">
    <div>
      <h1 class="wordmark">pctablet505</h1>
      <p class="role">Rahul Kumar, machine learning engineer</p>
      <p class="now">Software engineer at Google, working on XProf</p>
    </div>
  </div>
  <p class="lede">Smaller, faster ML models. I make them fit and run well on phones, NPUs and single GPUs, then measure what each change bought.</p>
  <ul class="links">
    <li><a href="mailto:work.rahul126@gmail.com">work.rahul126@gmail.com</a></li>
    <li><a href="https://www.linkedin.com/in/pctablet505/">LinkedIn</a></li>
    <li><a href="https://github.com/pctablet505">GitHub</a></li>
  </ul>
</header>

<div class="stats">
  <div><b>10.8 → 15.0</b><span>tokens/s for a 181 GiB LLM on one 96 GiB GPU</span></div>
  <div><b>100</b><span>merged pull requests in 38 open-source projects</span></div>
  <div><b>3x</b><span>faster inference on a phone's NPU and DSP</span></div>
</div>

<h2>Selected work</h2>

<h3>GLM-5.3-Flash on one GPU: 10.8 → 15.0 tokens/s</h3>
<p class="meta">September 2026 · <a href="https://github.com/pctablet505/glm53-flash-single-gpu">repository</a> · <a href="https://dev.to/pctablet505/a-hot-expert-cache-made-a-181-gib-model-faster-on-one-96-gib-gpu-4b03">write-up</a></p>
<figure>
  <a href="https://github.com/pctablet505/glm53-flash-single-gpu">
  <picture>
    <source media="(max-width: 600px)" srcset="/assets/glm53-decode-narrow.svg">
    <img src="/assets/glm53-decode.svg" width="880" height="420" alt="Decode speed in tokens per second: plain offloading 10.77, with a gather kernel 13.53, with a cache of the busiest experts 16.50 at peak, 14.99 as shipped. Router pruning reached 20.48 but was not shipped because it hurt the output.">
  </picture>
  </a>
</figure>
<ul>
  <li><strong>Gather kernel:</strong> reads experts in wide blocks. 10.8 → 13.5 tokens/s.</li>
  <li><strong>Busiest experts cached:</strong> 35% of the experts get 74% of the picks. 16.5 at peak, 15.0 shipped.</li>
  <li><strong>Long prompts:</strong> grouped staging, 614 → 1,750 tokens/s.</li>
  <li><strong>Not shipped:</strong> router pruning, 24% faster but worse output. <a href="https://github.com/pctablet505/glm53-flash-single-gpu/blob/main/RUNNING-GLM53-ON-ONE-GPU.md">The eight bugs →</a></li>
</ul>

<h3>LiteRT export in Keras and KerasHub</h3>
<p class="meta">Open source, 2025 to 2026</p>
<ul>
  <li>One call from a trained model to a file a phone can run (<a href="https://github.com/keras-team/keras/pull/21674">keras#21674</a>, <a href="https://github.com/keras-team/keras-hub/pull/2405">keras-hub#2405</a>), then the PyTorch backend too (<a href="https://github.com/keras-team/keras/pull/22758">keras#22758</a>).</li>
  <li>Wrote <a href="https://keras.io/guides/litert_export/">the keras.io guide</a>.</li>
  <li>Llama 3.1 in KerasHub, and <a href="https://github.com/keras-team/keras/issues/22561">fixes</a> for Keras on PyTorch running about 9x slower in eager mode.</li>
</ul>

<h2>Experience</h2>

<div class="job">
  <h3>Google · Software Engineer, Machine Learning</h3>
  <p class="meta">February 2025 to now · India</p>
  <ul>
    <li>Now: <a href="https://github.com/openxla/xprof">XProf</a>, the open-source ML profiler.</li>
    <li>Before, on the Keras team: LiteRT export, weekly benchmarks across GPU, TPU and three backends, a Keras 3 migration for a major internal customer.</li>
  </ul>
</div>

<div class="job">
  <h3>Qualcomm · ML Engineer, Computer Vision</h3>
  <p class="meta">September 2024 to January 2025 · Hyderabad</p>
  <ul>
    <li>3x faster inference on the Snapdragon NPU and DSP.</li>
    <li>75% less memory bandwidth with quantization-aware training.</li>
    <li>Magic Keeper inpainting for the Snapdragon Summit demo.</li>
  </ul>
</div>

<div class="job">
  <h3>Samsung R&amp;D Institute India · Research and Development Engineer</h3>
  <p class="meta">July 2022 to August 2024 · Noida (intern from January 2022)</p>
  <ul>
    <li>Knox Capture: damaged barcodes read 70% → 90%, trained on 10M synthetic images.</li>
    <li>Face recognition at 99.2% accuracy and 30+ FPS on edge devices; lookup 1,200 → 87 ms.</li>
    <li>Exam proctoring for 2,000+ employees. MD Appreciation Award.</li>
    <li>Drop detection: millions of parameters → under 20, at 95% less power.</li>
  </ul>
</div>

<h2>Open source</h2>
<p><a href="https://github.com/search?q=is%3Apr+author%3Apctablet505+is%3Amerged+-user%3Apctablet505&amp;type=pullrequests">100 merged pull requests in 38 projects</a> (26 October 2026), 64 in Keras and KerasHub. Also <a href="https://github.com/pypa/pip/pull/14179">pip</a>, <a href="https://github.com/pydantic/pydantic/pull/13452">pydantic</a>, <a href="https://github.com/microsoft/pyright/pull/11547">pyright</a> and <a href="https://github.com/vllm-project/vllm/pull/56129">vLLM</a>.</p>

<h2>Side projects</h2>
<ul>
  <li><a href="https://porchlamp.org/">Porchlamp</a>: which open-source projects answer a stranger's pull request.</li>
  <li><a href="https://rlalphalabs.com/">RL Alpha Labs</a>: trading ideas tested after real costs and tax.</li>
  <li><a href="https://servedeck.rlalphalabs.com/">Servedeck</a>: switch local LLMs on one GPU with one command.</li>
  <li><a href="https://github.com/pctablet505/flakehound">flakehound</a>: finds flaky pytest tests by their pattern.</li>
</ul>

<h2>Writing</h2>
<ul>
  <li><a href="https://dev.to/pctablet505/a-hot-expert-cache-made-a-181-gib-model-faster-on-one-96-gib-gpu-4b03">A hot-expert cache made a 181 GiB model faster on one 96 GiB GPU</a></li>
  <li><a href="https://keras.io/guides/litert_export/">Exporting Keras models to LiteRT</a></li>
  <li><a href="https://dev.to/pctablet505/why-a-keras-model-fails-to-convert-to-tflite-11-known-cases-5-traps-5bb0">Why a Keras model fails to convert to TFLite: 11 known cases, 5 traps</a></li>
</ul>

<h2>Education</h2>
<ul>
  <li>B.Tech, Computer Science and Engineering, Birsa Institute of Technology Sindri, 2022.</li>
  <li>MicroMasters in Statistics and Data Science, MITx (MIT, online), 2023.</li>
</ul>

<h2>Contact</h2>
<p>Open to ML performance and on-device AI roles. <a href="mailto:work.rahul126@gmail.com">work.rahul126@gmail.com</a> · <a href="https://www.linkedin.com/in/pctablet505/">LinkedIn</a></p>

<footer>
  <svg viewBox="0 0 64 64" aria-hidden="true"><path d="M32 0V18" stroke="currentColor" stroke-width="5"/><rect x="25" y="16" width="14" height="9.5" rx="2.5" fill="currentColor"/><circle cx="32" cy="42.5" r="15.75" fill="#f59e0b" stroke="#b45309" stroke-width="2.5"/></svg>
  <span>pctablet505 · updated 27 October 2026</span>
</footer>

<script type="application/ld+json">
{"@context": "https://schema.org", "@type": "Person", "@id": "https://pctablet505.github.io/#person", "name": "Rahul Kumar", "alternateName": "pctablet505", "url": "https://pctablet505.github.io/", "image": "https://pctablet505.github.io/assets/images/sketch.jpg", "jobTitle": "Machine learning engineer", "description": "Machine learning engineer who makes ML models smaller and faster and measures what each change bought. Builder of Porchlamp and RL Alpha Labs.", "knowsAbout": ["Model optimization", "Quantization", "On-device AI", "LLM inference", "Mixture-of-experts models", "ML profiling", "Keras", "LiteRT", "PyTorch", "JAX", "Computer vision"], "alumniOf": {"@type": "CollegeOrUniversity", "name": "Birsa Institute of Technology Sindri"}, "affiliation": {"@id": "https://rlalphalabs.com/#organization"}, "sameAs": ["https://github.com/pctablet505", "https://www.linkedin.com/in/pctablet505/", "https://dev.to/pctablet505", "https://hashnode.com/@pctablet505", "https://medium.com/@pctablet505", "https://x.com/pctablet505", "https://www.kaggle.com/pctablet505"]}
</script>
