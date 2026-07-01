import React from 'react';
import { QuizCardOrchestrator } from '@/features/quiz';
import { FullWidthLayout } from '@/shared/layouts/FullWidthLayout';

export const Checkpoint3Slide: React.FC = () => {
  const optionsList = [
    'It jumps suddenly, being higher in the narrow web than in the wide flange.',
    'It jumps suddenly, being higher in the wide flange than in the narrow web.',
    'It remains perfectly continuous with no discontinuities.',
    'It drops instantly to zero at the interface boundary.'
  ];

  return (
    <FullWidthLayout title="Checkpoint 3: Stress Discontinuity in Flanged Sections" bgVariant="default">
      <div className="w-full max-w-2xl mx-auto py-2">
        <QuizCardOrchestrator
          quizId="mos_2024_lec10_q1"
          questionText="At the flange-to-web junction interface of an I-beam under vertical shear load, what happens to the transverse shear stress?"
          quizType="multiple-choice"
          options={optionsList}
        />
      </div>
    </FullWidthLayout>
  );
};

export default Checkpoint3Slide;
