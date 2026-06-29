import React, { useContext } from 'react';
import { useClickStepsContext } from '@/features/presentation/context/ClickStepsContext';
import { PresentationContext } from '@/features/presentation/context/PresentationContext';
import {
  SlideParagraph,
  ClickReveal,
  LatexFormula,
  ClickHighlight,
} from '@/features/presentation/components/elements';
import { ElasticCurveDrawing } from '@/subjects/mechanics-of-solids/features/sfd-bmd/components/drawings/ElasticCurveDrawing';
import { TwoRowLayout } from '@/shared/layouts/TwoRowLayout';

export const ElasticCurveExplanation: React.FC = () => {
  const clickContext = useClickStepsContext();
  const { currentClick } = clickContext;
  const presentation = useContext(PresentationContext);
  const viewMode = presentation?.viewMode || 'present';

  const isScrollOrBlog = viewMode === 'scroll' || viewMode === 'blog';
  const activeStep = isScrollOrBlog ? 2 : currentClick;

  return (
    <TwoRowLayout
      title="Theoretical Rules of Deflection Diagram Construction"
      topHeight="42%"
      topContent={
        <div className="flex flex-col gap-2 w-full h-full">
          {!isScrollOrBlog && (
            <>
              <ClickReveal at={1} className="hidden">{' '}</ClickReveal>
              <ClickReveal at={2} className="hidden">{' '}</ClickReveal>
            </>
          )}

          <div className="flex flex-col justify-center border border-border/40 bg-muted/10 rounded-xl p-3 h-full overflow-hidden">
            <ElasticCurveDrawing momentPos={3.0} activeStep={activeStep} />
          </div>
        </div>
      }
      bottomContent={
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full select-text text-left text-[11px] leading-relaxed">
          {/* Column 1: Signs & BMD Analysis */}
          <div className="flex flex-col gap-2">
            <div>
              <span className="text-[9px] font-bold text-rose-500 uppercase tracking-widest block mb-0.5">
                Rule 1: Solve reactions & BMD
              </span>
              <SlideParagraph variant="plain" className="text-muted-foreground mt-0.5">
                Plot the bending moment diagram to find the positive and negative regions of the span.
              </SlideParagraph>
            </div>
            
            {(activeStep >= 1 || isScrollOrBlog) && (
              <div className="animate-in slide-in-from-bottom-2 duration-300">
                <span className="text-[9px] font-bold text-indigo-500 uppercase tracking-widest block mb-0.5">
                  Rule 2: Classify sign conventions
                </span>
                <SlideParagraph variant="plain" className="text-muted-foreground mt-0.5">
                  Identify regional curvature types:
                  <br />
                  • <span className="font-semibold text-indigo-500">Positive Moment</span>: Sagging (Smile curvature).
                  <br />
                  • <span className="font-semibold text-rose-500">Negative Moment</span>: Hogging (Frown curvature).
                </SlideParagraph>
              </div>
            )}
          </div>

          {/* Column 2: Segment-by-segment sketches */}
          <div className="flex flex-col gap-2 md:border-l border-border/20 md:pl-6">
            {(activeStep >= 1 || isScrollOrBlog) && (
              <div className="animate-in slide-in-from-bottom-2 duration-300">
                <span className="text-[9px] font-bold text-amber-500 uppercase tracking-widest block mb-0.5">
                  Rule 3: Segment-by-Segment Deflections
                </span>
                <SlideParagraph variant="plain" className="text-muted-foreground mt-0.5">
                  Partition the beam by loads and supports. Sketch the sagging (smile) and hogging (frown) curves as isolated, disconnected segments with gaps.
                </SlideParagraph>
              </div>
            )}

            {(activeStep >= 2 || isScrollOrBlog) && (
              <div className="animate-in slide-in-from-bottom-2 duration-300 mt-1">
                <span className="text-[9px] font-bold text-orange-500 uppercase tracking-widest block mb-0.5">
                  Rule 4: Support boundary constraints
                </span>
                <SlideParagraph variant="plain" className="text-muted-foreground mt-0.5">
                  Pin the deflection curves at support positions to enforce zero settlement boundaries (<ClickHighlight variant="paint" at={2}><LatexFormula math="y_{support} = 0" /></ClickHighlight>).
                </SlideParagraph>
              </div>
            )}
          </div>

          {/* Column 3: Connection & Inflection points */}
          <div className="flex flex-col gap-2 md:border-l border-border/20 md:pl-6">
            {(activeStep >= 2 || isScrollOrBlog) && (
              <>
                <div className="animate-in slide-in-from-bottom-2 duration-300">
                  <span className="text-[9px] font-bold text-emerald-500 uppercase tracking-widest block mb-0.5">
                    Rule 5: Rotate & connect smoothly
                  </span>
                  <SlideParagraph variant="plain" className="text-muted-foreground mt-0.5">
                    Rotate and align segments to connect them continuously at boundaries. The slope must be continuous (no kinks) unless there is a physical internal hinge.
                  </SlideParagraph>
                </div>

                <div className="animate-in slide-in-from-bottom-2 duration-300 mt-1">
                  <span className="text-[9px] font-bold text-teal-500 uppercase tracking-widest block mb-0.5">
                    Rule 6: Inflection points
                  </span>
                  <SlideParagraph variant="plain" className="text-muted-foreground mt-0.5 text-primary font-semibold">
                    The point where curvature flips between sagging and hogging (inflection point) occurs exactly where bending moment is zero (<LatexFormula math="M = 0" />).
                  </SlideParagraph>
                </div>
              </>
            )}
          </div>
        </div>
      }
    />
  );
};

export default ElasticCurveExplanation;
