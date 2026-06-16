---
trigger: always_on
description: Core Architecture and File Size Rules
---

# Core Workspace Rules

## 1. Primary Rule
- Keep files under 200 lines when possible. The absolute hard limit is 250 lines unless explicitly justified.

## 2. Directory Topology
- `cores/`: Isolated, pure mathematics/business logic files. Absolutely no UI code or Vue imports here.
- `features/`: Focuses on course materials (slides, custom page layouts, custom presentation components).
- `services/`: Shared infrastructure models, authentication handlers, API connections, and DI orchestration.
- `routes/`: Routing middleware and redirection hooks.
- `shared/`: App-wide layouts and helper components.

## 3. Dependency Injection (DI) & Coding Principles
- Use Dependency Injection (DI) as the primary pattern to resolve service instances. Under Vue, register singletons inside `setup/main.ts` using Vue's native `provide()` context, and consume them inside components using Vue's `inject()`.
- Use TypeScript interfaces to define contracts. Never bind components directly to concrete service classes without an interface.
- Adhere strictly to SOLID principles:
  - Single Responsibility: Keep components and service classes small.
  - Open/Closed: Extend calculations or actions via polymorphism.
  - Liskov Substitution: Implement service interfaces consistently.
  - Interface Segregation: Keep client/math interfaces focused.
  - Dependency Inversion: Depend on abstractions (tokens/interfaces), not concretions.

## 4. File Naming Conventions
- **Services**: Name in `camelCase` with the `Service` suffix (e.g., `firebaseService.ts`, `qsService.ts`). Do NOT use dot-separated suffixes like `.service.ts`.
- **Interfaces**: Begin with the letter `I` in PascalCase (e.g., `IFirebaseService.ts`, `IQSEngine.ts`).
- **Validation Schemas**: Put Zod schemas in `{serviceName}.schemas.ts` files, deriving types using `z.infer`.

