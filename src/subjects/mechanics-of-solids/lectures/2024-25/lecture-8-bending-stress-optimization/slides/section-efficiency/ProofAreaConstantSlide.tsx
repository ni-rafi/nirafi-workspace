import React from 'react';
import { SlideList, SlideEquation, LatexFormula, ClickReveal, ClickHighlight } from '@/features/presentation/components/elements';
import { ExpandableDrawing } from '@/shared/components';
import { useClickStepsContext } from '@/features/presentation/context/ClickStepsContext';
import TwoColumnLayout from '@/shared/layouts/TwoColumnLayout';

export const ProofAreaConstantSlide: React.FC = () => {
  const { currentClick } = useClickStepsContext();

  return (
    <TwoColumnLayout
      title="Proof Setup: Area Constant"
      leftWidth="52%"
      leftContent={
        <div className="flex flex-col gap-4 text-left select-text">
          <SlideList
            title="Mathematical Constraints"
            description={
              <span>
                Formulate the width <LatexFormula math="b" /> of the rectangular section in terms of the square side length <LatexFormula math="a" /> and depth <LatexFormula math="d" /> under equal cross-sectional area.
              </span>
            }
            revealMode="each-click"
            items={[
              { text: <span>Area of Square = <LatexFormula math="a^2" /></span>, revealAt: 1 },
              { text: <span>Area of Rectangle = <LatexFormula math="b \cdot d" /></span>, revealAt: 2 },
              { text: <span>Set Areas equal: <LatexFormula math="a^2 = b \cdot d" /></span>, revealAt: 3 },
            ]}
          />
          <div className="space-y-1.5 my-1 text-left">
            <ClickReveal at={4} preset="fade">
              <ClickHighlight at={4} variant="rect" className="block">
                <SlideEquation math="b = \frac{a^2}{d}" />
              </ClickHighlight>
            </ClickReveal>
          </div>
        </div>
      }
      rightContent={
        <div className="bg-muted/30 border border-border/55 rounded-xl p-4 flex flex-col items-center justify-center h-full min-h-[250px] w-full">
          <ExpandableDrawing title="Constant Area Comparison" description="Comparison of a square and a deep rectangle having identical cross-sectional areas (A = constant).">
            <svg viewBox="0 0 220 160" className="w-[200px] h-[140px] overflow-visible">
              {/* Square (Width 60, Height 60) */}
              <g className="animate-in fade-in duration-300">
                <rect x={20} y={50} width={60} height={60} fill="rgba(99, 102, 241, 0.08)" stroke="var(--foreground)" strokeWidth={1.5} />
                <text x={50} y={42} textAnchor="middle" className="fill-foreground text-[11px] font-bold">a</text>
                <text x={12} y={84} textAnchor="middle" className="fill-foreground text-[11px] font-bold">a</text>
                <text x={50} y={134} textAnchor="middle" className="fill-indigo-500 text-[11px] font-bold">A = a²</text>
              </g>

              {/* Rectangle (Width 30, Height 120) - click >= 2 */}
              {currentClick >= 2 && (
                <g className="animate-in fade-in duration-300">
                  <rect x={130} y={20} width={30} height={120} fill="rgba(245, 158, 11, 0.08)" stroke="var(--foreground)" strokeWidth={1.5} />
                  <text x={145} y={12} textAnchor="middle" className="fill-primary text-[11px] font-bold">b</text>
                  <text x={172} y={84} textAnchor="middle" className="fill-primary text-[11px] font-bold">d</text>
                  <text x={145} y={154} textAnchor="middle" className="fill-amber-500 text-[11px] font-bold">A = b·d</text>
                </g>
              )}

              {/* Equilibrium Equal Sign - click >= 3 */}
              {currentClick >= 3 && (
                <g className="animate-in zoom-in duration-300">
                  <rect x={90} y={72} width={15} height={4} fill="var(--muted-foreground)" />
                  <rect x={90} y={82} width={15} height={4} fill="var(--muted-foreground)" />
                </g>
              )}
            </svg>
          </ExpandableDrawing>
        </div>
      }
    />
  );
};

export default ProofAreaConstantSlide;
