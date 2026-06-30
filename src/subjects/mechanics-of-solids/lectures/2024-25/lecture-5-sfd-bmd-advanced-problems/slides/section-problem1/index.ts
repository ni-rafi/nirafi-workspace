import React from 'react';
import { SFDBmdService } from '@/subjects/mechanics-of-solids/cores/sfd-bmd/sfdBmdService';
import { problem1Config } from '../../beamConfig';
import { getValidStepIndices } from '../stepMapper';
import { Problem1Divider } from './Problem1Divider';
import { ZeroShearQuizL5P1 } from './ZeroShearQuizL5P1';
import { ProblemSolverStep } from '../ProblemSolverStep';
import { SlideProps } from '@/features/presentation/components/slides/SlideRenderer';

const solver = new SFDBmdService();
const solverResult = solver.solve(problem1Config);
const validSteps = getValidStepIndices(problem1Config, solverResult);

export const slides: Record<number, React.ComponentType<SlideProps>> = {
  1: Problem1Divider,
};

export const sectionMetadata: Record<number, { title: string; type: string; section: string }> = {
  1: { title: 'Problem 1 Divider', type: 'Section Divider', section: 'Problem 1 Worked Example' },
};

let slideCounter = 2;
validSteps.forEach((stepInfo) => {
  // Insert Quiz checkpoint slide before the zero-shear crossing check (stepIndex 12)
  if (stepInfo.stepIndex === 12) {
    slides[slideCounter] = ZeroShearQuizL5P1;
    sectionMetadata[slideCounter] = {
      title: 'Zero-Shear Crossing Checkpoint Quiz',
      type: 'Dynamic Quiz',
      section: 'Problem 1 Worked Example',
    };
    slideCounter++;
  }

  const Component: React.FC = () => React.createElement(ProblemSolverStep, {
    beam: problem1Config,
    stepIndex: stepInfo.stepIndex,
    clickRevealCount: stepInfo.clickRevealCount,
  });

  slides[slideCounter] = Component;
  sectionMetadata[slideCounter] = {
    title: stepInfo.title,
    type: stepInfo.type,
    section: 'Problem 1 Worked Example',
  };
  slideCounter++;
});
