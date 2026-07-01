import React from 'react';
import { QuizCardOrchestrator } from '@/features/quiz';
import { FullWidthLayout } from '@/shared/layouts/FullWidthLayout';

export const Checkpoint2Slide: React.FC = () => {
  return (
    <FullWidthLayout title="Checkpoint 2: Bending Efficiency Comparisons" bgVariant="default">
      <div className="w-full max-w-2xl mx-auto py-4">
        <QuizCardOrchestrator
          quizId="mos_2024_lec8_q2"
          questionText="For a given cross-sectional area, which shape is structurally the most efficient in resisting bending moments?"
          quizType="multiple-choice"
          options={[
            'A solid circular section',
            'A square section',
            'A deep rectangular section (depth > width)',
            'A shallow rectangular section (width > depth)',
          ]}
        />
      </div>
    </FullWidthLayout>
  );
};

export default Checkpoint2Slide;
