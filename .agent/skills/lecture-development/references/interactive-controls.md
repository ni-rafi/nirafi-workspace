# Slide Interactive Controls & State Sync Reference Guide

This document lists every interactive control, animation utility, annotation element, and state sync helper available in the codebase, detailing their props, usages, and best practices.

---

## 1. Click Animation & Reveals

### ClickReveal
Hides children initially and fades/slides them into view on a specific sessional click step.
* **Props**:
  * `at: number | string` (Step index like `1`, or relative offset like `"+1"`)
  * `preset?: 'fade' | 'fade-in' | 'up' | 'down' | 'scale' | 'none'`
  * `style?: React.CSSProperties`, `children?: React.ReactNode`
* **Example**:
  ```tsx
  <ClickReveal at={1} preset="up"><div>Revealed at step 1</div></ClickReveal>
  ```

### ClickRevealGroup
Enables auto-stagger reveals or ordered clicking sequences for nested child elements.
* **Props**:
  * `revealMode?: 'each-click' | 'auto-stagger' | 'none'`
  * `delayMs?: number` (stagger timing, default: `200`)
* **Example**:
  ```tsx
  <ClickRevealGroup revealMode="auto-stagger">
    <div>Step 1</div><div>Step 2</div>
  </ClickRevealGroup>
  ```

### ClickHighlight
Applies paintbrush, strikeout, or color transition outlines to running text or equations.
* **Props**:
  * `at: number` (activation click step)
  * `variant?: 'text' | 'paint' | 'rect' | 'bold' | 'strike'`
* **Example**:
  ```tsx
  <span>Measure <ClickHighlight at={2} variant="paint">thickness</ClickHighlight> here.</span>
  ```

### HoverTooltip
Standard tooltip bubble triggered by sessional hover gestures.
* **Props**:
  * `text: string`, `children: React.ReactNode`
* **Example**:
  ```tsx
  <HoverTooltip text="Standard brick joint is 10mm"><span>Mortar joint</span></HoverTooltip>
  ```

---

## 2. Parameter Control Panels

All parameter control widgets must reside inside standard card panels.

### InteractiveCard
A container card panel wrapper that adapts to Blog Mode by stripping backgrounds and absolute lines.
* **Props**:
  * `title?: string`, `variant?: 'default' | 'plain'`, `children: React.ReactNode`
* **Example**:
  ```tsx
  <InteractiveCard title="Inputs"><ParameterSlider ... /></InteractiveCard>
  ```

### ParameterSlider
Renders a slider bar with values formatting and responsive layout scaling.
* **Props**:
  * `label: string`, `value: number`, `unit: string`
  * `min: number`, `max: number`, `step?: number`, `onChange: (val: number) => void`
* **Example**:
  ```tsx
  <ParameterSlider label="Width" value={w} unit="m" min={0.5} max={3} onChange={setW} />
  ```

### CalculationOutput
Renders calculated results with monospaced bold text and responsive size transitions.
* **Props**:
  * `title: string`, `value: string | number`, `unit?: string`, `subtitle?: string`
* **Example**:
  ```tsx
  <CalculationOutput title="Volume" value={vol} unit="m³" />
  ```

---

## 3. Structural Annotations & Physics Sandbox

### SlideDimensionLines
Renders CAD-like dimension arrows and label boundaries on structural drawing elements.
* **Props**:
  * `el: VisualCanvasShape`, `scaleFactor: { pixelsPerUnit: number; unit: PhysicalUnit }`
  * `editable: boolean`, `onLabelClick?: (...) => void`
* **Example**:
  ```tsx
  <SlideDimensionLines el={footingShape} scaleFactor={{ pixelsPerUnit: 100, unit: 'm' }} editable={true} />
  ```

### BeamLoads & BeamSupports
Annotates beams with pin/roller/fixed supports and UDL/UVL/Moment loads.
* **Props**:
  * `el: VisualCanvasShape`, `stroke: string`, `fill: string`, `sw: number`, `transform: string`
* **Example**:
  ```tsx
  <BeamSupports el={pinSupportShape} stroke="currentColor" fill="none" sw={2} transform="translate(100,200)" />
  ```

### ShapeMorph & PhysicsSandbox
Interpolates SVG paths dynamically or acts as a sessional 2D rigid-body collision simulator.
* **Props**:
  * `targetPath: string` (for `ShapeMorph`)
  * `gravity?: number`, `shapes: ShapeData[]` (for `PhysicsSandbox`)
* **Example**:
  ```tsx
  <ShapeMorph targetPath="M 0 0 L 100 100 Z" duration={500} />
  ```

---

## 4. State Sync Hook

### useUrlSyncedState
Synchronizes interactive parameters in real-time across student screens and sessional presentation displays.
* **Usage**:
  ```typescript
  import { useUrlSyncedState } from '@/features/presentation/hooks/useUrlSyncedState';
  
  const [thickness, setThickness] = useUrlSyncedState<number>('slab_thickness', 0.150);
  ```
* **Best Practices**:
  * Keep keys unique across the presentation.
  * Memoize object/array defaults to avoid render loops.

---

## 5. Live Classroom Quizzes

