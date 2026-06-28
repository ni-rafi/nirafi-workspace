import React from 'react';
import { ClickReveal, LatexFormula } from '@/features/presentation/components/elements';
import { TwoColumnToastLayout } from '@/shared/layouts/TwoColumnToastLayout';

export const renderZeroShearBoundary = (
  diagram: React.ReactNode
) => {
  return (
    <TwoColumnToastLayout
      title="Zero-Shear Crossing Point"
      leftWidth="55%"
      leftContent={diagram}
      toastPosition="right"
      rightContent={
        <div className="flex flex-col gap-2.5 justify-center h-full text-left font-sans font-medium">
          <div className="space-y-1">
            <span className="text-[9px] font-bold text-rose-500 uppercase tracking-widest block font-mono">Zero-Shear Location Boundary</span>
            <h4 className="text-sm font-extrabold text-foreground font-sans">Why Zero-Shear Matters</h4>
          </div>

          <div className="text-[11px] text-muted-foreground bg-muted/15 border border-border/30 rounded-xl p-2.5 space-y-2 select-text font-sans">
            <div>
              <span className="font-bold text-foreground block mb-0.5">1. Zero-Shear Condition:</span>
              Bending moment reaches its extreme (peak) where the shear force crosses zero, since:
              <div className="mt-1.5 text-indigo-500 font-semibold font-mono">
                <LatexFormula math="\frac{dM}{dx} = V(x) = 0" />
              </div>
            </div>
            <ClickReveal at={1}>
              <div className="border-t border-border/25 pt-2">
                <span className="font-bold text-foreground block mb-0.5">2. Shear Crossing Location:</span>
                The shear line slopes downward across UDL zone and crosses the x-axis. We define distance <LatexFormula math="x_0" /> as the distance from start of UDL to this crossing point.
              </div>
            </ClickReveal>
          </div>
        </div>
      }
    />
  );
};
