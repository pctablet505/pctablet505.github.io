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
  <p class="lede">Smaller, faster ML models. I make them fit and run well on hardware smaller than they were built for: phones, NPUs, a single GPU. Then I measure what each change actually bought.</p>
  <ul class="links">
    <li><a href="mailto:work.rahul126@gmail.com">work.rahul126@gmail.com</a></li>
    <li><a href="https://www.linkedin.com/in/pctablet505/">LinkedIn</a></li>
    <li><a href="https://github.com/pctablet505">GitHub</a></li>
  </ul>
</header>

<h2>Selected work</h2>

<h3>A model nearly twice the size of the GPU's memory, from 10.8 to 16.5 tokens a second</h3>
<p class="meta">GLM-5.3-Flash on one 96 GiB GPU, September 2026 · <a href="https://github.com/pctablet505/glm53-flash-single-gpu">repository</a></p>
<figure>
  <a href="https://github.com/pctablet505/glm53-flash-single-gpu"><img src="/assets/glm53-decode.svg" width="880" height="420" alt="Decode speed in tokens per second: plain offloading 10.77, with a gather kernel 13.53, with a cache of the busiest experts 16.50 at peak, 14.99 as shipped. Router pruning reached 20.48 but was not shipped because it hurt the output."></a>
</figure>
<p>GLM-5.3-Flash is a 181 GiB mixture-of-experts model. Most of its weights sit in 288 experts per layer, and each token uses only 8, so most of the model can live in system memory. But then every token waits on expert reads, and plain offloading ran it at 10.8 tokens a second.</p>
<ul>
  <li><strong>A gather kernel</strong> I wrote, which reads experts in wide, contiguous blocks: 13.5 tokens a second.</li>
  <li><strong>A cache of the busiest experts.</strong> 35% of the experts get 74% of the router's picks, so I moved more of the model off the GPU and spent the freed memory on those: 16.5 at peak, 15.0 in the shipped setup, which leaves room for long prompts.</li>
  <li><strong>Grouped staging for long prompts:</strong> prompt reading went from 614 to about 1,750 tokens a second.</li>
</ul>
<p>What did not ship: router pruning was 24% faster but visibly hurt the output. One of the eight bugs on the way gave no error at all; the model just repeated the same token forever. <a href="https://github.com/pctablet505/glm53-flash-single-gpu/blob/main/RUNNING-GLM53-ON-ONE-GPU.md">The eight bugs, in order</a> · <a href="https://dev.to/pctablet505/a-hot-expert-cache-made-a-181-gib-model-faster-on-one-96-gib-gpu-4b03">the write-up</a></p>

