import React from 'react';
import { FullWidthLayout } from '@/shared/layouts/FullWidthLayout';

export const LookupTableSlide: React.FC = () => {
  return (
    <FullWidthLayout title="Beam Peak Bending Moment Lookup Table" bgVariant="default">
      <div className="w-full max-w-4xl mx-auto py-2">
        <div className="overflow-x-auto border border-border/50 rounded-xl bg-muted/20 backdrop-blur-md">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-900 border-b border-border text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                <th className="py-2.5 px-4">Beam Type</th>
                <th className="py-2.5 px-4">Loading Diagram</th>
                <th className="py-2.5 px-4">Max Shear (V_max)</th>
                <th className="py-2.5 px-4">Max Moment (M_max)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/30 font-medium">
              <tr>
                <td className="py-3 px-4 text-foreground font-bold">Simply Supported</td>
                <td className="py-3 px-4 text-muted-foreground">Concentrated load P at center</td>
                <td className="py-3 px-4 font-mono">P / 2</td>
                <td className="py-3 px-4 font-mono text-indigo-400 font-bold">P · L / 4</td>
              </tr>
              <tr className="bg-muted/10">
                <td className="py-3 px-4 text-foreground font-bold">Simply Supported</td>
                <td className="py-3 px-4 text-muted-foreground">Uniformly distributed load w</td>
                <td className="py-3 px-4 font-mono">w · L / 2</td>
                <td className="py-3 px-4 font-mono text-indigo-400 font-bold">w · L² / 8</td>
              </tr>
              <tr>
                <td className="py-3 px-4 text-foreground font-bold">Cantilever</td>
                <td className="py-3 px-4 text-muted-foreground">Concentrated load P at free end</td>
                <td className="py-3 px-4 font-mono">P</td>
                <td className="py-3 px-4 font-mono text-indigo-400 font-bold">P · L</td>
              </tr>
              <tr className="bg-muted/10">
                <td className="py-3 px-4 text-foreground font-bold">Cantilever</td>
                <td className="py-3 px-4 text-muted-foreground">Uniformly distributed load w</td>
                <td className="py-3 px-4 font-mono">w · L</td>
                <td className="py-3 px-4 font-mono text-indigo-400 font-bold">w · L² / 2</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-[10px] text-muted-foreground text-center mt-3 leading-relaxed">
          *Use these standardized formulas to bypass full boundary integration steps for simple loading configurations.
        </p>
      </div>
    </FullWidthLayout>
  );
};

export default LookupTableSlide;
