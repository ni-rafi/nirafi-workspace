import { parameterResolver } from '@/features/quiz/utils/parameterResolver';

export const QUIZ_METADATA = [
  { id: 'mos_2024_lec1_q1', header: 'Lec 1 Checkpoint 1 (Equilibrium)' },
  { id: 'mos_2024_lec1_q2', header: 'Lec 1 Checkpoint 2 (Sign Convention)' },
  { id: 'mos_2024_lec1_q3', header: 'Lec 1 Checkpoint 3 (Reactions)' },
  { id: 'mos_2024_lec1_q4', header: 'Lec 1 Checkpoint 4 (Internal Forces)' },
  { id: 'mos_2024_lec2_q1', header: 'Lec 2 Checkpoint 1 (Reactions)' },
  { id: 'mos_2024_lec2_q2', header: 'Lec 2 Checkpoint 2 (Method of Sections)' },
  { id: 'mos_2024_lec2_q3', header: 'Lec 2 Checkpoint 3 (Moment Change)' },
  { id: 'mos_2024_lec2_q4', header: 'Lec 2 Checkpoint 4 (Zero Shear)' },
  { id: 'mos_2024_lec3_q1', header: 'Lec 3 Checkpoint 1 (Calculus Degrees)' },
  { id: 'mos_2024_lec3_q2', header: 'Lec 3 Checkpoint 2 (Moment Accumulation)' },
  { id: 'mos_2024_lec3_q3', header: 'Lec 3 Checkpoint 3 (Zero-Shear Location)' },
  { id: 'mos_2024_lec6_q1', header: 'Lec 6 Checkpoint 1 (Bending Stress Intuition)' },
  { id: 'mos_2024_lec6_q2', header: 'Lec 6 Checkpoint 2 (Bending Theory Assumptions)' },
  { id: 'mos_2024_lec6_q3', header: 'Lec 6 Checkpoint 3 (Bending Stress in Symmetric Sections)' },
  { id: 'mos_2024_lec6_q4', header: 'Lec 6 Checkpoint 4 (Bending Stress in Advanced Sections)' },
  { id: 'mos_2024_lec9_q1', header: 'Lec 9 Checkpoint 1 (Complementary Shear)' },
  { id: 'mos_2024_lec9_q2', header: 'Lec 9 Checkpoint 2 (Rectangular Shear)' },
  { id: 'mos_2024_lec10_q1', header: 'Lec 10 Checkpoint 1 (Stress Discontinuity)' },
  { id: 'mos_2024_lec10_q2', header: 'Lec 10 Checkpoint 2 (Fastener Spacing)' }
];

export const QUIZ_ANSWERS: Record<
  string,
  string | ((reg: string) => string) | { formula: string; resolve: (reg: string) => string; digitsRequired?: number }
