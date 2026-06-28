import React from 'react';
import { ClickReveal, LatexFormula, SlideParagraph, SlideBullet } from '@/features/presentation/components/elements';
import { TwoColumnLayout } from '@/shared/layouts/TwoColumnLayout';
import { TwoColumnToastLayout } from '@/shared/layouts/TwoColumnToastLayout';
import { FullWidthLayout } from '@/shared/layouts/FullWidthLayout';
import { IBeam, ISolverOutput } from '@/subjects/mechanics-of-solids/cores/sfd-bmd/types';

export const renderSetupSlide = (beam: IBeam, diagram: React.ReactNode) => {
  const udlLoads = beam.loads.filter(l => l.type === 'udl');
  const pointLoads = beam.loads.filter(l => l.type === 'point');
  const momentLoads = beam.loads.filter(l => l.type === 'moment');

  return (
    <TwoColumnLayout
      title="Problem Setup - Load Configuration"
      leftWidth="55%"
      leftContent={diagram}
      rightContent={
        <div className="flex flex-col gap-3 justify-center h-full text-left font-sans">
          <span className="text-[9px] font-bold text-rose-500 uppercase tracking-widest block font-mono">Step 1: Identify System & Loads</span>
          <h4 className="text-sm font-extrabold text-foreground font-sans">Geometry and Loading Configuration</h4>
          <SlideParagraph variant="plain" className="text-xs text-muted-foreground leading-relaxed">
            We analyze a {beam.length}-meter determinate beam. The support conditions are:
          </SlideParagraph>
          <div className="space-y-1 pl-1.5 text-xs text-muted-foreground font-semibold">
            {beam.supports.map((sup, i) => (
              <SlideBullet key={`sup-${i}`}>
                <span>
                  Support {sup.id} ({sup.type === 'hinge' ? 'Pinned hinge' : sup.type === 'roller' ? 'Roller support' : sup.type === 'fixed' ? 'Fixed wall' : 'Support'}) at <LatexFormula math={`x = ${sup.position}\\text{ m}`} />.
                </span>
              </SlideBullet>
            ))}
            {beam.releases.map((rel, i) => (
              <SlideBullet key={`rel-${i}`}>
                <span>
                  Internal hinge release at <LatexFormula math={`x = ${rel.position}\\text{ m}`} />.
                </span>
              </SlideBullet>
            ))}
          </div>
          {beam.loads.length > 0 && (
            <>
              <SlideParagraph variant="plain" className="text-xs text-muted-foreground mt-2 leading-relaxed">
                The beam carries the following loads:
              </SlideParagraph>
              <div className="space-y-1.5 pl-1.5 text-left text-xs font-medium">
                {udlLoads.map((load, i) => (
                  <SlideBullet key={i}>
                    <span>
                      A UDL of <LatexFormula math={`${load.magnitude}\\text{ kN/m}`} /> acting over a {Math.abs((load.endPosition ?? 0) - (load.startPosition ?? 0))}m span from <LatexFormula math={`x = ${load.startPosition}\\text{ m}`} /> to <LatexFormula math={`x = ${load.endPosition}\\text{ m}`} />.
                    </span>
                  </SlideBullet>
                ))}
                {pointLoads.map((load, i) => (
                  <SlideBullet key={i}>
                    <span>
                      A concentrated point load of <LatexFormula math={`${load.magnitude}\\text{ kN}`} /> acting downward at <LatexFormula math={`x = ${load.position}\\text{ m}`} />.
                    </span>
                  </SlideBullet>
                ))}
                {momentLoads.map((load, i) => (
                  <SlideBullet key={i}>
                    <span>
                      A concentrated moment of <LatexFormula math={`${load.magnitude}\\text{ kNm}`} /> acting at <LatexFormula math={`x = ${load.position}\\text{ m}`} />.
                    </span>
                  </SlideBullet>
                ))}
              </div>
            </>
          )}
        </div>
      }
    />
  );
};

