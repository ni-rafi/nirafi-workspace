import React from 'react';
import { TwoColumnLayout } from '@/shared/layouts/TwoColumnLayout';
import { SlideList, LatexFormula } from '@/features/presentation/components/elements';
import { ProfileShapeView } from '@/subjects/mechanics-of-solids/features/stress/components/diagrams/ProfileShapeView';
import { CrossSectionEngine } from '@/subjects/mechanics-of-solids/cores/stress/cross-section.engine';
import { StaticalMomentEngine } from '@/subjects/mechanics-of-solids/cores/stress/statical-moment.engine';
import { ExpandableDrawing } from '@/shared/components';
import { problem1Config } from '../../problemConfig';

export const Problem01Statement: React.FC = () => {
  const { shape } = problem1Config;

  const props = CrossSectionEngine.calculateProperties(shape);

  const H_m = shape.height ?? 0.3;
  const ybar_m = props.centroid; // 0.15m

  // Coordinate conversions
  const svgW = 240;
  const svgH = 220;
  const paddingY = 20;
  const chartH = svgH - paddingY * 2; // 180
  const toPixelY = (yNA: number) => paddingY + (1 - (yNA + ybar_m) / H_m) * chartH;

  const statQ = StaticalMomentEngine.calculateQAndWidth(shape, 0, props);

  return (
    <TwoColumnLayout
      title="Problem Statement & Section Geometry"
      leftWidth="50%"
      leftContent={
        <div className="flex flex-col h-full justify-between gap-3 text-left">
          <div>
            <span className="text-[10px] font-bold text-indigo-500 uppercase tracking-widest block mb-1">
              Tutorial Problem 01
            </span>
            <div className="bg-muted/10 p-3 rounded-xl border border-border/40 text-xs leading-relaxed text-foreground">
              <strong>Question:</strong> Find the shear stress of the rectangular beam section at the Neutral Axis (<LatexFormula math="y = 0" />), <LatexFormula math="y = \pm 75\text{ mm}" />, and <LatexFormula math="y = \pm 150\text{ mm}" /> if the applied vertical shear force is <LatexFormula math="V = 60\text{ kN}" />.
            </div>
          </div>

          <div className="space-y-2 text-xs text-muted-foreground">
            <h4 className="font-bold text-foreground">Given Parameters:</h4>
            <SlideList
              items={[
                { text: <span>Shear Force <LatexFormula math="V = 60\text{ kN} = 60 \times 10^3\text{ N}" /></span> },
                { text: <span>Width <LatexFormula math="b = 100\text{ mm} = 0.1\text{ m}" /></span> },
                { text: <span>Height <LatexFormula math="h = 300\text{ mm} = 0.3\text{ m}" /></span> }
              ]}
            />
          </div>

          <div className="bg-muted/20 border border-border/40 rounded-lg p-2.5 text-[10px] text-muted-foreground leading-relaxed">
            <span className="font-bold text-foreground block mb-1">Analysis Strategy:</span>
            First solve the Moment of Inertia of the shape. Then calculate the shear stresses at various depths by determining the statical moment of area $Q$ above or below each cut.
          </div>
        </div>
      }
      rightContent={
        <div className="bg-muted/30 border border-border/50 rounded-xl p-4 flex flex-col items-center justify-center h-full min-h-[250px]">
          <ExpandableDrawing
            title="Rectangular Section Dimensions"
            description="Fully dimensioned rectangular cross-section showing width b and total height h."
          >
            <svg viewBox={`0 0 ${svgW} ${svgH}`} className="w-full max-w-[320px] overflow-visible">
              <ProfileShapeView
                shape={shape}
                centroid={ybar_m}
                toPixelY={toPixelY}
                inspectY={0}
                currentWidth={statQ.t * 1000}
                xSection={120}
                showAllDimensions={true}
              />
            </svg>
          </ExpandableDrawing>
        </div>
      }
    />
  );
};

export default Problem01Statement;
