import React from 'react';
import { QuizCardOrchestrator } from '@/features/quiz';
import { FullWidthLayout } from '@/shared/layouts/FullWidthLayout';

export const Checkpoint2Slide: React.FC = () => {
  const optionsList = [
    'Plane sections remain plane (Euler-Bernoulli hypothesis).',
    'Hooke\'s Law (Material elasticity).',
    'Saint-Venant\'s Principle.',
    'Poisson\'s ratio constraints.'
  ];

  return (
    <FullWidthLayout title="Checkpoint 2: Kinematic Assumptions" bgVariant="default">
      <div className="w-full max-w-2xl mx-auto py-2">
        <QuizCardOrchestrator
          quizId="mos_2024_lec6_q2"
          questionText="Which hypothesis dictates that normal strain varies linearly across the depth of a beam section during bending?"
          quizType="multiple-choice"
          options={optionsList}
        />
      </div>
    </FullWidthLayout>
  );
};

export default Checkpoint2Slide;