export const renderReactionsSlide = (
  reactions: ISolverOutput['reactions'],
  eqDetails: ISolverOutput['reactionEquations'],
  diagram: React.ReactNode
) => {
  if (!eqDetails || eqDetails.equations.length === 0) {
    return (
      <TwoColumnLayout
        title="Support Reactions Solver"
        leftWidth="55%"
        leftContent={diagram}
        rightContent={
          <div className="flex flex-col gap-2.5 justify-center h-full text-left font-sans font-medium">
            <div className="space-y-0.5">
              <span className="text-[9px] font-bold text-rose-500 uppercase tracking-widest block font-mono">Step 2: External Equilibrium</span>
              <h4 className="text-sm font-extrabold text-foreground font-sans">Calculating Support Reactions</h4>
            </div>
            <div className="text-[11px] text-muted-foreground bg-muted/15 border border-border/30 rounded-xl p-2.5 space-y-2 select-text font-sans">
              {reactions.map((rxn, i) => {
                const supportLetter = rxn.supportId.toUpperCase();
                const isMoment = rxn.type === 'M';
                const labelText = isMoment ? `Solve Moment at Support ${supportLetter}` : `Solve Reaction at Support ${supportLetter}`;
                const term = isMoment ? `M_{${supportLetter}}` : `R_{y${supportLetter}}`;
                const unit = isMoment ? 'kNm' : 'kN';
                const isFirst = i === 0;

                const content = (
                  <div className={!isFirst ? 'border-t border-border/25 pt-2' : ''}>
                    <span className="font-bold text-foreground block mb-0.5">{i + 1}. {labelText}:</span>
                    <LatexFormula math={`${term} = ${rxn.value.toFixed(3)}\\text{ ${unit}}`} />
                  </div>
                );

                if (i === 0) return <div key={i}>{content}</div>;
                return (
                  <ClickReveal key={i} at={i}>
                    {content}
                  </ClickReveal>
                );
              })}
            </div>
          </div>
        }
      />
    );
  }

  const cleanTitle = (t: string) => t.replace(/\*\*Step \d+:\s*/g, '').replace(/\*\*/g, '').replace(/\$/g, '');

  const steps: { title: string; latex: string; revealAt: number }[] = [];
  let stepCounter = 1;

  eqDetails.equations.forEach((eq: { title: string; hMStr: string; rhsValue: number; type: string; side?: string }, i: number) => {
    let eqTitle = '';
    let formulaPrefix = '';

    if (eq.type === 'moment-equilibrium') {
      eqTitle = 'Moment Equilibrium Equation';
      formulaPrefix = '\\sum M_{x=0} = 0 \\implies ';
    } else if (eq.type === 'vertical-equilibrium') {
      eqTitle = 'Vertical Equilibrium Equation';
      formulaPrefix = '\\sum F_y = 0 \\implies ';
    } else if (eq.type === 'hinge-moment') {
      eqTitle = `Hinge Equation of Condition (${eq.side === 'left' ? 'Left' : 'Right'} Side)`;
      formulaPrefix = `\\sum M_{\\text{${eq.side}}, x_h} = 0 \\implies `;
    } else if (eq.type === 'roller-shear') {
      eqTitle = `Roller Equation of Condition (${eq.side === 'left' ? 'Left' : 'Right'} Side)`;
      formulaPrefix = `\\sum V_{\\text{${eq.side}}, x_h} = 0 \\implies `;
    } else {
      eqTitle = cleanTitle(eq.title);
    }

    const hStr = eq.hMStr.replace(/\*/g, ' \\cdot ');
    steps.push({
      title: `${stepCounter}. ${eqTitle}`,
      latex: `${formulaPrefix}${hStr} = ${eq.rhsValue.toFixed(3)}`,
      revealAt: stepCounter - 1,
    });
    stepCounter++;

    const solvedVal = eqDetails.solvedValues[i];
    if (solvedVal) {
      const unit = solvedVal.name.startsWith('M') ? 'kNm' : 'kN';
      const supportLetter = solvedVal.name.replace(/[^A-Z]/g, '');
      const valType = solvedVal.name.startsWith('M') ? 'Moment' : 'Reaction';
      const labelText = supportLetter ? `Solve ${valType} at Support ${supportLetter}` : `Solve Reaction ${solvedVal.name}`;

      steps.push({
        title: `${stepCounter}. ${labelText}`,
        latex: `${solvedVal.name} = ${solvedVal.value.toFixed(3)}\\text{ ${unit}}`,
        revealAt: stepCounter - 1,
      });
      stepCounter++;
    }
  });

  return (
    <TwoColumnLayout
      title="Support Reactions Solver"
      leftWidth="55%"
      leftContent={diagram}
      rightContent={
        <div className="flex flex-col gap-2.5 justify-center h-full text-left font-sans font-medium">
          <div className="space-y-0.5">
            <span className="text-[9px] font-bold text-rose-500 uppercase tracking-widest block font-mono">Step 2: External Equilibrium</span>
            <h4 className="text-sm font-extrabold text-foreground font-sans">Calculating Support Reactions</h4>
          </div>

          <div className="text-[11px] text-muted-foreground bg-muted/15 border border-border/30 rounded-xl p-2.5 space-y-2 select-text font-sans overflow-y-auto max-h-[70vh] pr-1">
            {steps.map((step, idx) => {
              const isFirst = idx === 0;
              const content = (
                <div className={!isFirst ? 'border-t border-border/25 pt-2' : ''}>
                  <span className="font-bold text-foreground block mb-0.5">{step.title}:</span>
                  <LatexFormula math={step.latex} />
                </div>
              );

              if (idx === 0) return <div key={idx}>{content}</div>;
              return (
                <ClickReveal key={idx} at={step.revealAt}>
                  {content}
                </ClickReveal>
              );
            })}
          </div>
        </div>
      }
    />
  );
};

