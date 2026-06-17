# Slidev Civil Engineering Lecture Slides & Calculations Platform

A centralized platform containing interactive Slidev lecture decks for civil engineering topics, backed by a modular, unit-tested calculation engine and Firebase Firestore integration.

## Key Features

- **Slidev Presentations**: Responsive, code-enabled slide decks for student lectures.
- **Civil Engineering Calculation Engine**: Highly precise mathematical modules under `src/cores/quantity-surveying` for:
  - **Concrete**: Volume calculation with custom wastage factor support.
  - **Brickwork**: Raw brick counts and mortar volume calculations.
  - **Steel**: Reinforcement bar weight calculation.
- **Firebase Auth & Firestore Integration**:
  - Decoupled Repository Pattern using a unified `BaseFirestoreRepository`.
  - Global `UserContext` managing anonymous sign-in, admin custom claims inspection, and Gate verification.
  - Granular validation and normalization of student registration numbers (10 digits) and academic sessions (`YYYY-YY`).
- **Comprehensive Verification**: 32 unit tests passing cleanly with ESLint and TypeScript compilation checks.

---

## Directory Layout

```text
├── .agent/         # AI Agent rules & skills
├── setup/          # Slidev application bootstrap config
├── src/
│   ├── cores/      # Pure business logic (QS calculations, user validations)
│   ├── features/   # Feature-specific components (BoQ Spreadsheet, Concrete steps)
│   ├── services/   # Infrastructure layers (Firebase authentication, Firestore repositories, DI tokens)
│   └── shared/     # Application-wide layouts and shared components (Identification Gate, Interactive Quiz)
├── slides.md       # Primary Slidev slides file
└── package.json    # Project dependencies & scripts
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
```bash
npm run dev
```

### Build for Production
This will run the TypeScript compiler check first, and then build the static HTML bundle.
```bash
npm run build
```

---

## Running Verification Suite

### Execute Unit Tests (Vitest)
```bash
npm run test
```

### Run TypeScript Type Check
```bash
npm run typecheck
```

### Run Linter (ESLint)
```bash
npm run lint
```
