import { IBeam, ISolverOutput } from '@/subjects/mechanics-of-solids/cores/sfd-bmd/types';

export interface IStepInfo {
  stepIndex: number;
  title: string;
  type: string;
  clickRevealCount: number;
}

interface ISfdSlideInfo {
  type: string;
  x?: number;
  startX?: number;
  endX?: number;
  vStart?: number;
  vEnd?: number;
}

interface IBmdSlideInfo {
  type: string;
  x?: number;
  startX?: number;
  endX?: number;
  mStart?: number;
  mEnd?: number;
  isPeakSplit?: string;
}

export function getValidStepIndices(beam: IBeam, solverResult: ISolverOutput): IStepInfo[] {
  const steps: IStepInfo[] = [];

  if (!solverResult.success || !solverResult.graphicalStepsData) {
    return steps;
  }

  // 1. Setup
  steps.push({ stepIndex: 0, title: 'Load Setup', type: 'Concept Details', clickRevealCount: 0 });

  // 2. Reactions
  steps.push({ stepIndex: 1, title: 'Support Reactions', type: 'Concept Details', clickRevealCount: 3 });

  // 3. Discontinuities
  steps.push({ stepIndex: 2, title: 'Discontinuity Grid', type: 'Concept Details', clickRevealCount: 4 });

  // 4. SFD Steps
  const sfdSteps = solverResult.graphicalStepsData.filter(s => s.type.startsWith('sfd-'));
  const sfdSlides: ISfdSlideInfo[] = [];
  sfdSteps.forEach((step, idx) => {
    if (step.type === 'sfd-start') return;
    if (step.type === 'sfd-jump') {
      sfdSlides.push(step);
    } else if (step.type === 'sfd-segment') {
      sfdSlides.push(step);
      const nextStep = sfdSteps[idx + 1];
      const hasJumpAtEnd = nextStep && nextStep.type === 'sfd-jump' && Math.abs((nextStep.x || 0) - (step.endX || 0)) < 1e-3;
      if (!hasJumpAtEnd && step.endX !== undefined && step.endX < beam.length - 1e-3) {
        sfdSlides.push({ type: 'sfd-node-check', x: step.endX });
      }
    }
  });

  sfdSlides.forEach((slide, idx) => {
    if (idx < 9) { // Hard limit of 9 SFD steps in visualizer
      const stepIndex = 3 + idx;
      let title = 'SFD step';
      let clickRevealCount = 3;
      if (slide.type === 'sfd-jump') {
        title = `SFD Node Jump (x=${slide.x}m)`;
      } else if (slide.type === 'sfd-segment') {
        title = `SFD Segment Integration`;
      } else {
        title = `SFD Node Check (x=${slide.x}m)`;
        clickRevealCount = 2;
      }
      steps.push({ stepIndex, title, type: 'Concept Details', clickRevealCount });
    }
  });

  // 5. Zero Shear Check (if crossing exists)
  const crossingSegment = sfdSteps.find(s => s.type === 'sfd-segment' && (s.vStart || 0) * (s.vEnd || 0) < 0);
  if (crossingSegment) {
    steps.push({ stepIndex: 12, title: 'Zero-Shear Crossing Point', type: 'Concept Details', clickRevealCount: 0 });
  }

  // 6. BMD Steps
  const bmdSteps = solverResult.graphicalStepsData.filter(s => s.type.startsWith('bmd-'));
  const bmdSlides: IBmdSlideInfo[] = [];
  bmdSlides.push({ type: 'bmd-node-check', x: 0 });

  bmdSteps.forEach((step, idx) => {
    if (step.type === 'bmd-start') return;
    if (step.type === 'bmd-jump') {
      bmdSlides.push(step);
    } else if (step.type === 'bmd-segment') {
      const sX = step.startX || 0;
      const eX = step.endX || 0;
      const matchingSfd = sfdSteps.find(s => s.type === 'sfd-segment' && s.startX === sX && s.endX === eX);
      const crossesZero = matchingSfd && (matchingSfd.vStart || 0) * (matchingSfd.vEnd || 0) < 0;

      if (crossesZero) {
        const exactCP = solverResult.criticalPoints.find(
          cp => cp.x > sX + 1e-3 && cp.x < eX - 1e-3 && cp.isLocalMaxMinM
        );
        let segmentPeakX = 0;
        if (exactCP) {
          segmentPeakX = exactCP.x;
        } else {
          const v1 = Math.abs(matchingSfd.vStart || 0);
          const v2 = Math.abs(matchingSfd.vEnd || 0);
          const L_seg = eX - sX;
          const x0 = v1 + v2 > 1e-9 ? (v1 * L_seg) / (v1 + v2) : 0;
          segmentPeakX = sX + x0;
        }

        bmdSlides.push({ type: 'bmd-segment', isPeakSplit: 'first' });
        bmdSlides.push({ type: 'bmd-node-check', x: segmentPeakX });
        bmdSlides.push({ type: 'bmd-segment', isPeakSplit: 'second' });
      } else {
        bmdSlides.push(step);
      }

      const nextStep = bmdSteps[idx + 1];
      const hasJumpAtEnd = nextStep && nextStep.type === 'bmd-jump' && Math.abs((nextStep.x || 0) - eX) < 1e-3;
      if (!hasJumpAtEnd && eX < beam.length - 1e-3) {
        bmdSlides.push({ type: 'bmd-node-check', x: eX });
      }
    }
  });

  bmdSlides.push({ type: 'bmd-node-check', x: beam.length });

  bmdSlides.forEach((slide, idx) => {
    let clickRevealCount = 3;
    if (slide.type === 'bmd-node-check') {
      clickRevealCount = 2;
    }
    
    const stepIndex = idx < 4 ? 19 + idx : 21 + idx;
    if (stepIndex <= 31) {
      steps.push({
        stepIndex,
        title: slide.type === 'bmd-node-check' ? `BMD Node Check` : `BMD Segment Integration`,
        type: 'Concept Details',
        clickRevealCount
      });
    }
  });

  // 7. Recap
  steps.push({ stepIndex: 32, title: 'Solved Diagrams Recap', type: 'Concept Details', clickRevealCount: 0 });

  return steps;
}
