# pctablet505: profile

Everything pctablet505.github.io says comes from this file and only from this file. Edit a fact here and every page,
export and tool that uses it changes with it. Format: [docs/PROFILE-FORMAT.md](docs/PROFILE-FORMAT.md). Everything here is public.

## Identity
```yaml
handle: pctablet505
name: Rahul Kumar
# The slogan, used on every profile; the lede is the short story under it, and the lamp is the symbol. Its three parts
# are not sentences: written inline with commas, and shown one per line without full stops.
headline: "Big models, small places, real numbers"
lede: "The model you need rarely fits where it has to run, and the number you are shown is rarely the one that decides. I work on both: vision and sensing on phones, large models on one GPU, and automated trading after costs and tax."
# Four short labels under the slogan on the link-preview card, in the slogan's order.
focus: [LLM inference, Computer vision, On-device AI, Automated trading]
location: India
# The numbers the home page leads with, as entry-id.number-id: one per beat of the slogan.
proof: [glm53-one-gpu.decode, damaged-barcodes.read-rate, drop-detection.parameters, rl-alpha-labs.tiers]
# The live site's contact address; confirm before launch.
email: "work.rahul126@gmail.com"
links:
  - {label: GitHub, url: "https://github.com/pctablet505", priority: 1}
  - {label: LinkedIn, url: "https://www.linkedin.com/in/pctablet505/", priority: 1}
  - {label: DEV, url: "https://dev.to/pctablet505", priority: 2}
  - {label: Medium, url: "https://medium.com/@pctablet505", priority: 2}
  - {label: Hashnode, url: "https://hashnode.com/@pctablet505", priority: 2}
  - {label: Kaggle, url: "https://www.kaggle.com/pctablet505", priority: 2}
  - {label: X, url: "https://x.com/pctablet505", priority: 3}
photo: null
resume: null
languages: [English, Hindi]
```

## About

I make models fit where they have to run, then check what they really do.

### What I work on

#### Large models and fast frameworks
I serve a language model bigger than my GPU's memory from that one GPU. In open-source Keras, I made the PyTorch backend
faster and added one call that turns a trained model into a file a phone can run. See
[GLM-5.3-Flash on one GPU](/work/glm53-one-gpu/), [Keras on PyTorch](/work/keras-pytorch-speed/) and
[LiteRT export](/work/keras-litert-export/).

#### On-device vision and sensing
These models run on the device itself, with no server to lean on. They read badly damaged barcodes and recognise many
faces at once. From touch and motion, they can tell which hand holds a phone, who is using it, and when it is falling.
See [damaged barcodes](/work/damaged-barcodes/), [face recognition](/work/face-recognition/) and
[drop detection](/work/drop-detection/).

#### Projects of my own
[RL Alpha Labs](/work/rl-alpha-labs/) is automated trading on Indian stocks: an idea stays only if it
beats an index fund after costs and tax. [Porchlamp](/work/porchlamp/) ranks open-source projects by what happens to a
stranger's pull request, not by their stars.

### How I work

- **Measure first.** I profile before changing anything, change one thing at a time, and time the commit before and
  after.
- **Report the number that decides.** For trading, returns after costs and tax; for speed, the setting that ships, not
  the best run.
- **One cause per change.** Fixes go upstream as small pull requests, each easy to review and easy to revert.
- **Write down what failed.** Every closed idea and dead end keeps its reason, so nobody has to find it out twice.

The lamp in the logo stands for that last habit: a light left on for whoever checks next.

## Experience

### Software Engineer, Machine Learning at Google
```yaml
id: google
org: Google
title: Software Engineer, Machine Learning
location: India
start: 2025-02
end: present
priority: 1
one_line: "Works on XProf, the open-source ML profiler. Before that, open-source Keras and KerasHub work, including LiteRT export, Llama 3.1 and PyTorch-backend speed."
skills: [Keras, KerasHub, LiteRT, TensorFlow, PyTorch, JAX, profiling, Python]
links:
  - {label: XProf, url: "https://github.com/openxla/xprof"}
```
Now on XProf, the open-source profiling tool for machine learning. Before that, on Keras and KerasHub.

### ML Engineer, Computer Vision at Qualcomm
```yaml
id: qualcomm
org: Qualcomm
title: ML Engineer, Computer Vision
location: Hyderabad, India
start: 2024-09
end: 2025-01
priority: 2
one_line: "Put camera and generative-imaging models on the Snapdragon NPU and DSP."
skills: [quantization-aware training, INT8, pruning, Hexagon DSP, Snapdragon NPU, TFLite, C++, Android]
```
On-device AI for Snapdragon phones.

### Research and Development Engineer at Samsung R&D Institute India
```yaml
id: samsung
org: Samsung R&D Institute India
title: Research and Development Engineer
location: Noida, India
start: 2022-07
end: 2024-08
priority: 1
one_line: "Built computer-vision, biometric and motion-sensor systems that run on phones, from damaged-barcode reading to face recognition and drop detection."
skills: [computer vision, biometrics, sensor fusion, TFLite, OpenCV, Android, Kotlin, Python]
```
Computer vision, biometrics and on-device AI, plus the apps, portals and servers around them.

### Intern at Samsung R&D Institute India
```yaml
id: samsung-intern
org: Samsung R&D Institute India
title: Intern
location: Noida, India
start: 2022-01
end: 2022-06
priority: 3
one_line: "Ran quantized image models on Android phones and trained generative image models."
skills: [MobileNet, EfficientNet, NNAPI, TFLite, CycleGAN, PyTorch, Android, Java, Kotlin]
```
Learned Android in Java and Kotlin, and joined full time in July 2022.

## Work

### Reading damaged barcodes on phones
```yaml
id: damaged-barcodes
org: samsung
area: vision
status: built
start: 2022-07
end: 2024-08
priority: 1
one_line: "Raised the share of damaged barcodes a phone reads from 70% to 90%, with models trained on 10M+ synthetic images."
skills: [YOLO, Mask R-CNN, U-Net, ResNet, synthetic data, OpenCV, TFLite, Android, Kotlin, Python]
numbers:
  - id: read-rate
    value: "70% → 90%"
    what: damaged barcodes read correctly
    status: reported
    source: resume
  - id: synthetic-images
    value: "10M+"
    what: synthetic training images
    status: reported
    source: resume
demo: barcode-reader
```
Knox Capture lets a phone do an enterprise barcode scanner's job. On industrial sites the codes are blurred, partly
covered, seen at an angle or shining under lights, and a scanner that reads the wrong number is worse than one that
reads nothing. I built the part that reads damaged codes on the phone, and knows when to give up.

#### Problem
Industrial barcodes arrive blurred, partly covered, at an angle or under glare. A plain decoder either fails or
returns a wrong code, and a wrong code is the costly failure.

#### Approach
- **Data first.** A synthetic-data engine draws barcodes and then damages them on purpose: blur, occlusion, bending
  and reflections, each drawn from a probability model. 10M+ images in all.
- **A chain of small models.** YOLO finds the barcode, Mask R-CNN cuts it out, a U-Net restores the damaged bars, a
  ResNet names the barcode type, then the decoder reads it.
- **Knowing when to stop.** Every detection carries a confidence score, so the system declines to restore a code that
  is beyond recovery instead of guessing.
- **On the phone.** Android, the hardware-accelerated camera, TensorFlow Lite.

#### Results
Damaged barcodes read rose from 70% to 90%. Declining hopeless codes cut wrong reads.

### Recognising many faces at once on edge devices
```yaml
id: face-recognition
org: samsung
area: vision
status: shipped
start: 2023-03
end: 2024-08
priority: 1
one_line: "A multi-face recognition engine at 99.2% accuracy and 30+ FPS on edge devices, with face search cut from 1,200 ms to 87 ms."
skills: [face detection, face embeddings, YOLO, ONNX, OpenCV, embedding search, Python, Android]
numbers:
  - id: accuracy
    value: "99.2%"
    what: recognition accuracy on edge devices
    status: reported
    source: LinkedIn
  - id: fps
    value: "30+ FPS"
    what: frames per second on edge devices
    status: reported
    source: LinkedIn
  - id: lookup
    value: "1,200 ms → 87 ms"
    what: time to search the face index once
    status: reported
    source: LinkedIn
  - id: users
    value: "10,000+"
    what: registered users
    status: reported
    source: LinkedIn
demo: face-attention
```
Recognises several faces at once in live camera frames, video and photos, on Android, Windows and Linux, for access
control. I replaced a face detector that missed faces, trained a classifier on a custom set of face embeddings, and moved
face search from a linear scan to an O(log n) index: 1,200 ms to 87 ms per lookup across 10,000+ registered users,
at 99.2% accuracy and 30+ FPS.

