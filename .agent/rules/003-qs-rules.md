---
trigger: always_on
description: Quantity Surveying (QS) Engine Core Rules
---

# Quantity Surveying Core Engine Rules

## 1. Input/Output Standards
- **Input Units**: All mathematical calculation inputs (dimensions, weights) in the core services must accept SI base units (meters, kilograms).
- **Conversions**: UI components handle user-facing conversions (e.g. converting millimeter inputs to meters) before invoking the core engine.
- **Output Precision**: All calculated decimal results returned by the engine must be rounded to exactly 3 decimal places to prevent floating-point anomalies and ensure visual alignment.

## 2. Calculation Separation
- Every structural module (concrete, brickwork, steel) must reside in its own isolated file under `cores/quantity-surveying/`.
- Private helper methods must stay inside their respective files and not bleed across domains.
- Expose all calculations cleanly through the barrel facade (`cores/quantity-surveying/index.ts`).