export const renderDiscontinuityGridSlide = (
  beam: IBeam,
  gridPositions: number[],
  diagram: React.ReactNode,
  clickIdx: number
) => {
  const getNodeDesc = (x: number) => {
    const support = beam.supports.find(s => s.position === x);
    const suffix = support ? ` / Support ${support.id}` : '';

    if (x === 0) return `Left end${suffix}`;
    if (x === beam.length) return `Right end${suffix}`;
    if (support) return `Support ${support.id}`;

    const udlStart = beam.loads.find(l => l.type === 'udl' && l.startPosition === x);
    if (udlStart) return 'Start of distributed load';

    const udlEnd = beam.loads.find(l => l.type === 'udl' && l.endPosition === x);
    if (udlEnd) return 'End of distributed load';

    const ptLoad = beam.loads.find(l => l.type === 'point' && l.position === x);
    if (ptLoad) return 'Concentrated point load';

    const momentLoad = beam.loads.find(l => l.type === 'moment' && l.position === x);
    if (momentLoad) return 'Concentrated moment';

    return 'Boundary discontinuity';
  };

  return (
    <TwoColumnToastLayout
      title="Discontinuity Reference Grid"
      leftWidth="55%"
      leftContent={diagram}
      toastPosition="right"
      rightContent={
        <div className="flex flex-col gap-2.5 justify-center h-full text-left font-sans font-medium">
          <div className="space-y-1">
            <span className="text-[9px] font-bold text-rose-500 uppercase tracking-widest block font-mono">Step 3: Reference Boundaries</span>
            <h4 className="text-sm font-extrabold text-foreground font-sans">Defining Key Nodes & Intervals</h4>
          </div>

          <div className="text-[11px] text-muted-foreground bg-muted/15 border border-border/30 rounded-xl p-2.5 space-y-2 select-text font-sans">
            {gridPositions.map((pos, idx) => {
              const isFirst = idx === 0;
              const isActive = idx === clickIdx;
              const activeClass = isActive
                ? 'bg-indigo-500/10 border-l-2 border-l-indigo-500 text-foreground px-2 py-1.5 -mx-1.5 rounded-lg animate-in fade-in duration-300'
                : 'text-muted-foreground px-2 py-1.5 -mx-1.5';
              const content = (
                <div className={`${!isFirst && !isActive ? 'border-t border-border/25 pt-2' : ''} ${activeClass} transition-all duration-300`}>
                  <span className={`font-bold block mb-0.5 font-mono ${isActive ? 'text-indigo-500' : 'text-foreground'}`}>
                    Node at x = {pos}m
                  </span>
                  <span className="text-[10px] font-semibold">{getNodeDesc(pos)}</span>
                </div>
              );

              if (idx === 0) {
                return <div key={idx}>{content}</div>;
              }
              return (
                <ClickReveal key={idx} at={idx}>
                  {content}
                </ClickReveal>
              );
            })}
          </div>
        </div>
      }
    />
  );
};

export const renderRecapSlide = (diagram: React.ReactNode) => {
  return (
    <FullWidthLayout title="Final Solved Diagrams Recap">
      <div className="max-w-4xl mx-auto flex flex-col gap-3 font-sans">
        {diagram}
        <div className="text-center mt-2 bg-muted/10 border border-border/30 rounded-xl p-3 animate-in fade-in font-sans">
          <SlideParagraph variant="plain" className="text-xs text-muted-foreground leading-relaxed">
            By utilizing the graphical relationships between loads, shear, and moments, we successfully sketched the complete structural diagrams without writing continuous section-cut equations.
          </SlideParagraph>
        </div>
      </div>
    </FullWidthLayout>
  );
};
