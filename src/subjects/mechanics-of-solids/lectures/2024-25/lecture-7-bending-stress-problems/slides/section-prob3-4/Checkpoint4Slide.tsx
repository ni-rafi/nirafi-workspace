import React from 'react';
import { QuizCardOrchestrator } from '@/features/quiz';
import { FullWidthLayout } from '@/shared/layouts/FullWidthLayout';
import { parameterResolver } from '@/features/quiz/utils/parameterResolver';

export const Checkpoint4Slide: React.FC = () => {
  const sigma_param = parameterResolver.lastDigit(40.0, 1.0, ' MPa');

  const questionObj = {
    formula: `Determine the maximum resisting moment capacity (kNm) of the unsymmetrical I-section (top flange 100x50mm, web 50x200mm, bottom flange 200x50mm, I_xx = 255.2x10^6 mm^4, neutral axis 125mm from bottom) if the allowable bending stress cannot exceed ${sigma_param.formula}.`,
    resolve: (reg: string) => {
      const sigma_val = sigma_param.resolve(reg);
      return `Determine the maximum resisting moment capacity (kNm) of the unsymmetrical I-section (top flange 100x50mm, web 50x200mm, bottom flange 200x50mm, I_xx = 255.2x10^6 mm^4, neutral axis 125mm from bottom) if the allowable bending stress cannot exceed ${sigma_val}.`;
    }
  };

  return (
    <FullWidthLayout title="Checkpoint 4: Asymmetric Moment Capacity Sizing" bgVariant="default">
      <div className="w-full max-w-2xl mx-auto py-2">
        <QuizCardOrchestrator
          quizId="mos_2024_lec7_q4"
          questionText={questionObj}
          quizType="numeric-input"
        />
      </div>
    </FullWidthLayout>
  );
};

export default Checkpoint4Slide;
