import React from 'react';
import { IBeam, ISolverOutput } from '@/subjects/mechanics-of-solids/cores/sfd-bmd/types';
import {
  renderSetupSlide,
  renderReactionsSlide,
  renderDiscontinuityGridSlide,
  renderRecapSlide,
} from './renderEquilibriumSlides';
import {
  renderSfdJump,
  renderSfdSegment,
  renderSfdNodeCheck,
} from './renderSfdSlides';
import {
  renderZeroShearBoundary,
  renderSectionMethodSolver,
  renderSimilarTrianglesRatio,
  renderUDLDivisionSolver,
} from './renderZeroShearSlides';
import {
  renderBmdJump,
  renderBmdSegment,
  renderBmdNodeCheck,
  renderPedagogicalCircle,
  renderPedagogicalApplication,
} from './renderBmdSlides';

interface StepParams {
  clickIdx: number;
  diagram: React.ReactNode;
  beam: IBeam;
  solverResult: ISolverOutput;
}

export const renderDynamicStep = (stepIndex: number, params: StepParams): React.ReactNode => {
  const { clickIdx, diagram, beam, solverResult } = params;
  const steps = solverResult.graphicalStepsData || [];

  // 1. Build SFD slides array
  const sfdSteps = steps.filter(s => s.type.startsWith('sfd-'));
  const sfdSlides: {
    type: 'sfd-segment' | 'sfd-jump' | 'sfd-node-check';
    x?: number;
    startX?: number;
    endX?: number;
    vStart?: number;
    vEnd?: number;
    loadArea?: number;
    jump?: number;
    source?: string;
  }[] = [];

  sfdSteps.forEach((step, idx) => {
    if (step.type === 'sfd-start') return;
    if (step.type === 'sfd-jump') {
      sfdSlides.push({
        type: 'sfd-jump',
        x: step.x,
        vStart: step.vStart,
        vEnd: step.vEnd,
        jump: step.jump,
        source: step.source,
      });
    } else if (step.type === 'sfd-segment') {
      sfdSlides.push({
        type: 'sfd-segment',
        startX: step.startX,
        endX: step.endX,
        vStart: step.vStart,
        vEnd: step.vEnd,
        loadArea: step.loadArea,
      });
      
      const nextStep = sfdSteps[idx + 1];
      const hasJumpAtEnd = nextStep && nextStep.type === 'sfd-jump' && Math.abs((nextStep.x || 0) - (step.endX || 0)) < 1e-3;
      if (!hasJumpAtEnd && step.endX !== undefined && step.endX < beam.length - 1e-3) {
        sfdSlides.push({
          type: 'sfd-node-check',
          x: step.endX,
          vEnd: step.vEnd,
        });
      }
    }
  });

  // 2. Build BMD slides array
  const bmdSteps = steps.filter(s => s.type.startsWith('bmd-'));
  const bmdSlides: {
    type: 'bmd-segment' | 'bmd-jump' | 'bmd-node-check';
    startX?: number;
    endX?: number;
    x?: number;
    vStart?: number;
    vEnd?: number;
    mStart?: number;
    mEnd?: number;
    shearArea?: number;
    jump?: number;
    source?: string;
    isPeakSplit?: 'first' | 'second';
    peakX?: number;
    peakM?: number;
  }[] = [];

  // Push initial boundary check
  bmdSlides.push({
    type: 'bmd-node-check',
    x: 0,
    mEnd: 0,
  });

  const crossingSegment = sfdSteps.find(s => s.type === 'sfd-segment' && (s.vStart || 0) * (s.vEnd || 0) < 0);
  let peakX = 0;
  let peakM = 0;
  if (crossingSegment) {
    const sX = crossingSegment.startX || 0;
    const eX = crossingSegment.endX || 0;
    const exactCP = solverResult.criticalPoints.find(
      cp => cp.x > sX + 1e-3 && cp.x < eX - 1e-3 && cp.isLocalMaxMinM
    );
    if (exactCP) {
      peakX = exactCP.x;
      peakM = exactCP.m;
    } else {
      const v1 = Math.abs(crossingSegment.vStart || 0);
      const v2 = Math.abs(crossingSegment.vEnd || 0);
      const L_seg = eX - sX;
      const x0 = (v1 * L_seg) / (v1 + v2);
      peakX = sX + x0;
      peakM = solverResult.criticalPoints.find(cp => Math.abs(cp.x - peakX) < 1e-2)?.m || 0;
    }
  }

  bmdSteps.forEach((step, idx) => {
    if (step.type === 'bmd-start') return;
    if (step.type === 'bmd-jump') {
      bmdSlides.push({
        type: 'bmd-jump',
        x: step.x,
        mStart: step.mStart,
        mEnd: step.mEnd,
        jump: step.jump,
      });
    } else if (step.type === 'bmd-segment') {
      const sX = step.startX || 0;
      const eX = step.endX || 0;
      if (crossingSegment && peakX > sX + 1e-2 && peakX < eX - 1e-2) {
        bmdSlides.push({
          type: 'bmd-segment',
          startX: sX,
          endX: peakX,
          mStart: step.mStart,
          mEnd: peakM,
          shearArea: peakM - (step.mStart || 0),
          isPeakSplit: 'first',
          peakX,
          peakM,
        });
        bmdSlides.push({
          type: 'bmd-node-check',
          x: peakX,
          mEnd: peakM,
        });
        bmdSlides.push({
          type: 'bmd-segment',
          startX: peakX,
          endX: eX,
          mStart: peakM,
          mEnd: step.mEnd,
          shearArea: (step.mEnd || 0) - peakM,
          isPeakSplit: 'second',
          peakX,
          peakM,
        });
      } else {
        bmdSlides.push({
          type: 'bmd-segment',
          startX: sX,
          endX: eX,
          mStart: step.mStart,
          mEnd: step.mEnd,
          shearArea: step.shearArea,
        });
      }

      const nextStep = bmdSteps[idx + 1];
      const hasJumpAtEnd = nextStep && nextStep.type === 'bmd-jump' && Math.abs((nextStep.x || 0) - eX) < 1e-3;
      if (!hasJumpAtEnd && eX < beam.length - 1e-3) {
        bmdSlides.push({
          type: 'bmd-node-check',
          x: eX,
          mEnd: step.mEnd,
        });
      }
    }
  });

  bmdSlides.push({
    type: 'bmd-node-check',
    x: beam.length,
    mEnd: bmdSlides[bmdSlides.length - 1]?.mEnd || 0,
  });

  // Helper for dynamic left/right toast positioning
  const getToastPosition = (activeX: number | undefined, activeEndX: number | undefined): 'left' | 'right' => {
    const targetX = activeEndX !== undefined ? activeEndX : (activeX ?? 0);
    return targetX > beam.length / 2 ? 'left' : 'right';
  };

  const activeSfdSlide = stepIndex >= 3 && stepIndex <= 11 ? sfdSlides[stepIndex - 3] : null;
  
  let activeBmdSlide = null;
  if (stepIndex >= 19 && stepIndex <= 22) {
    activeBmdSlide = bmdSlides[stepIndex - 19];
  } else if (stepIndex === 23) {
    activeBmdSlide = bmdSlides[3];
  } else if (stepIndex >= 25 && stepIndex <= 31) {
    activeBmdSlide = bmdSlides[stepIndex - 21];
  }

  // Debug Logging for visualizer states
  console.log(`[renderDynamicStep] stepIndex=${stepIndex}, clickIdx=${clickIdx}`);
  if (activeSfdSlide) {
    console.log(`[renderDynamicStep] Active SFD Slide:`, JSON.stringify(activeSfdSlide));
  }
  if (activeBmdSlide) {
    console.log(`[renderDynamicStep] Active BMD Slide:`, JSON.stringify(activeBmdSlide));
  }

  // 1. Setup Slide
  if (stepIndex === 0) {
    return renderSetupSlide(beam, diagram);
  }

  // 2. Support Reactions Slide
  if (stepIndex === 1) {
    return renderReactionsSlide(solverResult.reactions, solverResult.reactionEquations, diagram);
  }

  // 3. Discontinuity Reference Grid Slide
  if (stepIndex === 2) {
    const gridPositions = React.useMemo(() => {
      const points = new Set<number>();
      points.add(0);
      points.add(beam.length);
      beam.supports.forEach(s => points.add(s.position));
      beam.releases.forEach(r => points.add(r.position));
      beam.loads.forEach(l => {
        if (l.position !== undefined) points.add(l.position);
        if (l.startPosition !== undefined) points.add(l.startPosition);
        if (l.endPosition !== undefined) points.add(l.endPosition);
      });
      return Array.from(points).sort((a, b) => a - b);
    }, [beam]);

    return renderDiscontinuityGridSlide(beam, gridPositions, diagram, clickIdx);
  }

  // 4. SFD Slides
  if (stepIndex >= 3 && stepIndex <= 11) {
    if (!activeSfdSlide) return null;
    const toastPos = getToastPosition(
      activeSfdSlide.x !== undefined ? activeSfdSlide.x : activeSfdSlide.startX,
      activeSfdSlide.endX
    );
    if (activeSfdSlide.type === 'sfd-jump') {
      return renderSfdJump(activeSfdSlide, toastPos, diagram, clickIdx);
    }
    if (activeSfdSlide.type === 'sfd-segment') {
      return renderSfdSegment(activeSfdSlide, toastPos, diagram, clickIdx, solverResult.intervals, beam);
    }
    if (activeSfdSlide.type === 'sfd-node-check') {
      return renderSfdNodeCheck(activeSfdSlide, toastPos, diagram);
    }
  }

  // 5. Zero-Shear Crossing Slides
  if (stepIndex >= 12 && stepIndex <= 15) {
    if (!crossingSegment) return null;

    const sX = crossingSegment.startX || 0;
    const eX = crossingSegment.endX || 0;
    const exactCP = solverResult.criticalPoints.find(
      cp => cp.x > sX + 1e-3 && cp.x < eX - 1e-3 && cp.isLocalMaxMinM
    );
    const v1 = Math.abs(crossingSegment.vStart || 0);
    const v2 = Math.abs(crossingSegment.vEnd || 0);
    const L_seg = eX - sX;

    let totalX = 0;
    let x0 = 0;
    if (exactCP) {
      totalX = exactCP.x;
      x0 = totalX - sX;
    } else {
      x0 = (v1 * L_seg) / (v1 + v2);
      totalX = sX + x0;
    }

    const crossingInterval = solverResult.intervals.find(
      inv => (crossingSegment.startX || 0) >= inv.startX - 1e-3 && (crossingSegment.endX || 0) <= inv.endX + 1e-3
    );
    const w = crossingInterval ? Math.abs(crossingInterval.vCoeffs[1]) : 3.0;
    const startX = crossingSegment.startX || 0;

    if (stepIndex === 12) {
      return renderZeroShearBoundary(diagram, beam, solverResult);
    }
    if (stepIndex === 13) {
      return renderSectionMethodSolver(v1, w, startX, totalX);
    }
    if (stepIndex === 14) {
      return renderSimilarTrianglesRatio(v1, v2, L_seg, x0, totalX);
    }
    if (stepIndex === 15) {
      return renderUDLDivisionSolver(v1, w, startX, x0, totalX);
    }
  }

  // 6. Pedagogical Slides
  if (stepIndex === 23) {
    if (!crossingSegment) return null;
    const sX = crossingSegment.startX || 0;
    const eX = crossingSegment.endX || 0;
    const exactCP = solverResult.criticalPoints.find(
      cp => cp.x > sX + 1e-3 && cp.x < eX - 1e-3 && cp.isLocalMaxMinM
    );
    const v1 = Math.abs(crossingSegment.vStart || 0);
    const v2 = Math.abs(crossingSegment.vEnd || 0);
    const L_seg = eX - sX;

    let totalX = 0;
    let x0 = 0;
    if (exactCP) {
      totalX = exactCP.x;
      x0 = totalX - sX;
    } else {
      x0 = (v1 * L_seg) / (v1 + v2);
      totalX = sX + x0;
    }
    return renderPedagogicalApplication(v1, totalX, diagram);
  }
  if (stepIndex === 24) {
    return renderPedagogicalCircle();
  }

  // 7. BMD Slides
  if ((stepIndex >= 19 && stepIndex <= 22) || (stepIndex >= 25 && stepIndex <= 31)) {
    if (!activeBmdSlide) return null;
    const toastPos = getToastPosition(
      activeBmdSlide.x !== undefined ? activeBmdSlide.x : activeBmdSlide.startX,
      activeBmdSlide.endX
    );
    if (activeBmdSlide.type === 'bmd-jump') {
      return renderBmdJump(activeBmdSlide, toastPos, diagram);
    }
    if (activeBmdSlide.type === 'bmd-segment') {
      return renderBmdSegment(activeBmdSlide, toastPos, diagram, peakX, clickIdx, solverResult.intervals, beam);
    }
    if (activeBmdSlide.type === 'bmd-node-check') {
      return renderBmdNodeCheck(activeBmdSlide, toastPos, diagram, peakX);
    }
  }

  // 8. Recap Slide
  if (stepIndex === 32) {
    return renderRecapSlide(diagram);
  }

  return null;
};
