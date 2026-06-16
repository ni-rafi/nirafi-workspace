---
trigger: always_on
description: Linter and Testing Rules
---

# Testing and Linter Rules

## 1. Type Safety
- TypeScript strict mode must be enabled and followed.
- Explicit type `any` is strictly prohibited. If a type cannot be known, use `unknown` or define an interface.
- Solve all compiler errors and warnings prior to checking in.

## 2. Unit Testing
- Every mathematical file inside `cores/` must have companion unit tests.
- Place unit tests inside a nested `__tests__` folder (e.g. `cores/quantity-surveying/__tests__/`).
- Run tests using `npm run test` (Vitest framework).

## 3. Linting
- All files must be checked and pass ESLint checks cleanly.
- Run checks using `npm run lint`.

## 4. Database Schema Verification
- Database operations must enforce pre-flight validation via Zod schemas.
- Verify Zod parser calls (`.parse()`) reject invalid payloads.
