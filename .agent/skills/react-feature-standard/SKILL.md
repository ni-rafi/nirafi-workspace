---
name: react-feature-standard
description: Standard structure and conventions for developing reusable React features and slide-deck lectures.
---

# React Feature & Lecture Development Standard

This skill defines the folder structure and guidelines for developing core reusable UI components inside `src/features/` and lecture slide decks inside `src/lectures/`.

---

## 1. Directory Structure

### 1.1 Core Features (`src/features/`)
Every core feature is presentation-agnostic and reusable. It must follow this structure:
```text
src/features/{featureName}/
├── components/       # Presentational components (Pure UI, props-driven)
├── hooks/            # Controllers, custom hooks (Zustand, state integration)
├── types/            # TypeScript interfaces internal to the feature
└── index.ts          # Barrel exports exposing only public components and hooks
```

#### Reusable Features Examples:
- **`presentation`**: Aspect-ratio slideshow viewer, keyboard shortcuts (`useNavShortcuts`), overlays, and element layout templates (`SlideBullet`, `SlideParagraph`, `SlideEquation`, `SlideTable`, `SlideList`, `LatexFormula`).
- **`gate`**: Roll number validation dialog and guest log-in forms.
- **`quiz`**: Real-time Interactive Quiz card (submits scores to Firestore).
- **`qs-calculators`**: Civil Engineering math estimators (Concrete Wizard steps, BoQ spreadsheet).

### 1.2 Lectures (`src/lectures/`)
Slide decks are composed strictly of components, widgets, and layouts imported from `src/features/` and `src/shared/layouts/`. They are organized by subject and session:
```text
src/lectures/{subjectName}/session-{year}/{lectureName}/
├── lecture.tsx   # Lecture slide configurations and text content composed in JSX
└── ...           # Lecture-specific assets or helper configurations
```

---

## 2. Coding Guidelines

### 2.1 UI vs. Orchestration Logic
* Components in `features/` must be **pure presentational UI**. They should receive data and handler callbacks strictly via standard React properties.
* Extract stateful orchestration, timers, and store integrations into custom hooks in `hooks/`.
* No API calls, Firebase initialization, or global subscriptions should occur inside presentation components.

### 2.2 Reusable Slide Layouts
To ensure a consistent visual look and unified view transition effects across all lectures, slide layout templates are structured inside `src/shared/layouts/`:
* **`TitleLayout`**: Centered cover/section slide.
* **`FullWidthLayout`**: Standard widescreen slide width for general content.
* **`TwoColumnLayout`**: Dual side-by-side columns (e.g. calculation parameter panels alongside outputs).
* **`GridLayout`**: Matrix structures for quiz elements or galleries.

*Note*: Layout files MUST delegate title and footer rendering to the standalone `<LayoutHeader>` and `<LayoutFooter>` components (from `src/shared/layouts/components/`) to automatically inherit `.slide-header-title` and `.slide-layout-footer` CSS transition classes.

### 2.3 Semantic Presentational Elements
Avoid using raw HTML list tags, standard paragraph tags, or unstyled tables. Use the slide elements located in `src/features/presentation/components/elements/`:
* `<SlideBullet>`: Renders items with icon overrides or circle indicators.
* `<SlideParagraph>`: Renders copy/information blocks.
* `<SlideEquation>`: Flat, borderless rendering of LaTeX formulations.
* `<SlideContent>`: Helper component that accepts a `blocks` configuration array and maps them to `<SlideBullet>`, `<SlideParagraph>`, `<SlideEquation>` etc.

---

## 3. Example Implementation

### Lecture Component Definition in JSX:
```tsx
// src/lectures/quantity-surveying/session-2026/lecture-2-brickwork/lecture.tsx
import React, { useState } from 'react';
import { TitleLayout } from '@/shared/layouts/TitleLayout';
import { TwoColumnLayout } from '@/shared/layouts/TwoColumnLayout';
import { SlideContent } from '@/features/presentation';
import { calculateBrickwork } from '../calculations/brickwork';

// Slide 1: Cover Slide
const Slide1: React.FC<any> = ({ subject, lecture }) => (
  <TitleLayout
    title={lecture.title}
    subtitle={`${subject.code} Series • Session 2026`}
    description={lecture.description}
    footer="CE-QS Academic Department"
  />
);

// Slide 2: Theoretical Overview
const Slide2: React.FC = () => (
  <TwoColumnLayout
    title="Masonry Estimating Theory"
    bgVariant="default"
    leftWidth="45%"
    leftContent={
      <SlideContent
        blocks={[
          {
            type: 'paragraph',
            text: 'Brickwork estimation determines the number of raw bricks and the volume of wet mortar joint filling needed.',
          },
          {
            type: 'equation',
            math: '\\text{Mortar Vol} = \\text{Wall Vol} - (\\text{Bricks} \\times \\text{Brick Vol})',
            revealAt: 1,
          },
        ]}
      />
    }
    rightContent={
      <SlideContent
        blocks={[
          { type: 'paragraph', text: 'Standard brick dimensions in SI metrics:' },
          { type: 'bullet', text: 'Length: 0.240m (240mm)' },
          { type: 'bullet', text: 'Width: 0.115m (115mm)' },
          { type: 'bullet', text: 'Height: 0.070m (70mm)' },
          { type: 'bullet', text: 'Standard mortar joint width: 0.010m (10mm)' },
        ]}
      />
    }
  />
);

export const slides: Record<number, React.ComponentType<any>> = {
  1: Slide1,
  2: Slide2,
};

export const slideMetadata: Record<number, { title: string; type: string; section: string }> = {
  1: { title: 'Brickwork Cover', type: 'Cover Slide', section: 'Introduction' },
  2: { title: 'Masonry Principles', type: 'Theory Overview', section: 'Introduction' },
};
```
