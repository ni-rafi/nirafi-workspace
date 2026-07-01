import React from 'react';
import { QuizCardOrchestrator } from '@/features/quiz';
import { FullWidthLayout } from '@/shared/layouts/FullWidthLayout';
import { parameterResolver } from '@/features/quiz/utils/parameterResolver';

export const Checkpoint3Slide: React.FC = () => {
  const sigmaT_param = parameterResolver.lastDigit(30.0, 1.0, ' MPa');

  const questionObj = {
    formula: `Determine the maximum UDL w (kN/m) that a simply supported beam of span L = 6 m can carry if its cross-section has y_bottom = 87.11 mm, I_xx = 112.2x10^6 mm^4, tensile stress limit is ${sigmaT_param.formula}, and compressive stress limit is 90 MPa.`,
    resolve: (reg: string) => {
      const sigmaT_val = sigmaT_param.resolve(reg);
      return `Determine the maximum UDL w (kN/m) that a simply supported beam of span L = 6 m can carry if its cross-section has y_bottom = 87.11 mm, I_xx = 112.2x10^6 mm^4, tensile stress limit is ${sigmaT_val}, and compressive stress limit is 90 MPa.`;
    }
  };

  return (
    <FullWidthLayout title="Checkpoint 3: Asymmetric Flanged Load capacity" bgVariant="default">
      <div className="w-full max-w-2xl mx-auto py-2">
        <QuizCardOrchestrator
          quizId="mos_2024_lec8_q3"
          questionText={questionObj}
          quizType="numeric-input"
        />
      </div>
    </FullWidthLayout>
  );
};

export default Checkpoint3Slide;
