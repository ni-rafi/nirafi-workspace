import React from 'react';
import { QuizCardOrchestrator } from '@/features/quiz';
import { FullWidthLayout } from '@/shared/layouts/FullWidthLayout';
import { parameterResolver } from '@/features/quiz/utils/parameterResolver';

export const Checkpoint5Slide: React.FC = () => {
  const tp_param = parameterResolver.lastDigit(15.0, 1.0, ' mm');

  const questionObj = {
    formula: `Determine the percentage capacity increase (%) of a 240 mm deep baseline joist (I_xx = 120x10^6 mm^4) after welding top and bottom flanges with symmetrical plates of width 200 mm and thickness tp = ${tp_param.formula} under an allowable stress of 140 MPa.`,
    resolve: (reg: string) => {
      const tp_val = tp_param.resolve(reg);
      return `Determine the percentage capacity increase (%) of a 240 mm deep baseline joist (I_xx = 120x10^6 mm^4) after welding top and bottom flanges with symmetrical plates of width 200 mm and thickness tp = ${tp_val} mm under an allowable stress of 140 MPa.`;
    }
  };

  return (
    <FullWidthLayout title="Checkpoint 5: Retrofitted Load Capacity Increase" bgVariant="default">
      <div className="w-full max-w-2xl mx-auto py-2">
        <QuizCardOrchestrator
          quizId="mos_2024_lec7_q5"
          questionText={questionObj}
          quizType="numeric-input"
        />
      </div>
    </FullWidthLayout>
  );
};

export default Checkpoint5Slide;