### QuizCardOrchestrator
Renders interactive sessional multiple-choice or numeric-input assessments synced with Firebase. Supports single questions or multi-question paginated step wizards.
* **Props**:
  * `quizId: string` (Must match the sessional active quiz key in database)
  * `questionText: string` (Used as question text for single question configuration)
  * `quizType?: 'numeric-input' | 'multiple-choice'` (Used as type for single question configuration)
  * `options?: string[]` (Options for single multiple-choice question configuration)
  * `questions?: SubQuestionDefinition[]` (List of questions for paginated multi-question wizard)
    * `idSuffix: string` (Appended to base quiz ID: `{quizId}-{idSuffix}`)
    * `questionText: string`
    * `quizType: 'numeric-input' | 'multiple-choice'`
    * `options?: string[]` (Required for multiple-choice steps)
* **Single Question Example**:
  ```tsx
  import { QuizCardOrchestrator } from '@/features/quiz';

  <QuizCardOrchestrator
    quizId="concrete_lec1_q1"
    questionText="What is the unit weight of RCC?"
    quizType="numeric-input"
  />
  ```
* **Multi-Question Example**:
  ```tsx
  import { QuizCardOrchestrator } from '@/features/quiz';

  const pileQuizQuestions = [
    {
      idSuffix: 'q0',
      questionText: 'Calculate the total volume of concrete in pile cap (m3).',
      quizType: 'numeric-input' as const,
    },
    {
      idSuffix: 'q1',
      questionText: 'Identify the cement type suitable for underwater piling.',
      quizType: 'multiple-choice' as const,
      options: ['OPC (Ordinary Portland)', 'PPC (Portland Pozzolana)', 'SRPC (Sulfate Resisting)'],
    }
  ];

  <QuizCardOrchestrator
    quizId="piling_lec4_quiz1"
    questionText=""
    questions={pileQuizQuestions}
  />
  ```

---

### 5.2 Dynamic & Parameterized Quizzes (Registration-Aware Variables)
To prevent copying during live sessions, classroom quizzes support registration-aware parameterization. Variables (e.g., slab dimensions or concrete covers) shift dynamically based on student registration numbers.

#### The Parameter Resolver Utility
The `parameterResolver` module provides helpers to inspect and evaluate dynamic parameters:
* `parameterResolver.isDynamic(value)`: Checks if a question text, option list, or answer target is a dynamic function or a parameterized parameter object.
* `parameterResolver.resolve(value, reg?)`: Overloaded resolver signature.
  - If `reg` is passed as a `string` (e.g. student roll), evaluates and returns `T`.
  - If `reg` is omitted/undefined (e.g. empty presenter preview), returns the `.formula` string representation.
* `parameterResolver.resolveTemplate(template, params, reg?)`: Scans a template string and replaces placeholders (e.g., `{L}`) using a parameter dictionary.
* `parameterResolver.lastDigit(offset, multiplier, suffix)`: Builder returning a `{ formula, resolve }` object for last-digit calculations.
* `parameterResolver.lastTwoDigits(offset, multiplier, suffix)`: Builder returning a `{ formula, resolve }` object for last-two-digits calculations.

#### Declaring Dynamic Parameters
You can declare dynamic questions and correct answers using builders or custom generator functions:
```typescript
import { QuizCardOrchestrator } from '@/features/quiz';
import { parameterResolver } from '@/features/quiz/utils/parameterResolver';

// 1. Defining Dynamic Questions with Templates
const slabParams = {
  L: parameterResolver.lastDigit(4.0, 0.1, 'm'),
  H: parameterResolver.lastTwoDigits(0.15, 0.005, 'm')
};
// Templates evaluate L to "4.0 + [last digit] × 0.1 m" (when empty) and concrete values (when roll is entered)
const questionText = 'Calculate the concrete volume for a slab with length L = {L} and thickness H = {H}.';

// 2. Defining Generator Functions with formula descriptions
const concreteAnswer = (reg: string) => String(4.0 * (4.0 + parameterResolver.getLastDigit(reg) * 0.1));
Object.assign(concreteAnswer, { formula: '4.0 × (4.0 + [last digit] × 0.1)' });
```

In the lecture `answers.ts` registry:
```typescript
// src/subjects/quantity-surveying/lectures/2023-24/answers.ts
import { parameterResolver } from '@/features/quiz/utils/parameterResolver';

export const QUIZ_ANSWERS = {
  qs_2023_lec4_q1: {
    formula: '120 + [last digit] × 10 mm',
    resolve: (reg) => String(120 + parameterResolver.getLastDigit(reg) * 10)
  }
};
```

#### Admin Inspector Panel
* **Conditional Visibility**: The "Inspector Roll" input panel and evaluated header tags are automatically hidden if the active quiz does not contain any dynamic variables.
* **Layout Relocation**: The inspector panel is positioned cleanly at the bottom of the presenter dashboard.
* **Formula Previews**: When the roll input is left empty, the preview cards render the raw mathematical formulas and placeholder expressions. Typing any registration roll instantly replaces formulas with the exact calculated values.

#### Type Safety Rules
1. **No `any` Casts**: Do not use `as any` when extending function metadata. Use the type-safe `Object.assign` helper:
   ```typescript
   // Correct
   Object.assign(myGenerator, { formula: 'x + [last digit]' });
   
   // Incorrect
   (myGenerator as any).formula = '...';
   ```
2. **Strict Props Contracts**: All orchestrator, student view, and admin view props enforce unions allowing parameter resolver constructs. Overloads are maintained inside `IParameterResolver` to guarantee type deduction without forcing manual type assertions in components.


