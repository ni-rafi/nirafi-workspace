import React from 'react';
import { TwoColumnLayout } from '@/shared/layouts/TwoColumnLayout';
import { SlideList, ClickReveal } from '@/features/presentation/components/elements';
import { ProfileShapeView } from '@/subjects/mechanics-of-solids/features/stress/components/diagrams/ProfileShapeView';
import { CrossSectionEngine } from '@/subjects/mechanics-of-solids/cores/stress/cross-section.engine';
import { StaticalMomentEngine } from '@/subjects/mechanics-of-solids/cores/stress/statical-moment.engine';
import { ExpandableDrawing } from '@/shared/components';
import { problem2Config } from '../../problemConfig';

export const Problem02Statement: React.FC = () => {
  const { shape } = problem2Config;
  const props = CrossSectionEngine.calculateProperties(shape);

  const H_m = shape.height ?? 0.3;
  const ybar_m = props.centroid; // ~0.125m

  // Coordinate conversions
  const svgW = 240;
  const svgH = 220;
  const paddingY = 20;
  const chartH = svgH - paddingY * 2; // 180
  const toPixelY = (yNA: number) => paddingY + (1 - (yNA + ybar_m) / H_m) * chartH;

  const statQ = StaticalMomentEngine.calculateQAndWidth(shape, 0, props);

  return (
    <TwoColumnLayout
      title="Asymmetric I-Beam Section Geometry"
      leftWidth="50%"
      leftContent={
        <div className="flex flex-col h-full justify-between gap-3 text-left">
          <SlideList
            title="Tutorial Problem 02"
            description={
              <div className="bg-muted/10 p-3 rounded-xl border border-border/40 text-xs leading-relaxed text-foreground select-text mb-2">
                <strong>Question:</strong> Determine and plot the shear stress distribution over the asymmetric I-beam cross-section shown below, when subjected to an applied vertical shear force of <span className="font-semibold text-primary">V = 100 kN</span>.
              </div>
            }
            revealMode="each-click"
            items={[
              { text: 'Top Flange: 100 mm wide × 50 mm thick', revealAt: 1 },
              { text: 'Web: 50 mm thick × 200 mm high', revealAt: 2 },
              { text: 'Bottom Flange: 200 mm wide × 50 mm thick', revealAt: 3 }
            ]}
          />

          <ClickReveal at={4} preset="fade">
            <div className="bg-muted/20 border border-border/40 rounded-lg p-2.5 text-[10px] text-muted-foreground leading-relaxed">
              <span className="font-bold text-foreground block mb-1">Analysis Strategy:</span>
              First calculate the centroid height and the Moment of Inertia of the shape. Then calculate the shear stresses at the skin boundaries, flanges, junctions, and the Neutral Axis.
            </div>
          </ClickReveal>
        </div>
      }
      rightContent={
        <div className="bg-muted/30 border border-border/50 rounded-xl p-4 flex flex-col items-center justify-center h-full min-h-[250px]">
          <ExpandableDrawing
            title="Asymmetric I-Beam Section Dimensions"
            description="Fully dimensioned asymmetric I-beam cross-section showing top flange, bottom flange, and web sizes."
          >
            <svg viewBox={`0 0 ${svgW} ${svgH}`} className="w-full max-w-[320px] overflow-visible">
              <ProfileShapeView
                shape={shape}
                centroid={ybar_m}
                toPixelY={toPixelY}
                inspectY={0}
                currentWidth={statQ.t * 1000}
                xSection={120}
                chartH={180}
                showAllDimensions={true}
              />
            </svg>
          </ExpandableDrawing>
        </div>
      }
    />
  );
};

export default Problem02Statement;
