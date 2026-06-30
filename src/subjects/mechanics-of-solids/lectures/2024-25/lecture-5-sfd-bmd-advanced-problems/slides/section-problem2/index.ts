import React from 'react';
import { SFDBmdService } from '@/subjects/mechanics-of-solids/cores/sfd-bmd/sfdBmdService';
import { problem2Config } from '../../beamConfig';
import { getValidStepIndices } from '../stepMapper';
import { Problem2Divider } from './Problem2Divider';
import { ZeroShearQuizL5P2 } from './ZeroShearQuizL5P2';
import { ProblemSolverStep } from '../ProblemSolverStep';
import { SlideProps } from '@/features/presentation/components/slides/SlideRenderer';

const solver = new SFDBmdService();
const solverResult = solver.solve(problem2Config);
const validSteps = getValidStepIndices(problem2Config, solverResult);

export const slides: Record<number, React.ComponentType<SlideProps>> = {
  1: Problem2Divider,
};

export const sectionMetadata: Record<number, { title: string; type: string; section: string }> = {
  1: { title: 'Problem 2 Divider', type: 'Section Divider', section: 'Problem 2 Worked Example' },
};

let slideCounter = 2;
validSteps.forEach((stepInfo) => {
  // Insert Quiz checkpoint slide before the zero-shear crossing check (stepIndex 12)
  if (stepInfo.stepIndex === 12) {
    slides[slideCounter] = ZeroShearQuizL5P2;
    sectionMetadata[slideCounter] = {
      title: 'Zero-Shear Crossing Checkpoint Quiz',
      type: 'Dynamic Quiz',
      section: 'Problem 2 Worked Example',
    };
    slideCounter++;
  }

  const Component: React.FC = () => React.createElement(ProblemSolverStep, {
    beam: problem2Config,
    stepIndex: stepInfo.stepIndex,
    clickRevealCount: stepInfo.clickRevealCount,
  });

  slides[slideCounter] = Component;
  sectionMetadata[slideCounter] = {
    title: stepInfo.title,
    type: stepInfo.type,
    section: 'Problem 2 Worked Example',
  };
  slideCounter++;
});
