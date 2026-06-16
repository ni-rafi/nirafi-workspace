---
theme: default
class: text-center
highlighter: shiki
lineNumbers: true
drawings:
  persist: false
transition: slide-left
title: Lecture 2 - Brickwork & Mortar Estimations
---

<RollNumberGate />

# Lecture 2: Brickwork & Mortar Estimations

Welcome to the active Fall 2026 Semester quantity surveying course.

- 🧱 Learn structural masonry calculation principles.
- 📐 Account for standard mortar margins.
- 📝 Log interactive results to Firebase.

---
layout: default
lectureTitle: Brickwork Calculations - Theory
moduleCode: CE-QS-2026
---

# Brickwork Calculation Theory

To calculate the number of raw bricks needed for a wall, we divide the wall volume by the volume of a single brick including its mortar joint thickness:

$$B_c = \frac{A_{\text{wall}} \times T_{\text{wall}}}{(L_{\text{brick}} + M) \times (W_{\text{brick}} + M) \times (H_{\text{brick}} + M)}$$

Where:
- \(M\): Mortar joint thickness (usually **10mm** or **0.01m**).
- Standard brick sizes: **240mm × 115mm × 70mm**.

---
layout: default
lectureTitle: Brickwork Calculations - Assessment
moduleCode: CE-QS-2026
---

# Classroom Quiz - Lecture 2

Answer the question below to submit your score:

<InteractiveQuiz 
  quizId="qs_2026_brickwork_q1" 
  question="If standard brick sizes are 240mm x 115mm x 70mm, and the mortar joint thickness is 10mm, what is the single brick volume including mortar?"
  :options="['0.001932 m³', '0.002500 m³', '0.002000 m³', '0.001500 m³']"
  :correctIndex="0"
/>
