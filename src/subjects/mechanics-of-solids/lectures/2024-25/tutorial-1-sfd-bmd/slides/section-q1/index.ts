import { Question1Statement, Question1Checkpoint } from './Question1';

export const slides = {
  1: Question1Statement,
  2: Question1Checkpoint,
};

export const sectionMetadata = {
  1: {
    title: 'Question 1 Statement',
    type: 'Concept Details',
    section: 'Question 1: Compound Beam SFD & BMD',
    tutorialRole: 'statement',
  },
  2: {
    title: 'Question 1 Checkpoint',
    type: 'Dynamic Quiz',
    section: 'Question 1: Compound Beam SFD & BMD',
    tutorialRole: 'checkpoint',
    quizId: 'mos_2024_tut1_q1',
  },
};
