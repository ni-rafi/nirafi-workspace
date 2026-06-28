import React from 'react';
import { ClickReveal, LatexFormula, SlideBullet } from '@/features/presentation/components/elements';
import { TwoColumnLayout } from '@/shared/layouts/TwoColumnLayout';
import { useClickStepsContext } from '@/features/presentation/context/ClickStepsContext';

const PedagogicalCircleView: React.FC = () => {
  const clickContext = useClickStepsContext();
  const clickIdx = clickContext?.currentClick ?? 0;

  return (
    <TwoColumnLayout
      title="Slope-Moment Relationship Circle"
      leftWidth="55%"
      leftContent={
        <div className="flex h-full w-full items-center justify-center p-6 select-none font-sans">
          <svg className="w-full max-w-2xl h-[280px] overflow-visible" viewBox="0 0 340 180">
            <defs>
              <marker id="arrow-green" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#10b981" />
              </marker>
            </defs>

            {/* SFD Triangle Segment above the Circle */}
            <g transform="translate(0, 0)">
              {/* SFD Baseline */}
              <line x1="90" y1="42" x2="210" y2="42" className="stroke-slate-350 dark:stroke-slate-650" strokeWidth="1.2" />
              <text x="215" y="45" className="text-[7px] font-bold fill-muted-foreground">x</text>

              {/* Green/Emerald Area Shade under SFD */}
              <polygon
                points="90,18 210,42 90,42"
                className={`transition-all duration-300 ${clickIdx >= 1 ? 'fill-emerald-500/20 stroke-none' : 'fill-slate-400/5 stroke-none'}`}
              />

              {/* Shear line path */}
              <line
                x1="90" y1="18" x2="210" y2="42"
                className={`transition-all duration-300 ${clickIdx >= 1 ? 'stroke-emerald-500 stroke-[1.8]' : 'stroke-slate-400/50 stroke-[1.2]'}`}
              />

              {/* Labels */}
              <text
                x="88"
                y="22"
                textAnchor="end"
                className={`text-[8px] font-black transition-all duration-300 ${clickIdx >= 1 ? 'fill-emerald-600 dark:fill-emerald-400 font-extrabold' : 'fill-muted-foreground/60 font-semibold'}`}
              >
                V = +14.325 kN (Steep)
              </text>
              <text
                x="210"
                y="35"
                textAnchor="start"
                className="text-[8px] font-bold fill-muted-foreground/80"
              >
                V = 0 (Flat)
              </text>
              <text
                x="150"
                y="52"
                textAnchor="middle"
                className="text-[7.5px] font-extrabold fill-indigo-500/80 font-mono"
              >
                V &gt; 0 and Decreasing → PD Quadrant
              </text>
            </g>

            {/* Pointer Link Arrow from SFD down to circle top-left quadrant */}
            {clickIdx >= 1 && (
              <path
                d="M 122,54 L 122,78"
                className="stroke-emerald-500 stroke-[1.5] animate-in fade-in duration-300"
                strokeDasharray="2 2"
                markerEnd="url(#arrow-green)"
              />
            )}

            {/* The Slope-Moment Circle shifted down to cy = 120, r = 45 */}
            <circle cx="150" cy="120" r="45" fill="none" className="stroke-slate-350 dark:stroke-slate-700" strokeWidth="1.2" />
            <line x1="150" y1="75" x2="150" y2="165" className="stroke-slate-305 dark:stroke-slate-700" strokeWidth="1.2" />
            <line x1="105" y1="120" x2="195" y2="120" className="stroke-slate-305 dark:stroke-slate-700" strokeWidth="1.2" />

            {/* Quadrant 1: PD (Positive Decreasing) - Top Left */}
            <path d="M 105,120 A 45,45 0 0,1 150,75" fill="none" 
              className={`transition-all duration-300 ${clickIdx >= 1 ? 'stroke-emerald-500 stroke-[2.8]' : 'stroke-slate-400 dark:stroke-slate-650 stroke-[1.5]'}`} />
            <text x="126" y="96" textAnchor="middle" 
              className={`text-[9px] font-black transition-all duration-300 ${clickIdx >= 1 ? 'fill-emerald-600 dark:fill-emerald-400 scale-110' : 'fill-slate-400 dark:fill-slate-500'}`}>
              PD
            </text>

            {/* Quadrant 2: NI (Negative Increasing) - Top Right */}
            <path d="M 150,75 A 45,45 0 0,1 195,120" fill="none" className="stroke-slate-400 dark:stroke-slate-650" strokeWidth="1.2" />
            <text x="174" y="96" textAnchor="middle" className="text-[9px] font-bold fill-slate-400 dark:fill-slate-500">
              NI
            </text>

            {/* Quadrant 3: ND (Negative Decreasing) - Bottom Left */}
            <path d="M 105,120 A 45,45 0 0,0 150,165" fill="none" className="stroke-slate-400 dark:stroke-slate-650" strokeWidth="1.2" />
            <text x="126" y="144" textAnchor="middle" className="text-[9px] font-bold fill-slate-400 dark:fill-slate-500">
              ND
            </text>

            {/* Quadrant 4: PI (Positive Increasing) - Bottom Right */}
            <path d="M 150,165 A 45,45 0 0,0 195,120" fill="none" className="stroke-slate-400 dark:stroke-slate-650" strokeWidth="1.2" />
            <text x="174" y="144" textAnchor="middle" className="text-[9px] font-bold fill-slate-400 dark:fill-slate-500">
              PI
            </text>

            {/* Legend / Key on the right of SVG */}
            <g transform="translate(225, 75)" className="text-[8px] font-semibold fill-muted-foreground font-mono">
              <text x="0" y="0" className="font-extrabold fill-foreground">Key:</text>
              <text x="0" y="16">P = Positive</text>
              <text x="0" y="28">N = Negative</text>
              <text x="0" y="44">I = Increasing</text>
              <text x="0" y="56">D = Decreasing</text>
            </g>
          </svg>
        </div>
      }
      rightContent={
        <div className="flex flex-col gap-2.5 justify-center h-full text-left font-sans font-medium">
          <div className="space-y-1">
            <span className="text-[9px] font-black text-indigo-500 uppercase tracking-widest block font-mono">Concept Slide A</span>
            <h4 className="text-sm font-extrabold text-foreground font-sans">The Slope-Moment Circle</h4>
          </div>

          <div className="text-[11px] text-muted-foreground bg-muted/15 border border-border/30 rounded-xl p-2.5 space-y-2 select-text font-sans">
            <div>
              <span className="font-bold text-foreground block mb-0.5">1. Shear is the Slope:</span>
              Recall that <LatexFormula math="V(x) = \frac{dM}{dx}" />. The shear value defines both the slope and curvature of the moment line.
            </div>
            <ClickReveal at={1}>
              <div className="border-t border-border/25 pt-2 space-y-1.5 animate-in fade-in">
                <span className="font-bold text-foreground block mb-1">2. Four Quadrants of Bending:</span>
                <SlideBullet revealAt={1} icon="•">
                  <LatexFormula math="\text{PD}" /> (Positive, Decreasing): Positive shear gets smaller. Tangent flattens out, bending concave down.
                </SlideBullet>
                <SlideBullet revealAt={1} icon="•">
                  <LatexFormula math="\text{PI}" /> (Positive, Increasing): Positive shear gets larger. Tangent steepens, bending concave up.
                </SlideBullet>
                <SlideBullet revealAt={1} icon="•">
                  <LatexFormula math="\text{ND/NI}" />: Negative shear states yielding downward-sloping bending curves.
                </SlideBullet>
              </div>
            </ClickReveal>
          </div>
        </div>
      }
    />
  );
};

export const renderPedagogicalCircle = () => {
  return <PedagogicalCircleView />;
};
