---
name: math-engine
description: Guides extending the modular Quantity Surveying mathematical engine.
---

# Skill: Extending the QS Calculation Engine

This skill guides adding new calculation routines (e.g. excavation, timbering) to the engine.

## Step-by-Step Integration

1. **Interface Contract**:
   Define the calculation parameters and return shapes in `cores/quantity-surveying/qs.interface.ts`.

2. **Isolated Module**:
   Create a new module file in `cores/quantity-surveying/{domain}.ts`. Ensure:
   - All inputs are in base SI units.
   - All outputs are rounded to 3 decimal places.
   - File length is under 200 lines.

3. **Service Class Integration**:
   Implement the new interface method inside `cores/quantity-surveying/qs.service.ts`.

4. **Barrel Export**:
   Export the types/namespace cleanly in `cores/quantity-surveying/index.ts`.

5. **Unit Tests**:
   Write extensive test coverage under `cores/quantity-surveying/__tests__/`.