> = {
  mos_2024_lec1_q1: {
    formula: 'R_Ay = P / 2 kN, where P = 16.0 + [last digit] * 1.0',
    digitsRequired: 1,
    resolve: (reg) => {
      const digits = reg.replace(/\D/g, '');
      if (digits.length < 1) return 'R_Ay = P / 2 kN';
      const d = parameterResolver.getLastDigit(reg);
      return (8.0 + d * 0.5).toFixed(3);
    }
  },

  mos_2024_lec1_q2: 'Shear force pointing downward, Bending moment bending counter-clockwise (sagging)',

  mos_2024_lec1_q3: {
    formula: 'R_Ay = P / 2 kN, where P = 15.0 + [last digit] * 0.5',
    digitsRequired: 1,
    resolve: (reg) => {
      const digits = reg.replace(/\D/g, '');
      if (digits.length < 1) return 'R_Ay = P / 2 kN';
      const d = parameterResolver.getLastDigit(reg);
      return (7.5 + d * 0.25).toFixed(3);
    }
  },

  mos_2024_lec1_q4: {
    formula: 'M(4) = R_Ay * 4 kNm, where R_Ay = 10.0 + [last digit] * 0.5',
    digitsRequired: 1,
    resolve: (reg) => {
      const digits = reg.replace(/\D/g, '');
      if (digits.length < 1) return 'M(4) = R_Ay * 4 kNm';
      const d = parameterResolver.getLastDigit(reg);
      const Ra = 10.0 + d * 0.5;
      return (Ra * 4).toFixed(3);
    }
  },

  mos_2024_lec2_q1: {
    formula: 'R_By = (178.5 + 17 * P) / 20 kN, where P = 10.0 + [last digit] * 0.5',
    digitsRequired: 1,
    resolve: (reg) => {
      const digits = reg.replace(/\D/g, '');
      if (digits.length < 1) return 'P = 10.0 + [last digit] * 0.5';
      const d = parameterResolver.getLastDigit(reg);
      const P = 10.0 + d * 0.5;
      return (8.925 + 0.85 * P).toFixed(3);
    }
  },

  mos_2024_lec2_q2: 'Linear Shear and Quadratic Bending Moment',

  mos_2024_lec2_q3: {
    formula: 'Delta M = V * 5 kNm, where V = 12.0 + [last digit] * 0.5',
    digitsRequired: 1,
    resolve: (reg) => {
      const digits = reg.replace(/\D/g, '');
      if (digits.length < 1) return 'V = 12.0 + [last digit] * 0.5';
      const d = parameterResolver.getLastDigit(reg);
      const V = 12.0 + d * 0.5;
      return (V * 5).toFixed(3);
    }
  },

  mos_2024_lec2_q4: {
    formula: 'x = 5 + R_Ay / 3 m, where R_Ay = 12.0 + [last digit] * 0.5',
    digitsRequired: 1,
    resolve: (reg) => {
      const digits = reg.replace(/\D/g, '');
      if (digits.length < 1) return 'R_Ay = 12.0 + [last digit] * 0.5';
      const d = parameterResolver.getLastDigit(reg);
      const Ra = 12.0 + d * 0.5;
      return (5 + Ra / 3).toFixed(3);
    }
  },
  mos_2024_lec3_q1: 'Quadratic Shear and Cubic Bending Moment',
  mos_2024_lec3_q2: {
    formula: 'Delta M = V * 4 kNm, where V = 12.0 + [last digit] * 0.5',
    digitsRequired: 1,
    resolve: (reg) => {
      const digits = reg.replace(/\D/g, '');
      if (digits.length < 1) return 'V = 12.0 + [last digit] * 0.5';
      const d = parameterResolver.getLastDigit(reg);
      const V = 12.0 + d * 0.5;
      return (V * 4).toFixed(3);
    }
  },
  mos_2024_lec3_q3: {
    formula: 'x = (7 * V1) / (V1 + 7) m, where V1 = 15.0 + [last digit] * 0.5',
    digitsRequired: 1,
    resolve: (reg) => {
      const digits = reg.replace(/\D/g, '');
      if (digits.length < 1) return 'V1 = 15.0 + [last digit] * 0.5';
      const d = parameterResolver.getLastDigit(reg);
      const V1 = 15.0 + d * 0.5;
      return ((7 * V1) / (V1 + 7)).toFixed(3);
    }
  },
  mos_2024_lec6_q1: 'In positive bending (sagging), top fibers undergo compression and bottom fibers undergo tension.',
  mos_2024_lec6_q2: 'Plane sections remain plane after bending (Euler-Bernoulli hypothesis).',
  mos_2024_lec6_q3: {
    formula: 'sigma_max = 1.5 * M MPa, where M = 10.0 + [last digit] * 1.0 kNm',
    digitsRequired: 1,
    resolve: (reg) => {
      const digits = reg.replace(/\D/g, '');
      if (digits.length < 1) return 'M = 10.0 + [last digit] * 1.0 kNm';
      const d = parameterResolver.getLastDigit(reg);
      const M = 10.0 + d * 1.0;
      return (1.5 * M).toFixed(3);
    }
  },
  mos_2024_lec6_q4: {
    formula: 'sigma_max = M * y_max / I MPa, where M = 20.0 + [last digit] * 1.0 kNm and bf = 120 + [last digit] * 5 mm',
    digitsRequired: 1,
    resolve: (reg) => {
      const digits = reg.replace(/\D/g, '');
      if (digits.length < 1) return 'M = 20.0 + [last digit] * 1.0 kNm, bf = 120 + [last digit] * 5 mm';
      const d = parameterResolver.getLastDigit(reg);
      const bf = 120 + d * 5;
      const tf = 20;
      const hw = 100;
      const tw = 20;
      const Af = bf * tf;
      const Aw = hw * tw;
      const A = Af + Aw;
      const ybar = (Af * 10 + Aw * 70) / A;
      const If = (bf * Math.pow(tf, 3)) / 12 + Af * Math.pow(ybar - 10, 2);
      const Iw = (tw * Math.pow(hw, 3)) / 12 + Aw * Math.pow(ybar - 70, 2);
      const I = If + Iw;
      const M = (20 + d) * 1e6; // Nmm
      const ytop = ybar;
      const ybot = 120 - ybar;
      const ymax = Math.max(ytop, ybot);
      const sigma = (M * ymax) / I;
      return sigma.toFixed(3);
    }
  },
  mos_2024_lec7_q1: 'I = I_c + A * d^2',
  mos_2024_lec7_q2: 'w * L^2 / 8',
  mos_2024_lec7_q3: {
    formula: 'h = 250 * sqrt(w / 7) mm, where w = 4.0 + [last digit] * 0.2 kN/m',
    digitsRequired: 1,
    resolve: (reg) => {
      const digits = reg.replace(/\D/g, '');
      if (digits.length < 1) return 'w = 4.0 + [last digit] * 0.2 kN/m';
      const d = parameterResolver.getLastDigit(reg);
      const w = 4.0 + d * 0.2;
      return (250 * Math.sqrt(w / 7)).toFixed(3);
    }
  },
  mos_2024_lec7_q4: {
    formula: 'M = sigma * I / y_C kNm, where sigma = 40 + [last digit] * 1.0 MPa',
    digitsRequired: 1,
    resolve: (reg) => {
      const digits = reg.replace(/\D/g, '');
      if (digits.length < 1) return 'sigma = 40 + [last digit] * 1.0 MPa';
      const d = parameterResolver.getLastDigit(reg);
      const sigma = 40 + d * 1.0;
      return (sigma * 255.2 / 175).toFixed(3);
    }
  },
  mos_2024_lec8_q1: 'm³ (or mm³)',
  mos_2024_lec8_q2: 'A deep rectangular section (depth > width)',
  mos_2024_lec8_q3: {
    formula: 'w = M_allow / 4.5 kN/m, where allowable tension = 30 + [last digit]*0.5 MPa and compression = 90 + [last digit]*1.5 MPa',
    digitsRequired: 1,
    resolve: (reg) => {
      const digits = reg.replace(/\D/g, '');
      if (digits.length < 1) return 'tension = 30 + [last digit]*0.5 MPa, compression = 90 + [last digit]*1.5 MPa';
      const d = parameterResolver.getLastDigit(reg);
      const sT = 30 + d * 0.5;
      const sC = 90 + d * 1.5;
      const MC = sC * (112.2 / 172.89);
      const MT = sT * (112.2 / 87.11);
      const M_allow = Math.min(MC, MT);
      return (M_allow / 4.5).toFixed(3);
    }
  },
  mos_2024_lec9_q1: 'Shear stress on any plane is always accompanied by an equal shear stress on a perpendicular plane (complementary shear).',
  mos_2024_lec9_q2: {
    formula: 'tau_max = 1.5 * V / A MPa, where V = 50.0 + [last digit] * 2.0 kN, b = 100 mm, h = 300 mm',
    digitsRequired: 1,
    resolve: (reg) => {
      const digits = reg.replace(/\D/g, '');
      if (digits.length < 1) return 'V = 50.0 + [last digit] * 2.0 kN';
      const d = parameterResolver.getLastDigit(reg);
      const V = 50.0 + d * 2.0;
      return (0.05 * V).toFixed(3);
    }
  },
  mos_2024_lec10_q1: 'A sudden change in beam width (b) causes a step discontinuity in shear stress, making the stress inversely proportional to width.',
  mos_2024_lec10_q2: {
    formula: 's = F_nail / q inches, where V = 800.0 + [last digit] * 50.0 lbs, F_nail = 150 lbs, bf = 6 in, tf = 2 in, bw = 2 in, hw = 8 in',
    digitsRequired: 1,
    resolve: (reg) => {
      const digits = reg.replace(/\D/g, '');
      if (digits.length < 1) return 'V = 800.0 + [last digit] * 50.0 lbs';
      const d = parameterResolver.getLastDigit(reg);
      const V = 800.0 + d * 50.0;
      // Q = 12 * 2.857 = 34.28
      // I = 260.75
      // q = V * Q / I = V * 0.13147
      // s = 150 / q = 1140.9 / V
      return (1140.9 / V).toFixed(3);
    }
  }
};
