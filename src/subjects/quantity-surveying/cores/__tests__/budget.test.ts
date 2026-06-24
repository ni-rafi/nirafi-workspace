import { describe, test, expect } from 'vitest';
import {
  calculateIPCBill,
  calculateSteelCostWithMarkupInternal,
  calculatePlumbingBudgetInternal,
  calculateSepticTankCostInternal,
  calculateUnitRateFromScratch,
  calculateCompleteEstimate,
  calculatePreliminaryProjectBudget
} from '../budget';

describe('Project Budgeting & IPC Core Calculations', () => {
  test('should calculate correct values with zero progress', () => {
    const res = calculateIPCBill(
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      0.03,
      0.10,
      0.10,
      0.15,
      0.075,
      0.05,
      0
    );

    expect(res.totalBaseCost).toBe(4200000); // 250k + 1.2M + 950k + 800k + 400k + 600k
    expect(res.totalPreviousValue).toBe(0);
    expect(res.totalCurrentValue).toBe(0);
    expect(res.totalNetValue).toBe(0);
    expect(res.grossCurrentClaim).toBe(0);
    expect(res.netPayableCheck).toBe(0);
  });

  test('should calculate correct values with progress increments and NBR source deductions', () => {
    // Let's say we have current progress = 50% for all milestones, previous progress = 0%
    const res = calculateIPCBill(
      [50, 50, 50, 50, 50, 50],
      [0, 0, 0, 0, 0, 0],
      0.03, // 3% contingency
      0.10, // 10% contractor profit
      0.10, // 10% retention
      0.15, // 15% mobilization recovery
      0.075, // 7.5% VAT
      0.05, // 5% AIT
      50000 // 50,000 BDT Material-on-Site credit
    );

    // Total net value (direct cost) = 50% of 4.2M BDT = 2,100,000 BDT
    expect(res.totalNetValue).toBe(2100000);

    // Contingency = 2,100,000 * 0.03 = 63,000 BDT
    expect(res.contingencyAmount).toBe(63000);

    // Contractor Profit = 2,100,000 * 0.10 = 210,000 BDT
    expect(res.profitAmount).toBe(210000);

    // Gross Current Claim = 2,100,000 + 63,000 + 210,000 = 2,373,000 BDT
    expect(res.grossCurrentClaim).toBe(2373000);

    // Retention = 2,373,000 * 0.10 = 237,300 BDT
    expect(res.retentionDeduction).toBe(237300);

    // Mobilization Recovery = 2,373,000 * 0.15 = 355,950 BDT
    expect(res.mobilizationRecovery).toBe(355950);

    // VAT = 2,373,000 * 0.075 = 177,975 BDT
    expect(res.vatDeduction).toBe(177975);

    // AIT = 2,373,000 * 0.05 = 118,650 BDT
    expect(res.aitDeduction).toBe(118650);

    // Net check = 2,373,000 - 237,300 - 355,950 - 177,975 - 118,650 + 50,000 = 1,533,125 BDT
    expect(res.netPayableCheck).toBe(1533125);
  });

  test('should compute correct net period progress values from previous certified levels', () => {
    // Current progress = 80%, previous = 50%
    const res = calculateIPCBill(
      [80, 80, 80, 80, 80, 80],
      [50, 50, 50, 50, 50, 50],
      0, // 0% contingency
      0, // 0% profit
      0,
      0,
      0,
      0,
      0
    );

    // Net value = 30% of 4,200,000 BDT = 1,260,000 BDT
    expect(res.totalNetValue).toBe(1260000);
    expect(res.netPayableCheck).toBe(1260000);
  });
});

describe('Steel Cost with Markup Calculations', () => {
  test('should calculate correct material and markup costs', () => {
    // Weight = 1000 kg, Base rate = 120 BDT/kg, markup = 10%
    // Material cost = 1000 * 120 = 120,000 BDT
    // Markup cost = 120,000 * 0.1 = 12,000 BDT
    // Total cost = 132,000 BDT
    const result = calculateSteelCostWithMarkupInternal(1000, 120, 10);
    expect(result.materialCost).toBe(120000);
    expect(result.erectionMarkupCost).toBe(12000);
    expect(result.totalCost).toBe(132000);
  });

  test('should default to 10% markup if not provided', () => {
    const result = calculateSteelCostWithMarkupInternal(2000, 100);
    expect(result.materialCost).toBe(200000);
    expect(result.erectionMarkupCost).toBe(20000);
    expect(result.totalCost).toBe(220000);
  });

  test('should return 0 for negative inputs', () => {
    const result = calculateSteelCostWithMarkupInternal(-1000, 120, 10);
    expect(result.materialCost).toBe(0);
    expect(result.erectionMarkupCost).toBe(0);
    expect(result.totalCost).toBe(0);
  });
});