#### Problem
Access control needs every face in the frame recognised while people walk past, on modest edge hardware. The detector
in place missed faces, and searching a growing set of registered people one by one got slower with every person added.

#### Approach
- **Find every face.** A different face detector, so the faces the old one missed were found.
- **Know the person.** A custom set of face embeddings, and a classifier trained on it.
- **Search in steps, not one by one.** Face search moved from a linear scan to an O(log n) index, so a lookup grows with
  the logarithm of the number of people, not with the number itself.
- **Run anywhere.** Android, Windows and Linux, with Python, OpenCV and ONNX.

#### Results
99.2% accuracy at 30+ FPS on edge devices, and 1,200 ms to 87 ms per lookup across 10,000+ registered users.

### An AI exam-proctoring platform (Satyapan)
```yaml
id: exam-proctoring
org: samsung
area: vision
status: shipped
start: 2023-07
end: 2023-10
priority: 2
one_line: "An anti-cheat exam platform used for 2,000+ employees across 100+ tests, with 60% less administrative overhead."
skills: [face recognition, gaze detection, Android, Kotlin, Java, Python, Flask, Django, SQLite]
numbers:
  - id: employees
    value: "2,000+"
    what: employees who took exams on it
    status: reported
    source: LinkedIn
  - id: tests
    value: "100+"
    what: tests run on it
    status: reported
    source: LinkedIn
  - id: overhead
    value: "60%"
    what: less administrative overhead
    status: reported
    source: LinkedIn
related: [md-appreciation-award, attention-detection]
```
An in-house platform for proctored exams: an Android app for candidates, a web portal for examiners, portals for HR and
a central server. Face-recognition sign-in, alerts when someone else appears on camera (with safeguards against people
walking past), detection of talking, shuffled questions and options, and a locked-down kiosk mode. It won the MD
Appreciation Award.

### Telling attention from distraction, with emotion recognition
```yaml
id: attention-detection
org: samsung
area: vision
status: shipped
start: 2023-09
end: 2023-11
priority: 2
one_line: "Detects whether a person at a screen is attentive or distracted, at 87% accuracy; checks across frames cut false alarms by 40%."
skills: [face landmarks, head pose, eye tracking, OpenCV, Python, Kotlin, Android]
numbers:
  - id: accuracy
    value: "87%"
    what: attention-monitoring accuracy
    status: reported
    source: resume
  - id: false-alarms
    value: "40%"
    what: fewer false positives from multi-frame validation
    status: reported
    source: LinkedIn
demo: face-attention
related: [exam-proctoring]
```
Reads facial expression, eye movement, yawns and head pose, and confirms a signal across several frames before raising
an alert. Emotion recognition is a feature of the same app. Used in the exam-proctoring platform.

### Generative inpainting on a phone's NPU and DSP
```yaml
id: npu-inpainting
org: qualcomm
area: vision
status: demo
start: 2024-09
end: 2025-01
priority: 2
one_line: "Redesigned a generative inpainting feature, object removal and image completion, so its models fit NPU and DSP latency budgets for the Snapdragon Summit demo."
skills: [generative inpainting, Snapdragon NPU, Hexagon DSP, quantization, Android]
```
Object removal and image completion, reworked until the models met the phone's latency budget on the NPU and DSP, for
the Snapdragon Summit demo.

### Camera ML pipelines in C++
```yaml
id: camera-pipelines
org: qualcomm
area: vision
status: built
start: 2024-09
end: 2025-01
priority: 3
one_line: "Detection, tracking and segmentation pipelines in C++ with INT8 quantization and pruning, and ML inside the native camera stack for a voice-controlled camera assistant."
skills: [C++, INT8, pruning, object tracking, segmentation, Android camera stack]
```
Camera pipelines for detection, tracking and segmentation, built in C++ for mobile, and Android demos of GPU, DSP and NPU
delegation. Put ML inference inside the native camera stack for a camera assistant you control by voice.

### Shadow removal and document clean-up
```yaml
id: document-restoration
org: samsung
area: vision
status: research
priority: 3
one_line: "Prototyped shadow removal and noise reduction for document scanning on phones."
skills: [image restoration, OpenCV, NumPy]
```
Research prototypes that clean up photographed documents: shadows lifted, noise removed.

### Gaze correction for video calls
```yaml
id: gaze-correction
org: samsung-intern
area: vision
status: prototype
start: 2022-01
end: 2022-06
priority: 3
one_line: "A prototype that shifts the eyes toward the camera in video calls, using facial landmarks and geometric transforms."
skills: [facial landmarks, dlib, OpenCV, geometric transforms]
```
Moves the eyes toward the camera so a video call feels like eye contact.

### Real-time image models on Android
```yaml
id: on-device-classification
org: samsung-intern
area: vision
status: built
start: 2022-01
end: 2022-06
priority: 3
one_line: "Real-time classification and detection on Android at 25+ FPS with quantized MobileNet and EfficientNet models through NNAPI."
skills: [MobileNet, EfficientNet, quantization, NNAPI, TFLite, Android]
numbers:
  - id: fps
    value: "25+ FPS"
    what: frames per second on the phone
    status: reported
    source: LinkedIn
```
Quantized models on the phone through NNAPI, at 25+ FPS.

### Generative image models
```yaml
id: generative-image-models
org: samsung-intern
area: vision
status: built
start: 2022-01
end: 2022-06
priority: 3
one_line: "Trained CycleGAN models in PyTorch for image-to-image translation and avatars, deployed with TFLite, and generative face models with StyleGAN and StarGAN."
skills: [CycleGAN, StyleGAN, StarGAN, PyTorch, TFLite]
```
Image-to-image translation, avatar generation and style transfer, then generative face models.

### MILAP: reuniting lost people at mass gatherings
```yaml
id: milap-design
org: personal
area: vision
status: research
start: 2026-07
priority: 3
one_line: "An offline-first design for reuniting lost people at the Kumbh Mela, with face and body re-identification, an opt-in gallery and human-verified matches."
skills: [face recognition, person re-identification, privacy by design, system design]
```
Design research, no code: offline-first so it keeps working when networks fail, an opt-in gallery, and a person who
checks every match before anyone is told.

### Shadow-Removal
```yaml
id: shadow-removal
org: personal
area: vision
status: published
start: 2022-10
priority: 3
one_line: "Removes shadows from document photos with adaptive thresholding and iterative shading and reflectance decomposition, without deep learning."
skills: [OpenCV, NumPy, image processing]
links:
  - {label: Repository, url: "https://github.com/pctablet505/Shadow-Removal"}
```
Classical image processing only: integral images, adaptive thresholds, and an iterative split of shading from
reflectance.

### Object detection tutorial
```yaml
id: object-detection-tutorial
org: personal
area: vision
status: published
start: 2025-07
priority: 3
one_line: "A notebook and a synthetic shape dataset that teach box regression and classification from scratch."
skills: [object detection, synthetic data, teaching]
links:
  - {label: Repository, url: "https://github.com/pctablet505/object-detection-tutorial"}
```
Teaching material: the parts of an object detector, built up on a dataset of drawn shapes.

### Who is holding the phone? Behavioural identification
```yaml
id: behavioural-identification
org: samsung
area: sensing
status: built
priority: 1
one_line: "Told which hand holds a phone, and who is using it, from touch and motion signals, at about 87% accuracy with no deep learning."
skills: [behavioural biometrics, sensor fusion, anomaly detection, Android]
numbers:
  - id: accuracy
    value: "87%"
    what: accuracy, about, without deep learning
    status: reported
    source: owner
demo: which-hand
```
An Android service that works out in real time whether the phone is in the left or right hand, then combines that with
swipes, taps, walking pattern and other sensor signals to keep checking who is using the phone. When the pattern looks
wrong it can restrict access: against theft, or when a colleague or family member picks the phone up. About 87%
accuracy, without deep learning.

#### Problem
A phone checks who you are once, at unlock. After that, whoever holds it has the same access: a thief, or a colleague or
family member who picks it up.

#### Approach
- **The first signal: the hand.** An Android service tells, in real time, whether the phone is in the left or the right
  hand.
- **More signals from the same person.** Swipes, taps, walking pattern and other sensor data, collected from several
  users, describe how each person handles the phone.
- **Keep checking.** Identification runs continuously; when the pattern does not match the owner, access can be
  restricted.
- **No deep learning.** The models are small enough to run all the time on the phone.

#### Results
About 87% accuracy, without deep learning.

