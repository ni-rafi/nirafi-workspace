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
  renderSimilarTrianglesRatio,
} from './renderZeroShearSlides';
import {
  renderBmdJump,
  renderBmdSegment,
  renderBmdNodeCheck,
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
    const v1 = Math.abs(crossingSegment.vStart || 0);
    const v2 = Math.abs(crossingSegment.vEnd || 0);
    const L_seg = (crossingSegment.endX || 0) - (crossingSegment.startX || 0);
    const x0 = (v1 * L_seg) / (v1 + v2);
    peakX = (crossingSegment.startX || 0) + x0;
    peakM = solverResult.criticalPoints.find(cp => Math.abs(cp.x - peakX) < 1e-2)?.m || 0;
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
  const activeBmdSlide = stepIndex >= 14 && stepIndex <= 24 ? bmdSlides[stepIndex - 14] : null;

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
      return renderSfdSegment(activeSfdSlide, toastPos, diagram, clickIdx, solverResult.intervals);
    }
    if (activeSfdSlide.type === 'sfd-node-check') {
      return renderSfdNodeCheck(activeSfdSlide, toastPos, diagram);
    }
  }

  // 5. Zero-Shear Crossing Slides
  if (stepIndex === 12 || stepIndex === 13) {
    if (!crossingSegment) return null;

    const v1 = Math.abs(crossingSegment.vStart || 0);
    const v2 = Math.abs(crossingSegment.vEnd || 0);
    const L_seg = (crossingSegment.endX || 0) - (crossingSegment.startX || 0);
    const x0 = (v1 * L_seg) / (v1 + v2);
    const totalX = (crossingSegment.startX || 0) + x0;
    if (stepIndex === 12) {
      return renderZeroShearBoundary(diagram);
    }
    if (stepIndex === 13) {
      return renderSimilarTrianglesRatio(v1, v2, L_seg, x0, totalX, clickIdx);
    }
  }

  // 6. BMD Slides
  if (stepIndex >= 14 && stepIndex <= 24) {
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

  // 7. Recap Slide
  if (stepIndex === 25) {
    return renderRecapSlide(diagram);
  }

  return null;
};
