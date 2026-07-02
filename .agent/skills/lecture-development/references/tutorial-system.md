# Tutorial System Reference Guide

Tutorials are a distinct `type: 'tutorial'` lecture that render in scroll/blog mode via `BlogOrchestrator`. They support timed access windows, per-student checkpoint quizzes, and academic PDF export — entirely client-side.

---

## 1. Metadata (`metadata.ts`)

```typescript
export const metadata: Lecture = {
  id: 'tutorial-1-sfd-bmd',
  title: 'Tutorial 1: SFD & BMD',
  description: '...',
  slideNo: 1,
  durationMins: 45,
  locked: false,
  topicId: 'sfd-bmd',
  type: 'tutorial',       // switches rendering to BlogOrchestrator
  fullMarks: 10,          // shown in the academic PDF header
  timeLimit: '45 minutes',
};
```

The `lecture.tsx` entry is identical to a regular lecture:

```typescript
import { slides, slideMetadata } from './slides';
export { slides, slideMetadata };
```

---

## 2. Section Structure

Tutorial sections use the same section/barrel pattern as lectures. Two reserved `tutorialRole` values control PDF behaviour:

| `tutorialRole` | `type` | PDF |
|---|---|---|
| `'statement'` | `'Concept Details'` | Always printed |
| `'checkpoint'` | `'Dynamic Quiz'` | Hidden automatically |

Cover/intro sections use `type: 'Title Card'` and are also excluded from the PDF.

```typescript
// slides/section-q1/index.ts
export const sectionMetadata = {
  1: { title: 'Question 1 Statement', type: 'Concept Details',
       section: 'Question 1: Compound Beam', tutorialRole: 'statement' },
  2: { title: 'Question 1 Checkpoint', type: 'Dynamic Quiz',
       section: 'Question 1: Compound Beam', tutorialRole: 'checkpoint',
       quizId: 'mos_2024_tut1_q1' },
};
```

---

## 3. Checkpoint Quiz Slides

Each checkpoint slide renders `<QuizCardOrchestrator>` with a per-student dynamic `questionText`. Use `parameterResolver` to build registration-number-aware questions that return JSX:

```typescript
export const Question1Checkpoint: React.FC = () => {
  const questionText = React.useMemo(() => {
    const qFn = (reg: string) => {
      const wVal = parameterResolver.resolve(
        { formula: '3.0 + [last digit] * 0.2',
          resolve: (r) => (3.0 + parameterResolver.getLastDigit(r) * 0.2).toFixed(1) },
        reg
      );
      return (
        <span>
          {"For the beam, if \\(w = "}{wVal}{"\\text{ kN/m}\\), calculate \\(R_B\\) in kN."}
        </span>
      );
    };
    return Object.assign(qFn, {
      formula: 'w = (3.0 + [last digit] * 0.2) kN/m — calculate R_B in kN.'
    });
  }, []);

  return (
    <FullWidthLayout title="Question 1 Checkpoint: Reaction at B">
      <QuizCardOrchestrator
        quizId="mos_2024_tut1_q1"
        questionText={questionText}
        quizType="numeric-input"
      />
    </FullWidthLayout>
  );
};
```

**Rules:**
- `quizId` must be globally unique — used as the Firestore document key.
- Question functions returning JSX render as `React.ReactNode`; embed math values as JSX text segments adjacent to LaTeX delimiter strings.
- In tutorial mode, quiz status (`active`/`closed`) is derived from the scheduling window — no Firebase quiz document needed.

---

## 4. Runtime Architecture

`BlogOrchestrator` detects `lecture.type === 'tutorial'` and:

1. Renders an academic SUST header (university, department, course, full marks, teacher, time limit).
2. Sets `isTutorial: true` in `PresentationContext`, propagated to all nested quiz components via `BlogSlideCard`.
3. Polls `getLectureActiveRange(subjectId, sessionId, lectureId)` every second to compute `tutorialLocked`:
   - `tutorialLocked = true` when `now < activeFrom` or `now > activeUntil`.
4. Quiz components read `isTutorial` from context: if `true`, they skip Firebase subscription and derive status from `tutorialLocked` instead.
5. **Admins** see `AdminQuizView` with question preview + reg-number inspector (no timer/activation controls).
6. **Students** see the standard student quiz view driven by the timing window.

---

## 5. Scheduling

From **LectureCard** on the portal, admins click **Schedule** to open the date/time picker. This writes `activeFrom` and `activeUntil` Unix timestamps to Firestore via the `lectureActivation` service. All quiz checkpoints in the tutorial automatically activate and close based on these timestamps in real-time.

---

## 6. PDF Export

The **Export PDF** button (Desktop + Mobile header) triggers `react-to-print` on the `BlogOrchestrator` root div. Print CSS is scoped to `#blog-orchestrator-root.tutorial-print-root` so normal lecture prints are unaffected.

**What is hidden:**
- `type: 'Dynamic Quiz'` slides (checkpoint cards including their h3 title)
- `type: 'Title Card'` slides (cover/intro)
- Section collapse buttons and all interactive controls
- `.quiz-print-excluded`, `.quiz-print-placeholder`, `.cover-print-excluded`

**Page-break rules:**
- `svg { break-inside: avoid }` — beam diagrams never clipped
- `.grid, [class*="grid-cols"] { break-inside: avoid }` — two-column layouts stay together
- `[class*="rounded-xl/2xl"] { break-inside: avoid }` — parameter/formula boxes stay whole
- `h2, h3 { break-after: avoid }` — headings stay with their body

Slide cards themselves are **not** locked to a single page — multiple questions can share the same printed page naturally.