### Phone drop detection in under 22 parameters
```yaml
id: drop-detection
org: samsung
area: sensing
status: built
start: 2023-03
end: 2023-05
priority: 1
one_line: "Replaced a deep-learning drop detector of millions of parameters with sensor features and a model of under 22, saving over 95% of the power."
skills: [sensor fusion, feature engineering, tiny models, statistical models, Android, Kotlin, Python]
numbers:
  - id: parameters
    value: "millions → under 22"
    what: model parameters
    status: reported
    source: owner
  - id: power
    value: "95%+"
    what: power saved
    status: reported
    source: owner
  - id: accuracy
    value: "97% → 95.2%"
    what: accuracy before and after
    status: reported
    source: owner
```
Detects a drop, estimates how far the phone fell, tells how hard the surface was, and tells a drop from a catch. The
deep-learning model it replaced was accurate but heavy; engineered features from the motion sensors and a small
statistical model did the job and saved over 95% of the power, at a small cost in accuracy (97% to 95.2%).

#### Problem
A drop detector has to listen to the motion sensors all the time, so every bit of compute costs battery. The existing
model had millions of parameters.

#### Approach
- **Use the physics.** A falling phone reads close to zero g until it hits something; how long that lasts gives the
  height, and the impact says how hard the surface was.
- **Engineer the features.** Sensor fusion turns the raw motion signals into a handful of features that carry those
  facts, and tell a drop from a catch.
- **Keep the model tiny.** Small statistical models on those features, under 22 parameters in all.

#### Results
From millions of parameters to under 22, saving over 95% of the power. Accuracy went from 97% to 95.2%: under two
points traded for a model small enough to run all the time.

### Car crash detection with automatic SOS
```yaml
id: crash-detection
org: samsung
area: sensing
status: built
start: 2022-11
end: 2024-08
priority: 2
one_line: "A phone that detects a car crash from its sensors and sends an SOS to chosen contacts."
skills: [sensor fusion, statistical models, rare-event data, Android]
```
Real crash data is rare, so I collected what is not a crash: rash driving, thrown phones, loud music, films. A
statistical model on the phone's sensors learned to tell those apart from a crash.

### GLM-5.3-Flash on one GPU
```yaml
id: glm53-one-gpu
org: personal
area: performance
status: published
date: 2026-09-02
priority: 1
one_line: "Served a 181 GiB mixture-of-experts LLM from one 96 GiB GPU and took decoding from 10.8 to 15.0 tokens/s shipped, 16.5 at peak."
skills: [LLM inference, mixture of experts, CUDA kernels, expert caching, vLLM, NVFP4]
numbers:
  - id: fit
    value: "181 GiB model, 96 GiB GPU"
    what: model size against GPU memory
    status: checked
    source: "https://github.com/pctablet505/glm53-flash-single-gpu"
    as_of: 2026-10-26
  - id: decode
    value: "10.8 → 15.0 tokens/s"
    what: decoding speed, from plain offloading to the shipped setup
    status: checked
    source: "https://github.com/pctablet505/glm53-flash-single-gpu"
    as_of: 2026-10-26
  - id: peak
    value: "16.5 tokens/s"
    what: decoding at peak
    status: checked
    source: "https://github.com/pctablet505/glm53-flash-single-gpu"
    as_of: 2026-10-26
  - id: gather
    value: "13.5 tokens/s"
    what: decoding with the gather kernel alone (13.53)
    status: checked
    source: "https://github.com/pctablet505/glm53-flash-single-gpu"
    as_of: 2026-10-26
  - id: skew
    value: "35% → 74%"
    what: share of experts that get this share of the router's picks
    status: checked
    source: "https://github.com/pctablet505/glm53-flash-single-gpu"
    as_of: 2026-10-26
  - id: prefill
    value: "614 → 1,750 tokens/s"
    what: prompt reading, about (1,771 and 1,729 logged)
    status: checked
    source: "https://github.com/pctablet505/glm53-flash-single-gpu"
    as_of: 2026-10-26
  - id: offload
    value: "105 → 125 GiB"
    what: model weights kept in host memory, before and after making room for the hot-expert cache
    status: checked
    source: "https://github.com/pctablet505/glm53-flash-single-gpu"
    as_of: 2026-10-27
  - id: fewer-experts
    value: "20.48 tokens/s"
    what: decoding with fewer experts per token, which hurt the output and is off
    status: checked
    source: "https://github.com/pctablet505/glm53-flash-single-gpu"
    as_of: 2026-10-27
chart:
  title: "Decode speed, tokens per second"
  source: "https://github.com/pctablet505/glm53-flash-single-gpu"
  as_of: 2026-10-27
  note: "Most are single runs, with about ±1 token/s of spread. Using fewer experts per token hurt the output, so it is off."
  bars:
    - {label: "Plain offloading", value: 10.77}
    - {label: "+ gather kernel", value: 13.53}
    - {label: "+ hot-expert cache, peak", value: 16.50}
    - {label: "As shipped", value: 14.99}
    - {label: "Fewer experts (not used)", value: 20.48, off: true}
links:
  - {label: Repository, url: "https://github.com/pctablet505/glm53-flash-single-gpu"}
  - {label: The eight bugs, url: "https://github.com/pctablet505/glm53-flash-single-gpu/blob/main/RUNNING-GLM53-ON-ONE-GPU.md"}
related: [glm53-hot-expert-cache, note-glm53-eight-bugs, servedeck]
```
A 181 GiB model does not fit on a 96 GiB GPU, so most of its experts live in host memory and are read over PCIe as
the tokens need them. Three changes took decoding from 10.8 to 15.0 tokens/s as shipped, 16.5 tokens/s at peak, on one
workstation card.

#### Problem
GLM-5.3-Flash is a mixture-of-experts model with 320B parameters, 18B of them active per token: each layer has 288
experts and uses 8 per token. In 4-bit NVFP4 it is 181 GiB; the card has 96 GiB. Plain offloading works, but every
token waits on expert weights crossing PCIe.

#### Approach
- **Read experts in wide blocks.** Narrow, scattered loads across PCIe were the slow part. A gather kernel, a small GPU
  program that reads wide and contiguous, took decoding to 13.5 tokens/s.
- **Keep the hot experts on the card, not the first ones.** In each layer, 35% of the experts get 74% of the picks. So
  more of the model moved off the card (105 → 125 GiB in host memory) and the freed memory became a cache of the
  most-used experts: 16.5 tokens/s at peak. The shipped setup caches fewer experts per layer (54 instead of 66) to
  leave room for long prompts: 15.0 tokens/s.
- **Read long prompts in groups.** A long prompt touches nearly every expert; staging them 64 at a time took prompt
  reading from 614 to 1,750 tokens/s.

#### Results
Decoding went from 10.8 to 15.0 tokens/s as shipped, and 16.5 tokens/s at peak; prompt reading from 614 to 1,750
tokens/s. Most numbers are single runs on one machine, with about ±1 token/s of spread.

#### What did not work
- Using fewer experts per token reached 20.48 tokens/s, but the output got worse, so it is off.
- Eight bugs stood between a fresh checkout and correct output. One gave no error at all: the model repeated the same
  token forever.
- One known output defect is not fixed. It affects every NVFP4 mixture-of-experts checkpoint made with the same
  quantization tool, not only this one.

### One call from a Keras model to a phone: LiteRT export
```yaml
id: keras-litert-export
org: google
area: performance
status: merged
start: 2025-12
end: 2026-07
priority: 1
one_line: "Built the LiteRT export path in Keras and KerasHub: a trained model to a phone-ready file in one call, on TensorFlow and PyTorch."
skills: [Keras, KerasHub, LiteRT, TFLite, TensorFlow, PyTorch, model export]
links:
  - {label: "keras#21674", url: "https://github.com/keras-team/keras/pull/21674"}
  - {label: "keras-hub#2405", url: "https://github.com/keras-team/keras-hub/pull/2405"}
  - {label: "keras#22758, PyTorch backend", url: "https://github.com/keras-team/keras/pull/22758"}
related: [keras-io-litert-guide, keras-ondevice-android, kerashub-litert-compat]
```
One call turns a trained Keras or KerasHub model into a `.tflite` file a phone can run, first for the TensorFlow
backend and then for models trained on PyTorch. I wrote the keras.io guide for it.

#### Problem
Keras had no single call that produced a LiteRT file for a phone: conversion went through separate TensorFlow tooling,
and models trained on the PyTorch backend had no Keras path at all.

