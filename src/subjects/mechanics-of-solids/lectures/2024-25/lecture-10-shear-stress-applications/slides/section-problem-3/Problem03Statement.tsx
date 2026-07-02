import React from 'react';
import { TwoColumnLayout } from '@/shared/layouts/TwoColumnLayout';
import { SlideCallout, SlideList, ClickReveal, LatexFormula } from '@/features/presentation/components/elements';
import { Beam2DDrawing } from '@/subjects/mechanics-of-solids/features/sfd-bmd/components/drawings';
import { ExpandableDrawing } from '@/shared/components';
import { problem3Config } from '../../problemConfig';

export const Problem03Statement: React.FC = () => {
  const { beam, h_mm, tau_allow } = problem3Config;
  const udl = beam.loads.find(l => l.type === 'udl');
  const w = udl?.magnitude ?? 10;
  const L = beam.length;

  return (
    <TwoColumnLayout
      title="Problem 03: Timber Beam Design Sizing"
      leftWidth="48%"
      leftContent={
        <div className="flex flex-col h-full justify-between gap-3 text-left">
          <SlideList
            title="Tutorial Problem 03: Sizing Design"
            description={
              <div className="space-y-3">
                <div className="bg-muted/10 p-3 rounded-xl border border-border/40 text-xs leading-relaxed text-foreground select-text">
                  <strong>Question:</strong> A simply supported timber beam of span <LatexFormula math={`L = ${L}\\text{ m}`} /> carries a uniformly distributed load of <LatexFormula math={`w = ${w}\\text{ kN/m}`} />. If the depth of the rectangular cross-section is limited to <LatexFormula math="h = 300\text{ mm}" />, determine the minimum required width <LatexFormula math="b" /> so that the shearing stress does not exceed <LatexFormula math="\tau_{\text{allow}} = 1.0\text{ MPa}" />.
                </div>
                <div className="text-xs font-bold text-foreground">
                  Design Constraints:
                </div>
              </div>
            }
            revealMode="each-click"
            items={[
              { text: <span>Allowable shear stress: <LatexFormula math={`\\tau_{\\text{allow}} = ${tau_allow.toFixed(1)}\\text{ MPa} = ${tau_allow.toFixed(1)}\\text{ N/mm}^2`} /></span>, revealAt: 1 },
              { text: <span>Fixed section depth: <LatexFormula math={`h = ${h_mm}\\text{ mm} = ${(h_mm / 1000).toFixed(1)}\\text{ m}`} /></span>, revealAt: 2 },
              { text: <span>Target parameter: Minimum required width <LatexFormula math="b" /></span>, revealAt: 3 }
            ]}
          />
        </div>
      }
      rightContent={
        <div className="flex flex-col gap-4 w-full select-text">
          <ExpandableDrawing
            title="Timber Beam Design Loaded Span"
            description="Elevation loading layout of simply supported timber beam."
            className="w-full max-w-[450px]"
          >
            <Beam2DDrawing
              beam={beam}
              showReactions={true}
              resolvedReactions={false}
            />
          </ExpandableDrawing>

          <ExpandableDrawing
            title="Rectangular Section Design Profile"
            description="Cross-section dimensions showing fixed depth h and unknown width b."
            className="w-full max-w-[450px]"
          >
            <svg viewBox="0 0 160 110" className="w-full max-w-[160px] overflow-visible mx-auto">
              <rect x={55} y={15} width={50} height={90} className="fill-primary/10 stroke-muted-foreground" strokeWidth={1.5} />
              {/* Width Dimension */}
              <line x1={55} y1={10} x2={105} y2={10} className="stroke-muted-foreground/40" strokeWidth={0.8} />
              <text x={80} y={5} className="fill-blue-500 text-[10px] font-mono font-bold" textAnchor="middle">b = ?</text>
              {/* Depth Dimension */}
              <line x1={112} y1={15} x2={112} y2={105} className="stroke-muted-foreground/40" strokeWidth={0.8} />
              <text x={117} y={63} className="fill-foreground text-[10px] font-mono font-bold" textAnchor="start">h = 300 mm</text>
            </svg>
          </ExpandableDrawing>

          <ClickReveal at={4} preset="fade">
            <SlideCallout variant="info" className="py-2 px-3 text-[10px]">
              To design the beam width, we must first find the maximum internal shear force (<LatexFormula math="V_{\max}" />) from the beam span load conditions.
            </SlideCallout>
          </ClickReveal>
        </div>
      }
    />
  );
};

export default Problem03Statement;
