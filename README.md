# Slidev Civil Engineering Lecture Slides & Calculations Platform

A centralized platform containing interactive Slidev lecture decks for civil engineering topics, backed by a modular, unit-tested calculation engine, Firebase Firestore integration, and an adaptive slide layout component library.

## Key Features

### 1. Presentation Component Library (Adaptive Layouts)
A set of mode-aware presentation components that automatically adapt their rendering between **Slide/Presenter Mode** and **Blog Mode** (stacking columns vertically, stripping backgrounds, shadows, and absolute positioning for scroll-oriented reading):
- **Layouts**: `<SlideTwoColumns>`, `<SlideGrid>` (1-4 columns, auto-collapsing on mobile).
- **Text & Lists**: `<SlideParagraph>`, `<SlideBullet>`, `<SlideList>` (supporting `each-click`, `all-click`, and `auto-stagger` reveals).
- **Accents**: `<SlideQuote>`, `<SlideBadge>`, `<SlideCallout>` (info, warning, error, success variants).
- **Visuals**: `<SlideImage>` (flat, caption-ready image component), `<SlideTimeline>`, `<SlideStepProgress>`.

### 2. Interactive Calculations & URL Syncing (`useUrlSyncedState`)
- Synchronize estimate values and calculation parameters directly with the browser URL query search parameters (e.g., `?s3.length=6.000`).
- Scoped automatically by slide index (e.g., `s3.thickness` vs. `s4.thickness`) to prevent variable collisions when navigating slides.
- Integrates cleanly with `<InteractiveCard>`, `<ParameterSlider>`, and `<CalculationOutput>` components.

### 3. Step-by-Step Table Reveals & Animations
- **Dynamic Columns**: Adds column headers and cell columns on specific click steps using the `revealAt` property inside table header objects.
- **Smooth Transition CSS**: Hidden columns use zero-width, zero-padding, zero-border, and hidden overflow styling, sliding open and fading in seamlessly via a CSS transition-all curve.
- **Cell Data Filling**: Fills specific table cells on click using nested `<ClickReveal>` triggers.
- **Cell Highlights**: Spotlights key quantities or calculations using `<ClickHighlight>`.

### 4. Course Portal & Lecture Dashboard
- **Subject & Session Selectors**: Centralized dashboard routing to filter lectures by specific subjects, academic sessions, and individual lecture decks.
- **Flexible View Modes**: Toggles any loaded lecture deck dynamically between **Slide Mode** (presentation-style viewport) and **Blog Mode** (full-height vertical reading mode) for print or scroll access.
- **Document Exporting & PDF Prints**: Custom styling templates allowing slide cards to be exported smoothly to static PDFs or printable lecture handouts.

---

## Directory Layout

```text
├── .agent/         # AI Agent rules & skills
├── setup/          # Slidev application bootstrap config
├── src/
│   ├── cores/      # Pure business logic (QS calculations, user validations)
│   ├── features/   # Reusable components & hooks (Presentation player, Quiz cards, BoQ)
│   │   └── presentation/
│   │       ├── components/elements/   # Adaptive Slide elements (Table, Grid, Progress)
│   │       ├── context/                # Presentation and ClickSteps state contexts
│   │       └── hooks/                  # useUrlSyncedState and slide hooks
│   ├── services/   # Infrastructure layers (Firebase authentication, Firestore repos)
│   └── shared/     # App-wide layouts and shared components (Identification Gate)
├── package.json    # Project dependencies & scripts
└── README.md       # Project overview and documentation
```

---

## Getting Started

### Prerequisites
- Node.js (v18+)
- npm

### Installation
```bash
npm install
```

### Run Local Development Server
Starts the dev orchestrator on local ports for interactive presentation views.
```bash
npm run dev
```

### Build for Production
Compiles files and builds the static HTML bundle.
```bash
npm run build
```

---

## Testing & Code Quality

### Run Unit Tests (Vitest)
Executes structural calculation and utility test suites.
```bash
npm run test
```

### Run ESLint & Type Checks
```bash
npm run lint
npm run typecheck
```