#### Approach
- `model.export("model.tflite", format="litert")` in Keras ([keras#21674](https://github.com/keras-team/keras/pull/21674), merged December 2025), and the same for KerasHub models ([keras-hub#2405](https://github.com/keras-team/keras-hub/pull/2405), January 2026).
- The same call for models trained on the PyTorch backend ([keras#22758](https://github.com/keras-team/keras/pull/22758), May 2026).
- Fixes to the KerasHub layers that blocked export, one model family at a time.
- The keras.io guide, [Exporting Keras models to LiteRT](https://keras.io/guides/litert_export/), merged July 2026.

#### Results
The export path is merged in Keras and KerasHub and documented on keras.io. An Android app of mine walks the whole path,
from one export call to models running on a phone with no server.

#### What did not work
A one-call export of KerasHub LLMs to LiteRT-LM bundles was built and proposed upstream, but not merged.

### 3x faster models on the Snapdragon NPU and DSP
```yaml
id: snapdragon-speed
org: qualcomm
area: performance
status: built
start: 2024-09
end: 2025-01
priority: 2
one_line: "Made deep-learning models run 3x faster on the Snapdragon NPU and DSP, and cut memory bandwidth 75% with quantization-aware training."
skills: [Snapdragon NPU, Hexagon DSP, quantization-aware training, INT8, TFLite, C++]
numbers:
  - id: speed
    value: "3x"
    what: faster inference on the NPU and DSP
    status: reported
    source: LinkedIn
  - id: bandwidth
    value: "75%"
    what: less memory bandwidth for image-processing models
    status: reported
    source: LinkedIn
```
Models tuned for the phone's NPU and DSP ran 3x faster, and quantization-aware training cut the memory bandwidth of
high-fidelity image-processing models by 75%.

### Keras on PyTorch: compiled generation 11.6x faster
```yaml
id: keras-pytorch-speed
org: google
area: performance
status: merged
start: 2026-07
end: 2026-10
priority: 1
one_line: "Traced why Keras on PyTorch ran about 9x slower than plain PyTorch, and merged the fixes upstream, one root cause each."
skills: [performance analysis, PyTorch, torch.compile, JAX, Keras, cProfile, benchmarking, Python]
numbers:
  - id: compiled
    value: "11.6x"
    what: faster 32-token LLM generation under torch.compile, Keras master on July 18 against October 15 (87.8 → 7.54 ms per call)
    status: checked
    source: "https://github.com/keras-team/keras/issues/22561#issuecomment-6247116051"
    as_of: 2026-10-28
  - id: breaks
    value: "20 → 0"
    what: torch.compile graph breaks per forward pass (CNN 9 → 0, LLM 11 → 0)
    status: checked
    source: "https://github.com/keras-team/keras/issues/22561#issuecomment-6247116051"
    as_of: 2026-10-28
  - id: calls
    value: "−12 to −23%"
    what: Python function calls per forward pass, on all four Keras backends
    status: checked
    source: "https://github.com/keras-team/keras/issues/22561#issuecomment-6247116051"
    as_of: 2026-10-28
  - id: eager
    value: "1.21x"
    what: faster 32-token generation in eager mode over the same months (59.8 → 49.5 ms per call)
    status: checked
    source: "https://github.com/keras-team/keras/issues/22561#issuecomment-6247116051"
    as_of: 2026-10-28
  - id: gap
    value: "8.45x"
    what: the time eager Keras on PyTorch still takes against plain PyTorch on the same benchmark (10.2x in July)
    status: checked
    source: "https://github.com/keras-team/keras/issues/22561#issuecomment-6247116051"
    as_of: 2026-10-28
  - id: slowdown
    value: "9x"
    what: slower than plain PyTorch on small models in eager mode, about, when the issue was opened
    status: checked
    source: "https://github.com/keras-team/keras/issues/22561"
    as_of: 2026-10-28
report:
  title: "the progress update on keras#22561"
  source: "https://github.com/keras-team/keras/issues/22561#issuecomment-6247116051"
  date: 2026-10-18
  dir: reports/keras-22561
  charts:
    - {file: tiles.png, alt: "Headline numbers, Keras master on July 18 against October 15: compiled and eager generation, Python calls per forward, graph breaks"}
    - {file: flips.png, alt: "Three merges that each made one compiled Keras-on-PyTorch workload several times faster"}
    - {file: waterfall.png, alt: "Compiled 32-token generation from July to October, one bar per pull request, the rest of master as one grey bar"}
    - {file: throughput.png, alt: "Tokens per second for 32-token generation, July against October, Keras on PyTorch and JAX, with the plain frameworks for reference"}
    - {file: backends.png, alt: "Python function calls per LLM forward on PyTorch, JAX, TensorFlow and NumPy, July against October and at every commit"}
    - {file: timeline.png, alt: "Compiled 32-token generation at every commit from July to October, and torch.compile graph breaks per forward"}
    - {file: jax.png, alt: "Keras on JAX, eager and under jax.jit, 32-token generation at every commit"}
links:
  - {label: "The progress report, keras#22561", url: "https://github.com/keras-team/keras/issues/22561#issuecomment-6247116051"}
  - {label: "Interactive version, on DEV", url: "https://dev.to/pctablet505/keras-22561-speedups-compiled-keras-on-pytorch-now-generates-text-116x-faster-595m"}
  - {label: "The issue, keras#22561", url: "https://github.com/keras-team/keras/issues/22561"}
related: [keras-22561-speedups]
```
Keras runs on PyTorch, but on small models it ran about 9x slower than the same model in plain PyTorch. I traced the
cost to Python work Keras repeated on every call, opened [keras#22561](https://github.com/keras-team/keras/issues/22561)
with the root causes, and landed the fixes as small pull requests, one cause each. Each was timed on the commit just
before and just after its merge.

#### Problem
Most of each call went to Keras's own Python: building traceback details that were only needed when an op failed,
re-setting layer state, checking dtypes and inputs. `torch.compile` could not help either. Graph breaks split every
forward pass and compiled steps kept recompiling, so compiling a Keras model made generation slower than running it
eagerly.

#### Approach
- Counted every Python call with cProfile and every `torch.compile` graph break with `torch._dynamo.explain`, on the
  issue's two models: a small CNN and a two-layer transformer language model.
- Split one large fix into small pull requests, one root cause each, each with tests and a before-and-after benchmark.
- Three merges made `torch.compile` work with Keras: one removed the graph break in attention, one made the PyTorch
  tree code traceable, and one stopped compiled steps from recompiling.
- Most fixes changed shared code (`Layer.__call__`, op tracebacks, dtype handling, input checks), so the JAX,
  TensorFlow and NumPy backends gained too.

#### Results
By the progress report of October 18, 15 pull requests were merged. Between Keras master on July 18 and on October 15,
compiled 32-token generation got 11.6x faster and eager generation 1.21x faster. Graph breaks per forward pass fell from 20 to 0, and Python calls per forward
pass fell 12 to 23% on all four backends. The
[progress report](https://github.com/keras-team/keras/issues/22561#issuecomment-6247116051) times every pull request on
its own; its interactive version on DEV is under Links.

#### What did not work
The eager gap did not close: eager Keras on PyTorch still takes 8.45x the time of plain PyTorch on this benchmark, so
the issue stays open. When the report was posted, two more fixes were in review. Training, CPU timing and larger models
were not measured.

### End-to-end UI tests for XProf
```yaml
id: xprof-ui-tests
org: google
area: performance
status: shipped
start: 2026-08
end: present
priority: 2
one_line: "Wrote the end-to-end UI test suite for XProf, the open-source ML profiler, with 107 browser tests and a side-by-side check of two builds."
skills: [Playwright, pytest, Python, visual regression testing, continuous integration]
numbers:
  - id: tests
    value: "107"
    what: test functions in the suite
    status: checked
    source: "https://github.com/openxla/xprof/tree/master/tests/ui"
    as_of: 2026-10-27
  - id: journeys
    value: "7"
    what: scripted user journeys through the profiler
    status: checked
    source: "https://github.com/openxla/xprof/blob/master/tests/ui/journeys/diagnostic_journeys.json"
    as_of: 2026-10-27
  - id: regressions
    value: "8"
    what: frontend regressions the suite was extended to catch
    status: checked
    source: "https://github.com/openxla/xprof/commit/12e29a018ac1a2591a67e38708386d70548f49d3"
    as_of: 2026-10-27
links:
  - {label: The suite, url: "https://github.com/openxla/xprof/tree/master/tests/ui"}
  - {label: Its history, url: "https://github.com/openxla/xprof/commits/master/tests/ui"}
```
XProf is the open-source profiling tool for machine learning. I built its browser test suite: Playwright tests that
walk seven real profiling journeys, page checks that flag error banners and loading screens that never clear, and a
side-by-side engine that compares the screenshots, page structure and network calls of two builds and turns the
differences into a report to approve. It runs in XProf's continuous integration, and was extended to catch eight
frontend regressions in routing, state, chart rendering and responsive layout.

### Llama 3.1 in KerasHub, and Gemma 3 fixes
```yaml
id: llama-kerashub
org: google
area: performance
status: merged
start: 2025-04
end: 2026-07
priority: 2
one_line: "Implemented Llama 3.1 in KerasHub and fixed Gemma 3 bugs, including a preprocessor crash across Gemma 3, 3n and 4."
skills: [LLMs, KerasHub, JAX, Keras]
links:
  - {label: "keras-hub#2132, Llama 3.1", url: "https://github.com/keras-team/keras-hub/pull/2132"}
  - {label: "keras-hub#2773, Gemma preprocessor", url: "https://github.com/keras-team/keras-hub/pull/2773"}
```
Llama 3.1 landed in KerasHub in April 2025; Gemma 3 fixes followed for JAX index types and a preprocessor crash.

### A benchmarking system for Keras and KerasHub
```yaml
id: benchmarking-system
org: google
area: performance
status: built
priority: 2
wording: exact
one_line: "Built the benchmarking system for all Keras and KerasHub models: automated weekly runs across GPU and TPU, the TensorFlow, JAX and PyTorch backends, presets and batch sizes, to catch performance regressions."
skills: [benchmarking, Keras, KerasHub, GPU, TPU]
```

### A Keras 3 migration
```yaml
id: keras3-migration
org: google
area: performance
status: built
priority: 3
wording: exact
one_line: "Led the migration of a major internal customer from legacy Keras to Keras 3, with backward compatibility and performance parity."
skills: [Keras 3, migration]
```

### Making KerasHub models exportable
```yaml
id: kerashub-litert-compat
org: google
area: performance
status: merged
priority: 3
one_line: "Fixed the layers that kept KerasHub models such as ESM, PARSeq and Flux from exporting to LiteRT."
skills: [KerasHub, LiteRT, TFLite, quantization]
related: [keras-litert-export]
```
ESM attention, the PARSeq decoder, quantized reversible embeddings, Flux tensor shapes and non-max suppression, each
made exportable.

### Keras correctness fixes
```yaml
id: keras-fixes
org: google
area: performance
status: merged
start: 2025-06
end: 2026-10
priority: 3
one_line: "Fixed TPU attention, N-D attention inputs, nested weight saving, masks, call-context leaks and ONNX export of models over 1.5 GB."
skills: [Keras, TPU, ONNX, OpenVINO, PyTorch]
numbers:
  - id: onnx-size
    value: "1.5 GB"
    what: model size above which ONNX export now switches to large-model mode
    status: checked
    source: "https://github.com/keras-team/keras/pull/22825"
    as_of: 2026-10-27
links:
  - {label: "keras#22361, Attention N-D inputs", url: "https://github.com/keras-team/keras/pull/22361"}
  - {label: "keras#22825, ONNX large models", url: "https://github.com/keras-team/keras/pull/22825"}
```
Bugs in attention on TPU, saving and loading nested layers, masks, image ops and ONNX export, each fixed with a test.

### Faster Exynos NPU inference
```yaml
id: exynos-npu
org: samsung
area: performance
status: built
priority: 3
one_line: "Optimized models for the Exynos NPU with TensorFlow Lite, for 2.5x faster inference."
skills: [Exynos NPU, TFLite, Android]
numbers:
  - id: speed
    value: "2.5x"
    what: faster inference
    status: reported
    source: LinkedIn
```

### LiteRT-LM export for KerasHub LLMs
```yaml
id: litert-lm-export
org: google
area: performance
status: proposed
priority: 3
one_line: "Built one call from a KerasHub LLM to a LiteRT-LM bundle with tokenizer and prefill and decode signatures; proposed upstream, not merged."
skills: [LiteRT-LM, KerasHub, LLMs, Gemma]
```
Built and proposed as a series of pull requests; not merged.

### Model-parallel layout maps for KerasHub LLMs
```yaml
id: layout-maps
org: google
area: performance
status: proposed
start: 2026-07
priority: 3
one_line: "Designed model-parallel layout maps for KerasHub LLMs, from Gemma and Qwen to Llama and Mixtral; proposed upstream, not merged."
skills: [model parallelism, distributed training, KerasHub, JAX]
```
Designed, with an offline check of real preset configs against mesh shapes; proposed as pull requests and not merged.

### Keras on an Android phone
```yaml
id: keras-ondevice-android
org: personal
area: performance
status: published
start: 2026-07
priority: 2
one_line: "An Android app and guide that run KerasHub models on the phone with LiteRT, from one export call to six working screens."
skills: [KerasHub, LiteRT, Android, Kotlin, model export]
links:
  - {label: Repository, url: "https://github.com/pctablet505/keras-ondevice-android"}
related: [keras-litert-export, keras-tflite-android-pitfalls, android-ml-tests, keras-tflite-11-cases]
```
Classification, detection, segmentation, depth and two Gemma screens, all on the phone with no server, plus a way to
check the phone's answer against Python and the export traps worth knowing.

### Gemma on Android
```yaml
id: gemma-android-demos
org: personal
area: performance
status: published
priority: 3
one_line: "Gemma running fully on an Android phone with TFLite, LiteRT and LiteRT-LM."
skills: [Gemma, LiteRT, LiteRT-LM, TFLite, Android]
links:
  - {label: gemma-tflite-android-demo, url: "https://github.com/pctablet505/gemma-tflite-android-demo"}
  - {label: litert-demo, url: "https://github.com/pctablet505/litert-demo"}
```

### RL Alpha Labs
```yaml
id: rl-alpha-labs
org: personal
area: projects
status: research
start: 2025-05
end: present
priority: 1
one_line: "Automated trading on Indian stocks, where a strategy counts only if it beats an index fund after real costs and tax."
skills: [quantitative research, reinforcement learning, JAX, statistics, backtesting, Python]
numbers:
  - id: closed
    value: "12+"
    what: trading ideas tested and closed, each with its reason
    status: checked
    source: "https://rlalphalabs.com/notes/ideas-we-closed/"
    as_of: 2026-10-28
  - id: basket-cost
    value: "2.14%"
    what: yearly loss to rebalancing costs and tax for a self-held 300-stock basket, over 20.73 years
    status: checked
    source: "https://rlalphalabs.com/"
    as_of: 2026-10-27
  - id: tiers
    value: "69 of 70"
    what: capital-and-breadth tiers in which an index fund beat holding the stocks directly, after costs and tax
    status: checked
    source: "https://rlalphalabs.com/"
    as_of: 2026-10-27
links:
  - {label: rlalphalabs.com, url: "https://rlalphalabs.com/"}
  - {label: Ideas we closed, url: "https://rlalphalabs.com/notes/ideas-we-closed/"}
related: [servedeck, flakehound]
chart:
  title: "₹1 lakh held from 2006, after costs and tax"
  source: "https://rlalphalabs.com/"
  as_of: 2026-10-28
  note: "Each line grows at the yearly rate the study reports for it; the real paths were bumpier. The basket's band spans its capital tiers."
  growth:
    from: 2006
    years: 20.73
    start: "₹1 lakh"
    lines:
      - {label: "NIFTY 500 index fund", rate: 11.67}
      - {label: "Self-held 300-stock basket", rate: 10.48, high: 10.93}
closed:
  source: "https://rlalphalabs.com/notes/ideas-we-closed/"
  as_of: 2026-10-28
  ideas:
    - {idea: "A hand-picked basket of large stocks instead of an index fund", why: "costs and taxes"}
    - {idea: "Intraday chart-pattern setups", why: "costs and taxes"}
    - {idea: "Order-book signals over seconds to minutes", why: "costs and taxes"}
    - {idea: "Trading other public filing feeds on their own", why: "costs and taxes"}
    - {idea: "Reinforcement-learning agents trading on daily prices", why: "no edge, or only luck"}
    - {idea: "A bigger machine-learning model to rank stocks", why: "no edge, or only luck"}
    - {idea: "Buying after a big news-driven jump", why: "no edge, or only luck"}
    - {idea: "Commodity price shocks to predict company results", why: "no edge, or only luck"}
    - {idea: "Writing options on the index for income", why: "no edge, or only luck"}
    - {idea: "Buying stocks announced for addition to a major index", why: "the market got there first"}
    - {idea: "An AI model reading company filings to forecast earnings surprises", why: "AI that fell short of the bar"}
    - {idea: "An AI model mapping which companies supply which, from annual reports", why: "AI that fell short of the bar"}
```
Every idea, from reinforcement-learning agents in JAX to simple rules, is tested on point-in-time NSE data with delisted
companies kept in, and counts only if it beats an index fund after real costs and tax. At least 12 are closed, each
with its reason. Even a self-held basket of 300 stocks lost 2.14% a year to costs and tax, and the index fund came out
ahead in 69 of 70 tiers of capital and breadth. Paper trading only; no live money.

#### Problem
Trading ideas that look good in a backtest usually lose to an index fund once real costs, tax and dead companies are
counted. The question the lab asks of every idea is whether it still wins after all of that.

#### Approach
- **Honest data.** Point-in-time NSE data, with delisted companies kept in, so the past is not filtered by who survived.
- **Honest costs.** Every statutory charge, depository fee, spread and the tax wedge, written down in the open.
- **One bar.** An idea counts only if it beats an index fund after costs and tax.
- **Ideas of every size.** From reinforcement-learning agents trained in JAX to simple rules.

#### Results
At least 12 ideas are closed, each with its reason. Holding a 300-stock basket directly lost 2.14% a year to costs and
tax over twenty years, and the index fund came out ahead in 69 of 70 tiers of capital and breadth.

#### What did not work
Every closed idea is a thing that did not work, written down with why. Backtest traps fooled the lab or nearly did;
each one is listed with the check that now catches it.

### Porchlamp
```yaml
id: porchlamp
org: personal
area: projects
status: live
start: 2026-04
end: present
priority: 2
one_line: "Shows which open-source projects reply to, review and merge a stranger's pull request, so contributors spend their effort where it will land."
skills: [data pipelines, GitHub API, statistics, static sites, Android]
numbers:
  - id: prs
    value: "1,442,863"
    what: pull requests followed, from 227,260 outside contributors, 25 April to 22 October 2026
    status: checked
    source: "https://porchlamp.org/black-holes/"
    as_of: 2026-10-27
  - id: contributors
    value: "227,260"
    what: outside contributors
    status: checked
    source: "https://porchlamp.org/black-holes/"
    as_of: 2026-10-27
  - id: projects
    value: "11,000"
    what: GitHub projects followed
    status: checked
    source: "https://porchlamp.org/black-holes/"
    as_of: 2026-10-27
  - id: silent
    value: "13.6%"
    what: active projects (567 of 4,169) that left most outside pull requests with no human reply for two weeks
    status: checked
    source: "https://porchlamp.org/black-holes/"
    as_of: 2026-10-27
links:
  - {label: porchlamp.org, url: "https://porchlamp.org/"}
```
A side project built for fun, out of a struggle every outside contributor knows: a pull request nobody answers. Its
27 October 2026 snapshot followed 1,442,863 pull requests from 227,260 outside contributors to 11,000 projects. In that
snapshot, 13.6% of active projects left most outside pull requests with no human reply for two weeks, and stars barely
predicted which ones.

### Servedeck
```yaml
id: servedeck
org: personal
area: projects
status: live
start: 2026-08
end: present
priority: 2
one_line: "Runs local LLMs on one GPU workstation, switching models with one command behind one OpenAI-compatible endpoint, with a live dashboard."
skills: [vLLM, systemd, LLM serving, Linux]
links:
  - {label: Docs, url: "https://servedeck.rlalphalabs.com/"}
related: [rl-alpha-labs, glm53-one-gpu]
```
Born as a tool for RL Alpha Labs: systemd units, one `/v1` gateway and a dashboard for native vLLM, and it restarts a
model whose engine died, which vLLM's exit code would otherwise hide.

### flakehound
```yaml
id: flakehound
org: personal
area: projects
status: published
start: 2026-07
priority: 3
one_line: "Static checks that find flaky pytest tests by their pattern, with rules for JAX, PyTorch and NumPy."
skills: [pytest, static analysis, Python]
numbers:
  - id: rules
    value: "17"
    what: rules
    status: checked
    source: "https://github.com/pctablet505/flakehound"
    as_of: 2026-10-27
links:
  - {label: Repository, url: "https://github.com/pctablet505/flakehound"}
related: [rl-alpha-labs]
```
Born as a tool for RL Alpha Labs. Alpha.

### ATS optimizer
```yaml
id: ats-optimizer
org: personal
area: projects
status: live
start: 2026-02
priority: 3
one_line: "A job-application pipeline that finds openings, builds each resume by selecting facts rather than inventing them, and fills forms with a browser robot."
skills: [Python, Playwright, LLMs, systemd]
```
Private code; the idea: public job-board feeds for discovery, a knowledge vault that records where every fact came from,
resumes built only from facts in the vault, a check against applicant-tracking systems, and form filling with a
grounded LLM fallback. Runs as a service.

### hostops
```yaml
id: hostops
org: personal
area: projects
status: published
start: 2026-10
priority: 3
one_line: "Drops a GPU's power limit the second the UPS reports battery, never fails open, and logs every mains cut."
skills: [Linux, systemd, SQLite, power management]
links:
  - {label: Repository, url: "https://github.com/pctablet505/hostops"}
```

### A multi-agent engineering workflow on one workstation
```yaml
id: agent-workflow
org: personal
area: projects
status: live
priority: 3
one_line: "A shared test scheduler, guard hooks and a context hub that let many coding agents work safely on one workstation."
skills: [developer tooling, Python, agents]
```

### Daily Tracker
```yaml
id: daily-tracker
org: personal
area: projects
status: published
start: 2026-06
priority: 3
one_line: "An offline Flutter habit tracker for Android with checksum-verified updates."
skills: [Flutter, Dart, Android]
links:
  - {label: Repository, url: "https://github.com/pctablet505/daily_tracker"}
```

### ML-Guide
```yaml
id: ml-guide
org: personal
area: projects
status: published
start: 2025-03
priority: 3
one_line: "An ordered route through AI and ML courses, in four stages."
skills: [teaching]
links:
  - {label: Repository, url: "https://github.com/pctablet505/ML-Guide"}
```

### Data structures in Python
```yaml
id: data-structures
org: personal
area: projects
status: published
start: 2020
priority: 3
one_line: "A van Emde Boas tree with O(u) and O(n log log u) space versions, plus balanced trees, treaps, segment and Fenwick trees and skip lists."
skills: [algorithms, data structures, Python]
links:
  - {label: van-Emde-Boas-Tree, url: "https://github.com/pctablet505/van-Emde-Boas-Tree"}
  - {label: Data-Structures, url: "https://github.com/pctablet505/Data-Structures"}
```

### Coursework projects
```yaml
id: coursework
org: personal
area: projects
status: published
priority: 3
one_line: "Projects from MIT's machine learning course, CS50 AI and CS188, including Pac-Man search and reinforcement learning."
skills: [machine learning, search, reinforcement learning]
links:
  - {label: Machine-Learning, url: "https://github.com/pctablet505/Machine-Learning"}
  - {label: Artificial-Intelligence, url: "https://github.com/pctablet505/Artificial-Intelligence"}
  - {label: CS188-AI, url: "https://github.com/pctablet505/CS188-AI"}
```

## Open source

### Merged pull requests
```yaml
id: oss-summary
priority: 1
numbers:
  - id: merged
    value: "100+"
    what: merged pull requests in projects I do not own
    status: checked
    source: "https://github.com/search?q=is%3Apr+author%3Apctablet505+is%3Amerged+-user%3Apctablet505&type=pullrequests"
    as_of: 2026-10-28
  - id: projects
    value: "38+"
    what: projects with at least one merged pull request
    status: checked
    source: "https://github.com/search?q=is%3Apr+author%3Apctablet505+is%3Amerged+-user%3Apctablet505&type=pullrequests"
    as_of: 2026-10-28
  - id: keras
    value: "64+"
    what: merged in Keras and KerasHub
    status: checked
    source: "https://github.com/search?q=is%3Apr+author%3Apctablet505+is%3Amerged+repo%3Akeras-team%2Fkeras+repo%3Akeras-team%2Fkeras-hub&type=pullrequests"
    as_of: 2026-10-28
```
Most of the work is in Keras and KerasHub; the rest is fixes across the Python and ML tooling people use every day.

### Python tooling fixes
```yaml
id: python-tooling-fixes
priority: 2
links:
  - {label: "pip#14179", url: "https://github.com/pypa/pip/pull/14179"}
  - {label: "pydantic#13452", url: "https://github.com/pydantic/pydantic/pull/13452"}
  - {label: "pyright#11547", url: "https://github.com/microsoft/pyright/pull/11547"}
  - {label: "typeshed#16022", url: "https://github.com/python/typeshed/pull/16022"}
  - {label: "poetry#10982", url: "https://github.com/python-poetry/poetry/pull/10982"}
  - {label: "trio#3474", url: "https://github.com/python-trio/trio/pull/3474"}
  - {label: "pytest-rerunfailures#338", url: "https://github.com/pytest-dev/pytest-rerunfailures/pull/338"}
  - {label: "pytest-timeout#199", url: "https://github.com/pytest-dev/pytest-timeout/pull/199"}
  - {label: "pytest-randomly#735", url: "https://github.com/pytest-dev/pytest-randomly/pull/735"}
```
Merged fixes in pip, pydantic, pyright, typeshed, poetry, trio and pytest plugins.

### vLLM
```yaml
id: vllm-fixes
priority: 2
date: 2026-10-13
links:
  - {label: "vllm#56129", url: "https://github.com/vllm-project/vllm/pull/56129"}
related: [glm53-one-gpu]
```
Tests for vLLM's reasoning-content mirror, merged; found while serving GLM-5.3 on one GPU.

## Writing

### Exporting Keras models to LiteRT
```yaml
id: keras-io-litert-guide
priority: 1
date: 2026-07-21
venue: keras.io
url: "https://keras.io/guides/litert_export/"
related: [keras-litert-export]
```
The official keras.io guide to LiteRT export.

### Keras #22561 speedups: compiled Keras on PyTorch now generates text 11.6x faster
```yaml
id: keras-22561-speedups
priority: 1
date: 2026-10-16
venue: DEV
url: "https://dev.to/pctablet505/keras-22561-speedups-compiled-keras-on-pytorch-now-generates-text-116x-faster-595m"
related: [keras-pytorch-speed]
```

### A hot-expert cache made a 181 GiB model faster on one 96 GiB GPU
```yaml
id: glm53-hot-expert-cache
priority: 1
date: 2026-10-22
venue: DEV
url: "https://dev.to/pctablet505/a-hot-expert-cache-made-a-181-gib-model-faster-on-one-96-gib-gpu-4b03"
related: [glm53-one-gpu]
```

### Why a Keras model fails to convert to TFLite: 11 known cases, 5 traps
```yaml
id: keras-tflite-11-cases
priority: 2
date: 2026-10-22
venue: DEV
url: "https://dev.to/pctablet505/why-a-keras-model-fails-to-convert-to-tflite-11-known-cases-5-traps-5bb0"
links:
  - {label: Also on Medium, url: "https://medium.com/@pctablet505/kerashub-expects-11-of-its-own-models-to-fail-this-export-here-is-why-ac5f3f02a7fe"}
related: [keras-ondevice-android]
```

### Keras to TFLite on Android: wrong normalization and a backwards top-5
```yaml
id: keras-tflite-android-pitfalls
priority: 2
date: 2026-10-22
venue: DEV
url: "https://dev.to/pctablet505/keras-to-tflite-on-android-wrong-normalization-and-a-backwards-top-5-28m2"
links:
  - {label: Also on Medium, url: "https://medium.com/@pctablet505/the-keras-export-took-one-line-my-android-app-got-the-pixels-and-top-5-wrong-487a543361ee"}
related: [keras-ondevice-android]
```

### Two Android ML tests that could never fail, and a TFLite check that can
```yaml
id: android-ml-tests
priority: 2
date: 2026-10-22
venue: DEV
url: "https://dev.to/pctablet505/two-android-ml-tests-that-could-never-fail-and-a-tflite-check-that-can-3bm8"
related: [keras-ondevice-android]
```

### Python projects are twice as likely as Java ones to leave most outside pull requests unanswered
```yaml
id: porchlamp-python-java
priority: 3
date: 2026-10-23
venue: Hashnode
url: "https://porchlamp.hashnode.dev/python-projects-are-twice-as-likely-as-java-ones-to-leave-most-outside-pull-requests-unanswered"
related: [porchlamp]
```

## Notes

### The eight bugs between a fresh checkout and correct output
```yaml
id: note-glm53-eight-bugs
priority: 1
venue: GitHub
url: "https://github.com/pctablet505/glm53-flash-single-gpu/blob/main/FINDINGS.md"
related: [glm53-one-gpu]
```
Every bug met on the way to running GLM-5.3-Flash correctly on one GPU, on one page, including the silent one.

### Optimizing GLM-5.3-Flash on one GPU
```yaml
id: note-glm53-optimizing
priority: 2
venue: GitHub
url: "https://github.com/pctablet505/glm53-flash-single-gpu/blob/main/OPTIMIZING-GLM53-ON-ONE-GPU.md"
related: [glm53-one-gpu]
```
What made decoding faster, what did not, and how each change was measured.

### Backtest traps that fooled us
```yaml
id: note-backtest-traps
priority: 1
venue: rlalphalabs.com
url: "https://rlalphalabs.com/notes/backtest-traps/"
related: [rl-alpha-labs]
```
Backtest traps that fooled the lab or nearly did: what happened, and how each one is checked for now.

### What trading really costs on NSE
```yaml
id: note-nse-trading-costs
priority: 2
venue: rlalphalabs.com
url: "https://rlalphalabs.com/notes/trading-costs/"
related: [rl-alpha-labs]
```
The full friction of trading Indian equities: statutory charges, depository fees, spreads and the tax wedge.

### How one person runs a lab with AI agents
```yaml
id: note-ai-agents-lab
priority: 2
venue: rlalphalabs.com
url: "https://rlalphalabs.com/notes/how-we-run-ai-agents/"
related: [rl-alpha-labs, agent-workflow]
```
How the lab's AI agents are run: each rule, and the mistake behind it.

### Export a KerasHub vision model and run it on Android
```yaml
id: note-keras-export-android
priority: 2
venue: GitHub
url: "https://github.com/pctablet505/keras-ondevice-android/blob/main/docs/01-export-a-vision-model.md"
related: [keras-ondevice-android, keras-litert-export]
```
One KerasHub image classifier taken to an Android phone with one export call, not a rewrite.

### Check the phone's answer against the notebook
```yaml
id: note-check-phone-against-notebook
priority: 2
venue: GitHub
url: "https://github.com/pctablet505/keras-ondevice-android/blob/main/docs/02-check-against-the-notebook.md"
related: [keras-ondevice-android]
```
A test proves something only if it could have failed; how to check an on-device model against Python.

### Where Keras-to-LiteRT conversion breaks, with the evidence
```yaml
id: note-litert-traps
priority: 2
venue: GitHub
url: "https://github.com/pctablet505/keras-ondevice-android/blob/main/docs/03-traps.md"
related: [keras-ondevice-android, keras-litert-export]
```
Each conversion trap with the public issue or pull request behind it.

### How Porchlamp measures and ranks projects
```yaml
id: note-porchlamp-methodology
priority: 2
venue: porchlamp.org
url: "https://porchlamp.org/methodology/"
related: [porchlamp]
```
How a stranger's pull request is followed, scored and turned into a ranking.

### Operating local vLLM: switching and recovery
```yaml
id: note-servedeck-operations
priority: 3
venue: servedeck.rlalphalabs.com
url: "https://servedeck.rlalphalabs.com/operations/"
related: [servedeck]
```
Switching and starting models, what a restart costs, and recovery from failed boots, leaked shared memory and GPU
faults.

### Open problems in RL for Indian equity trading
```yaml
id: note-rl-open-problems
priority: 3
venue: rlalphalabs.com
url: "https://rlalphalabs.com/research/open-problems.html"
related: [rl-alpha-labs]
```
Research problems the lab has not solved, written for collaborators.

## Demos

### Damaged barcode reader
```yaml
id: barcode-reader
priority: 1
status: planned
related: [damaged-barcodes]
now: "An animation, drawn by code, of a barcode being damaged step by step and read back, including the point where the reader refuses."
live_url: ""
```
Point a camera at a scuffed barcode, or upload a photo, and watch it get found, cleaned up and read, or refused when the
damage is too much. Rebuilt from scratch with public techniques.

### Which hand are you using?
```yaml
id: which-hand
priority: 1
status: planned
related: [behavioural-identification]
now: "An animation of touch and motion signals from a left-hand and a right-hand grip, side by side."
live_url: ""
```
Tap and swipe a few times on your phone and the page guesses which hand holds it: the first signal in telling users
apart by behaviour. Rebuilt from scratch with public techniques.

### Face and attention on camera
```yaml
id: face-attention
priority: 2
status: planned
related: [face-recognition, attention-detection]
now: "An animation of face landmarks, head pose and an attention signal over a short drawn sequence."
live_url: ""
```
Live face landmarks with attention and expression signals from your camera. Rebuilt from scratch with public
techniques.

## Education

### MicroMasters in Statistics and Data Science, MITx
```yaml
id: mitx-micromasters
priority: 1
issuer: MITx (MIT, online)
start: 2021-02
end: 2023-06
date: 2023-05
url: "https://credentials.edx.org/credentials/df346be2b21745ca9ad5195d4f264360/"
image: "certificates/mitx-micromasters.png"
```
Probability, statistics, machine learning and data analysis, ending in a capstone exam.

### B.Tech, Computer Science and Engineering, BIT Sindri
```yaml
id: btech
priority: 2
issuer: Birsa Institute of Technology Sindri
start: 2018-08
end: 2022-06
```

## Certificates

### MIT 6.86x, Machine Learning with Python: from Linear Models to Deep Learning
```yaml
id: mit-686x
priority: 2
issuer: MITx
date: 2021-05-27
url: "https://courses.edx.org/certificates/8cbde197f6874661ab8794d753f9fd7b"
image: "certificates/mit-686x.jpg"
```

### MIT 6.419x, Data Analysis: Statistical Modeling and Computation in Applications
```yaml
id: mit-6419x
priority: 2
issuer: MITx
date: 2021-11-19
url: "https://courses.edx.org/certificates/bf4ea7cb34a742cea00c770801d1947d"
image: "certificates/mitx-6419x.png"
```

### MIT 18.6501x, Fundamentals of Statistics
```yaml
id: mit-186501x
priority: 2
issuer: MITx
date: 2021-09-21
url: "https://courses.edx.org/certificates/3c59035943454549990f2d2de7f49e9f"
image: "certificates/mitx-186501x.png"
```

### MIT 6.431x, Probability: the Science of Uncertainty and Data
```yaml
id: mit-6431x
priority: 2
issuer: MITx
date: 2021-09-02
url: "https://courses.edx.org/certificates/45213294fe2649c5a5954e4c42a70f13"
image: "certificates/mit-6431x.png"
```

### CS50's Introduction to Artificial Intelligence with Python
```yaml
id: cs50-ai
priority: 2
issuer: Harvard CS50
date: 2021
url: "https://cs50.harvard.edu/certificates/2b1773c1-473d-4a7b-89ae-460d23154126"
image: "certificates/cs50-ai.png"
```

### SWC Professional
```yaml
id: samsung-swc-professional
priority: 2
issuer: Samsung Electronics
date: 2022-12
```
Samsung's software-competency certification.

### MITx Statistics and Data Science Capstone Exam
```yaml
id: mitx-capstone
priority: 3
issuer: MITx
date: 2023-04
```

### Sequence Models
```yaml
id: dlai-sequence-models
priority: 3
issuer: DeepLearning.AI
date: 2025-04
```

### Transformer Models and BERT Model
```yaml
id: transformer-bert
priority: 3
issuer: Google Cloud
date: 2025-02
```

### SSCP Cert Prep: Cryptography
```yaml
id: sscp-cryptography
priority: 3
issuer: LinkedIn Learning
date: 2022-08-01
url: "https://www.linkedin.com/learning/certificates/ce217421b25f5ed3a79b285747e63908813fae27bd68729b6dd7dac38d27a0ad"
image: "certificates/sscp-cryptography.png"
```

### Communication within Teams
```yaml
id: communication-within-teams
priority: 3
issuer: LinkedIn Learning
```

### Introduction to AI
```yaml
id: ibm-intro-ai
priority: 3
issuer: IBM (Coursera)
date: 2021-05-06
url: "https://www.coursera.org/account/accomplishments/certificate/UA73U5EJC6XJ"
image: "certificates/ibm-intro-ai.png"
```

### Python for Data Science, AI and Development
```yaml
id: ibm-python
priority: 3
issuer: IBM (Coursera)
date: 2021-08-12
url: "https://www.coursera.org/account/accomplishments/verify/YSE63GF4U76Q"
image: "certificates/ibm-python.png"
```

### Complete 2020 Data Science and Machine Learning Bootcamp
```yaml
id: udemy-ds-bootcamp
priority: 3
issuer: Udemy
date: 2020-12-15
url: "http://ude.my/UC-d7c52c49-464f-4b63-a9b4-2da5d4c53ff4/"
image: "certificates/udemy-ds-bootcamp.jpg"
```

### Algorithms and Data Structures in Python
```yaml
id: udemy-dsa
priority: 3
issuer: Udemy
date: 2020-05-11
url: "https://www.udemy.com/certificate/UC-37c2faaf-17c4-4089-ab2d-18190a8aa61f/"
image: "certificates/udemy-dsa.jpg"
```

### Introduction to Python Programming
```yaml
id: udemy-python
priority: 3
issuer: Udemy
date: 2020-05-11
image: "certificates/udemy-python.jpg"
```

### Kaggle: Python, Intro to ML, Intermediate ML, Intro to Deep Learning
```yaml
id: kaggle-courses
priority: 3
issuer: Kaggle
links:
  - {label: Python, url: "https://www.kaggle.com/learn/certification/pctablet505/python"}
  - {label: Intro to Machine Learning, url: "https://www.kaggle.com/learn/certification/pctablet505/intro-to-machine-learning"}
  - {label: Intermediate Machine Learning, url: "https://www.kaggle.com/learn/certification/pctablet505/intermediate-machine-learning"}
  - {label: Intro to Deep Learning, url: "https://www.kaggle.com/learn/certification/pctablet505/intro-to-deep-learning"}
```

### HackerRank skill certificates
```yaml
id: hackerrank-certificates
priority: 3
issuer: HackerRank
links:
  - {label: Problem Solving (Advanced), url: "https://www.hackerrank.com/certificates/fc7b9af8aac8"}
  - {label: Problem Solving (Intermediate), url: "https://www.hackerrank.com/certificates/f5bcd6aa9355"}
  - {label: Problem Solving (Basic), url: "https://www.hackerrank.com/certificates/e3c6568f71c6"}
  - {label: Python (Advanced), url: "https://www.hackerrank.com/certificates/6e9c190da189"}
  - {label: Python (Intermediate), url: "https://www.hackerrank.com/certificates/9ecfb2a355a2"}
  - {label: Python (Basic), url: "https://www.hackerrank.com/certificates/93d10484c124"}
  - {label: C (Advanced), url: "https://www.hackerrank.com/certificates/58d066424a1e"}
  - {label: C (Intermediate), url: "https://www.hackerrank.com/certificates/337182b9dc84"}
  - {label: C (Basic), url: "https://www.hackerrank.com/certificates/0c61249bbe1d"}
  - {label: Java, url: "https://www.hackerrank.com/certificates/253bacd0f0c0"}
  - {label: CSS, url: "https://www.hackerrank.com/certificates/92d056e955d2"}
  - {label: SQL (Intermediate), url: "https://www.hackerrank.com/certificates/74470a9fe364"}
  - {label: SQL (Basic), url: "https://www.hackerrank.com/certificates/2508bf1f2b12"}
```

## Awards

### MD Appreciation Award
```yaml
id: md-appreciation-award
priority: 1
issuer: Samsung R&D Institute India
date: 2023-09
related: [exam-proctoring]
```
From the Managing Director, for the exam-proctoring platform.

### GATE 2021, Computer Science: All India Rank 5,648
```yaml
id: gate-2021
priority: 2
issuer: GATE
date: 2021
```

### World Programming Championship, IIT Bombay Techfest: rank 69
```yaml
id: techfest-wpc
priority: 2
issuer: IIT Bombay Techfest
date: 2021-01
```

### HackerRank HackFest 2020: gold, rank 29 of 8,051
```yaml
id: hackfest-2020
priority: 2
issuer: HackerRank
date: 2020
url: "https://www.hackerrank.com/results/hackerrank-hackfest-2020/stopslavery404"
```

### TCS CodeVita: international rank 242 (Season 9) and 426 (Season 10)
```yaml
id: codevita
priority: 3
issuer: TCS
```
Season 9: rank 1,042 in round 1, then international rank 242 in round 2. Season 10: international rank 426 in round 1.

### HackerRank Hack the Interview
```yaml
id: hack-the-interview
priority: 3
issuer: HackerRank
links:
  - {label: "IV, Asia Pacific: 100 of 4,353", url: "https://www.hackerrank.com/results/hack-the-interview-iv-apac/stopslavery404"}
  - {label: "IV, US: 65 of 1,217", url: "https://www.hackerrank.com/results/hack-the-interview-iv/stopslavery404?h_r=profile"}
```
III: 73 of 919. IV, Asia Pacific: 100 of 4,353. IV, US: 65 of 1,217.
