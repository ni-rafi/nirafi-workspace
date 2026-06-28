import React from 'react';
import { ClickReveal, LatexFormula } from '@/features/presentation/components/elements';
import { TwoColumnToastLayout } from '@/shared/layouts/TwoColumnToastLayout';

interface PedagogicalApplicationViewProps {
  diagram: React.ReactNode;
}

const PedagogicalApplicationView: React.FC<PedagogicalApplicationViewProps> = ({
  diagram,
}) => {
  return (
    <TwoColumnToastLayout
      title="Applying Curvature to Segment C-to-Peak"
      leftContent={diagram}
      rightContent={
        <div className="flex flex-col gap-2.5 justify-center h-full text-left font-sans font-medium">
          <div className="space-y-1">
            <span className="text-[9px] font-black text-indigo-500 uppercase tracking-widest block font-mono">Concept Slide - Application</span>
            <h4 className="text-sm font-extrabold text-foreground font-sans">Curvature Trend Analysis</h4>
          </div>

          <div className="text-[11px] text-muted-foreground bg-muted/15 border border-border/30 rounded-xl p-2.5 space-y-2 select-text font-sans">
            <div>
              <span className="font-bold text-foreground block mb-0.5">1. Shear is the Slope:</span>
              Since <LatexFormula math="V(x) = \frac{dM}{dx}" />, the value of the shear force directly defines the slope of the bending moment diagram at any point.
            </div>
            <ClickReveal at={1}>
              <div className="border-t border-border/25 pt-2">
                <span className="font-bold text-foreground block mb-0.5">2. Propagate Slope Trend:</span>
                * At C (<LatexFormula math="x = 5.0\text{ m}" />): <LatexFormula math="V = +14.325\text{ kN}" />. Slope of BMD is steep and positive.
                * At Mid-segment: <LatexFormula math="V = +7.163\text{ kN}" />. Slope of BMD decreases (getting flatter).
              </div>
            </ClickReveal>
            <ClickReveal at={2}>
              <div className="border-t border-border/25 pt-2">
                <span className="font-bold text-foreground block mb-0.5">3. Tangent Slope at Peak:</span>
                At Peak (<LatexFormula math="x = 9.775\text{ m}" />): <LatexFormula math="V = 0" />. Tangent slope of BMD is horizontal (<LatexFormula math="\frac{dM}{dx} = 0" />).
              </div>
            </ClickReveal>
            <ClickReveal at={3}>
              <div className="border-t border-border/25 pt-2">
                <span className="font-bold text-emerald-500 block mb-0.5 font-mono">★ Curvature Conclusion:</span>
                Since slope starts steep (<LatexFormula math="+14.325" />) and goes flat (<LatexFormula math="0" />), the curve must bend concave down (convex up) to horizontal. We select Curve A!
              </div>
            </ClickReveal>
          </div>
        </div>
      }
    />
  );
};

export const renderPedagogicalApplication = (
  _v1: number,
  _totalX: number,
  diagram: React.ReactNode,
) => {
  return (
    <PedagogicalApplicationView
      diagram={diagram}
    />
  );
};