<h3>Keras and KerasHub: from a trained model to a phone</h3>
<p class="meta">Open source, 2025 to 2026</p>
<p>I built the LiteRT export path in Keras and KerasHub, which turns a trained model into a file a phone can run (<a href="https://github.com/keras-team/keras/pull/21674">keras#21674</a>, <a href="https://github.com/keras-team/keras-hub/pull/2405">keras-hub#2405</a>). Then I made it work for models trained on the PyTorch backend (<a href="https://github.com/keras-team/keras/pull/22758">keras#22758</a>) and wrote <a href="https://keras.io/guides/litert_export/">the keras.io guide</a> for it. I also implemented Llama 3.1 in KerasHub, and traced why Keras on PyTorch ran about nine times slower than plain PyTorch on small models in eager mode; <a href="https://github.com/keras-team/keras/issues/22561">a series of merged fixes</a> followed.</p>

<h2>Experience</h2>

<div class="job">
  <h3>Google · Software Engineer, Machine Learning</h3>
  <p class="meta">February 2025 to now · India</p>
  <ul>
    <li>Now: <a href="https://github.com/openxla/xprof">XProf</a>, the open-source profiling and performance-analysis tool for machine learning.</li>
    <li>Before that, on the Keras team: the LiteRT export path in Keras and KerasHub; a benchmarking system that runs every Keras and KerasHub model weekly across GPU, TPU and three backends to catch performance regressions; the migration of a major internal customer from legacy Keras to Keras 3; Llama 3.1 in KerasHub; and fixes for the per-call overhead of Keras on PyTorch.</li>
  </ul>
</div>

<div class="job">
  <h3>Qualcomm · ML Engineer, Computer Vision</h3>
  <p class="meta">September 2024 to January 2025 · Hyderabad</p>
  <ul>
    <li>Models optimized for the Snapdragon NPU and DSP: 3x faster inference.</li>
    <li>Quantization-aware training for image-processing models: 75% less memory bandwidth.</li>
    <li>Re-engineered the Magic Keeper generative inpainting feature (object removal) for the Snapdragon Summit demo, to fit the NPU and DSP latency budgets.</li>
  </ul>
</div>

<div class="job">
  <h3>Samsung R&amp;D Institute India · Research and Development Engineer</h3>
  <p class="meta">July 2022 to August 2024 · Noida (intern from January 2022)</p>
  <ul>
    <li>Knox Capture, a barcode scanner: damaged-barcode reading taken from 70% to 90% accuracy, with 10M+ synthetic training images and YOLO, Mask R-CNN and U-Net.</li>
    <li>Real-time face recognition on edge devices at 99.2% accuracy and 30+ FPS. Face search moved to an O(log n) index: 1,200 ms to 87 ms per lookup for 10,000+ users.</li>
    <li>An AI exam-proctoring system used for 2,000+ employees across 100+ tests: 60% less administrative overhead. MD Appreciation Award.</li>
    <li>Drop detection with engineered sensor features instead of a deep model: from millions of parameters to under 20, at 95% less power.</li>
  </ul>
</div>

<h2>Open source</h2>
<p><a href="https://github.com/search?q=is%3Apr+author%3Apctablet505+is%3Amerged+-user%3Apctablet505&amp;type=pullrequests">100 merged pull requests in 38 projects</a> I don't maintain, counted on 26 October 2026; 64 of them in Keras and KerasHub. A few from elsewhere:</p>
<ul>
  <li><a href="https://github.com/pypa/pip/pull/14179">pip#14179</a>: pass the SSL context to HTTPS proxy connections too.</li>
  <li><a href="https://github.com/pydantic/pydantic/pull/13452">pydantic#13452</a>: interval bounds of zero were silently dropped.</li>
  <li><a href="https://github.com/microsoft/pyright/pull/11547">pyright#11547</a>: a false positive in the unnecessary-comparison check for bytes-like types.</li>
  <li><a href="https://github.com/vllm-project/vllm/pull/56129">vllm#56129</a>: tests for how reasoning content is mirrored in chat message parsing.</li>
</ul>

<h2>Side projects and tools</h2>
<ul>
  <li><a href="https://porchlamp.org/">Porchlamp</a> ranks open-source projects by what happens to a stranger's pull request. In the <a href="https://porchlamp.org/black-holes/2026-10-27/">27 October 2026 snapshot</a>, 13.6% of 4,169 active projects left most outside pull requests unanswered for two weeks.</li>
  <li><a href="https://rlalphalabs.com/">RL Alpha Labs</a> tests trading ideas on Indian stock-market data after real costs and tax, and publishes <a href="https://rlalphalabs.com/notes/ideas-we-closed/">the ones that failed</a>. No live money is traded.</li>
  <li><a href="https://servedeck.rlalphalabs.com/">Servedeck</a> switches between local LLMs on one Linux GPU machine with one command, behind one OpenAI-compatible endpoint.</li>
  <li><a href="https://github.com/pctablet505/flakehound">flakehound</a> finds flaky pytest tests by their pattern, with rules for JAX, PyTorch and NumPy. Alpha.</li>
</ul>

<h2>Writing</h2>
<ul>
  <li><a href="https://dev.to/pctablet505/a-hot-expert-cache-made-a-181-gib-model-faster-on-one-96-gib-gpu-4b03">A hot-expert cache made a 181 GiB model faster on one 96 GiB GPU</a> (DEV, October 2026)</li>
  <li><a href="https://keras.io/guides/litert_export/">Exporting Keras models to LiteRT</a> (keras.io guide, July 2026)</li>
  <li><a href="https://dev.to/pctablet505/why-a-keras-model-fails-to-convert-to-tflite-11-known-cases-5-traps-5bb0">Why a Keras model fails to convert to TFLite: 11 known cases, 5 traps</a> (DEV, October 2026)</li>
</ul>

<h2>Education</h2>
<ul>
  <li>B.Tech in Computer Science and Engineering, Birsa Institute of Technology Sindri, 2022.</li>
  <li>MicroMasters credential in Statistics and Data Science, MITx (MIT, online), 2023: five graduate-level courses with proctored exams.</li>
</ul>

<h2>Contact</h2>
<p>Open to roles in ML performance, inference optimization, on-device AI and ML infrastructure. Email <a href="mailto:work.rahul126@gmail.com">work.rahul126@gmail.com</a>, or message me on <a href="https://www.linkedin.com/in/pctablet505/">LinkedIn</a>.</p>

<footer>
  <svg viewBox="0 0 64 64" aria-hidden="true"><path d="M32 0V18" stroke="currentColor" stroke-width="5"/><rect x="25" y="16" width="14" height="9.5" rx="2.5" fill="currentColor"/><circle cx="32" cy="42.5" r="15.75" fill="#f59e0b" stroke="#b45309" stroke-width="2.5"/></svg>
  <span>pctablet505 · updated 27 October 2026</span>
</footer>

<script type="application/ld+json">
{"@context": "https://schema.org", "@type": "Person", "@id": "https://pctablet505.github.io/#person", "name": "Rahul Kumar", "alternateName": "pctablet505", "url": "https://pctablet505.github.io/", "image": "https://pctablet505.github.io/assets/images/sketch.jpg", "jobTitle": "Machine learning engineer", "description": "Machine learning engineer who makes ML models smaller and faster and measures what each change bought. Builder of Porchlamp and RL Alpha Labs.", "knowsAbout": ["Model optimization", "Quantization", "On-device AI", "LLM inference", "Mixture-of-experts models", "ML profiling", "Keras", "LiteRT", "PyTorch", "JAX", "Computer vision"], "alumniOf": {"@type": "CollegeOrUniversity", "name": "Birsa Institute of Technology Sindri"}, "affiliation": {"@id": "https://rlalphalabs.com/#organization"}, "sameAs": ["https://github.com/pctablet505", "https://www.linkedin.com/in/pctablet505/", "https://dev.to/pctablet505", "https://hashnode.com/@pctablet505", "https://medium.com/@pctablet505", "https://x.com/pctablet505", "https://www.kaggle.com/pctablet505"]}
</script>