describe('Plumbing Preliminary Budget Calculations', () => {
  test('should calculate correct plumbing budget based on structural civil cost', () => {
    // Civil Cost = 1,000,000 BDT, default rate = 8%
    // Plumbing budget = 1,000,000 * 0.08 = 80,000 BDT
    const result = calculatePlumbingBudgetInternal(1000000);
    expect(result).toBe(80000);
  });

  test('should support custom percentage rates', () => {
    // Civil Cost = 1,000,000 BDT, custom rate = 7.5%
    // Plumbing budget = 1,000,000 * 0.075 = 75,000 BDT
    const result = calculatePlumbingBudgetInternal(1000000, 7.5);
    expect(result).toBe(75000);
  });

  test('should return 0 for negative or zero inputs', () => {
    expect(calculatePlumbingBudgetInternal(-500000)).toBe(0);
    expect(calculatePlumbingBudgetInternal(1000000, -2.5)).toBe(0);
    expect(calculatePlumbingBudgetInternal(0)).toBe(0);
  });
});

describe('Septic Tank Cost calculations', () => {
  test('should calculate correct itemized costs and grand total', () => {
    const qty = {
      earthwork: 46.2,
      concrete: 2.0,
      brickwork: 4.2,
      plaster: 24.5,
      rc: 4.2
    };
    const rates = {
      earthwork: 150,
      concrete: 4500,
      brickwork: 5200,
      plaster: 220,
      rc: 9800
    };

    const res = calculateSepticTankCostInternal(
      qty.earthwork,
      qty.concrete,
      qty.brickwork,
      qty.plaster,
      qty.rc,
      rates
    );

    expect(res.earthworkCost).toBe(46.2 * 150); // 6930
    expect(res.concreteCost).toBe(2 * 4500); // 9000
    expect(res.brickworkCost).toBe(4.2 * 5200); // 21840
    expect(res.plasterCost).toBe(24.5 * 220); // 5390
    expect(res.rcCost).toBe(4.2 * 9800); // 41160
    expect(res.totalCost).toBe(6930 + 9000 + 21840 + 5390 + 41160); // 84320
  });

  test('should handle negative quantities or rates by treating them as 0', () => {
    const res = calculateSepticTankCostInternal(
      -46.2,
      2.0,
      4.2,
      24.5,
      4.2,
      {
        earthwork: 150,
        concrete: -4500,
        brickwork: 5200,
        plaster: 220,
        rc: 9800
      }
    );

    expect(res.earthworkCost).toBe(0);
    expect(res.concreteCost).toBe(0);
    expect(res.totalCost).toBe(21840 + 5390 + 41160);
  });
});

describe('Analysis of Rates & Project Estimate Calculations', () => {
  test('should calculate unit rate from scratch correctly', () => {
    // material = 1000 BDT, labor = 400 BDT, equipment = 100 BDT
    // overhead = 5% (0.05), profit = 10% (0.10)
    // subtotal = 1500 BDT
    // overheads = 1500 * 0.05 = 75 BDT
    // profit = (1500 + 75) * 0.10 = 157.5 BDT
    // total = 1500 + 75 + 157.5 = 1732.5 BDT
    expect(calculateUnitRateFromScratch(1000, 400, 100, 0.05, 0.10)).toBe(1732.5);
  });

  test('should calculate complete estimate including legal, permit, and consulting fees', () => {
    // structural = 10,000,000, land = 3,000,000
    // legal = 2% (0.02), permit = 1.5% (0.015), consulting = 4% (0.04)
    // legalCost = 200,000
    // permitCost = 150,000
    // consultingCost = 400,000
    // total = 10,000,000 + 3,000,000 + 200,000 + 150,000 + 400,000 = 13,750,000
    const res = calculateCompleteEstimate(10000000, 3000000, 2.0, 1.5, 4.0);
    expect(res.legalCost).toBe(200000);
    expect(res.permitCost).toBe(150000);
    expect(res.consultingCost).toBe(400000);
    expect(res.totalEstimate).toBe(13750000);
  });

  test('should calculate preliminary project budget additions correctly', () => {
    // structural = 5,000,000
    // water supply = 8%, electrification = 7.5%, roads = 5%, arch = 1%, inflation = 5%, contingency = 4%
    const res = calculatePreliminaryProjectBudget(5000000, {
      waterSupplyPercent: 8,
      electrificationPercent: 7.5,
      roadLawnPercent: 5,
      architecturalPercent: 1,
      inflationPercent: 5,
      contingencyPercent: 4
    });

    expect(res.waterSupply).toBe(5000000 * 0.08); // 400,000
    expect(res.electrification).toBe(5000000 * 0.075); // 375,000
    expect(res.roadLawn).toBe(5000000 * 0.05); // 250,000
    expect(res.architectural).toBe(5000000 * 0.01); // 50,000
    expect(res.inflation).toBe(5000000 * 0.05); // 250,000
    expect(res.contingency).toBe(5000000 * 0.04); // 200,000
    expect(res.totalBudget).toBe(5000000 + 400000 + 375000 + 250000 + 50000 + 250000 + 200000); // 6,525,000
  });
});
