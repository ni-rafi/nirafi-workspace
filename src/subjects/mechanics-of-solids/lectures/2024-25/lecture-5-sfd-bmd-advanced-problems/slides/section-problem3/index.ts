import React from 'react';
import { SFDBmdService } from '@/subjects/mechanics-of-solids/cores/sfd-bmd/sfdBmdService';
import { problem3Config } from '../../beamConfig';
import { getValidStepIndices } from '../stepMapper';
import { Problem3Divider } from './Problem3Divider';
import { ZeroShearQuizL5P3 } from './ZeroShearQuizL5P3';
import { ProblemSolverStep } from '../ProblemSolverStep';
import { SlideProps } from '@/features/presentation/components/slides/SlideRenderer';

const solver = new SFDBmdService();
const solverResult = solver.solve(problem3Config);
const validSteps = getValidStepIndices(problem3Config, solverResult);

export const slides: Record<number, React.ComponentType<SlideProps>> = {
  1: Problem3Divider,
};

export const sectionMetadata: Record<number, { title: string; type: string; section: string }> = {
  1: { title: 'Problem 3 Divider', type: 'Section Divider', section: 'Problem 3 Worked Example' },
};

let slideCounter = 2;
validSteps.forEach((stepInfo) => {
  // Insert Quiz checkpoint slide before the zero-shear crossing check (stepIndex 12)
  if (stepInfo.stepIndex === 12) {
    slides[slideCounter] = ZeroShearQuizL5P3;
    sectionMetadata[slideCounter] = {
      title: 'Zero-Shear Crossing Checkpoint Quiz',
      type: 'Dynamic Quiz',
      section: 'Problem 3 Worked Example',
    };
    slideCounter++;
  }

  const Component: React.FC = () => React.createElement(ProblemSolverStep, {
    beam: problem3Config,
    stepIndex: stepInfo.stepIndex,
    clickRevealCount: stepInfo.clickRevealCount,
  });

  slides[slideCounter] = Component;
  sectionMetadata[slideCounter] = {
    title: stepInfo.title,
    type: stepInfo.type,
    section: 'Problem 3 Worked Example',
  };
  slideCounter++;
});
