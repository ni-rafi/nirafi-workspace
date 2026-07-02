import React from 'react';
import { TwoColumnLayout } from '@/shared/layouts/TwoColumnLayout';
import { SlideCallout, SlideList, ClickReveal, LatexFormula } from '@/features/presentation/components/elements';
import { useClickStepsContext } from '@/features/presentation/context/ClickStepsContext';
import { FlangedJunctionExplodedView } from './drawings/FlangedJunctionExplodedView';
import { problem2Config } from '../../problemConfig';

export const Problem02JunctionMarker: React.FC = () => {
  const { shape } = problem2Config;
  const b_flange = (shape.width ?? 0.1) * 1000;
  const b_web = (shape.thicknessWeb ?? 0.05) * 1000;
  const { currentClick } = useClickStepsContext();

  return (
    <TwoColumnLayout
      title="Approaching Flange-to-Web Junction"
      leftWidth="50%"
      leftContent={
        <div className="flex flex-col gap-4 text-left">
          <SlideList
            title="Junction Point Warning"
            description={
              <span>
                {"When we analyze flanged shapes like I-beams, the junction where the wide flange merges into the thin web is a critical location. At the junction coordinate ("}
                <LatexFormula math="y = +125\text{ mm}" />
                {"), the material experiences a sudden geometrical change:"}
              </span>
            }
            revealMode="each-click"
            items={[
              { text: <span>Just above the line (in the flange), the width is wide: <LatexFormula math={`b_{\\text{flange}} = ${b_flange.toFixed(0)}\\text{ mm}`} />.</span>, revealAt: 1 },
              { text: <span>Just below the line (in the web), the width is narrow: <LatexFormula math={`b_{\\text{web}} = ${b_web.toFixed(0)}\\text{ mm}`} />.</span>, revealAt: 2 },
              { text: <span>Width parameter <LatexFormula math="b" /> behaves inversely to stress: <LatexFormula math="\tau \propto \frac{1}{b}" />.</span>, revealAt: 3 }
            ]}
          />
        </div>
      }
      rightContent={
        <div className="flex flex-col items-center justify-center h-full gap-3">
          <FlangedJunctionExplodedView currentClick={currentClick} />
          <ClickReveal at={4} className="w-full">
            <SlideCallout variant="warning" className="py-2 px-3 text-[10px] w-full">
              <strong>Stress Discontinuity:</strong> Since the width <LatexFormula math="b" /> is in the denominator of the shear formula, this sudden narrowing will trigger a sudden jump in shear stress!
            </SlideCallout>
          </ClickReveal>
        </div>
      }
    />
  );
};

export default Problem02JunctionMarker;
