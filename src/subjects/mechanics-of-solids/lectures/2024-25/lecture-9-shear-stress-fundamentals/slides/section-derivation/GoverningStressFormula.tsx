import React from 'react';
import { TwoColumnLayout } from '@/shared/layouts/TwoColumnLayout';
import { SlideParagraph, SlideCallout, LatexFormula } from '@/features/presentation/components/elements';

export const GoverningStressFormula: React.FC = () => {
  return (
    <TwoColumnLayout
      title="The Flexural Shear Formula"
      leftWidth="55%"
      leftContent={
        <div className="flex flex-col h-full justify-between gap-3 text-left">
          <div>
            <span className="text-[10px] font-bold text-indigo-500 uppercase tracking-widest block mb-1">
              Finalizing stress relation
            </span>
            <SlideParagraph variant="plain" className="text-xs text-muted-foreground">
              To convert the horizontal force ΔH to shearing stress, we divide the force by the longitudinal shearing area: Δa = b · Δx.
            </SlideParagraph>
          </div>

          <div className="space-y-2 text-xs text-muted-foreground">
            <p>
              Average shearing stress acting on this cut plane is:
            </p>
            <div className="py-1 text-center bg-background rounded border border-border/20">
              <LatexFormula math="\\tau = \\frac{\\Delta H}{\\Delta a} = \\frac{\\Delta H}{b \\cdot \\Delta x}" />
            </div>
            <p>
              Substituting ΔH = VQ/I · Δx into the equation yields the universal **flexural shear formula**:
            </p>
            <div className="py-2 text-center bg-indigo-500/10 rounded-xl border border-indigo-500/30 text-indigo-600 dark:text-indigo-400 font-extrabold text-sm">
              <LatexFormula math="\\tau = \\frac{V \\cdot Q}{I \\cdot b}" />
            </div>
          </div>

          <SlideCallout variant="info" className="py-2 px-3 text-[10px]">
            Where: V = Shear Force, Q = Statical Moment of Area, I = Moment of Inertia of whole section, b = Width at cut plane.
          </SlideCallout>
        </div>
      }
      rightContent={
        <div className="flex flex-col items-center justify-center h-full">
          {/* 3D isometric view of the sliding sub-block */}
          <div className="flex justify-center border border-border/30 bg-muted/5 rounded-2xl p-4 max-w-[280px] mx-auto w-full shadow-inner">
            <svg viewBox="0 0 160 140" className="w-full h-full overflow-visible">
              <g transform="translate(20, 20)">
                {/* 3D block: coordinates for vertices */}
                {/* front face */}
                {/* A=(20, 80), B=(90, 80), C=(90, 40), D=(20, 40) */}
                {/* back face */}
                {/* E=(50, 60), F=(120, 60), G=(120, 20), H=(50, 20) */}
                
                {/* Shaded bottom shear area */}
                <polygon points="20,80 90,80 120,60 50,60" fill="rgba(16, 185, 129, 0.15)" stroke="#10b981" strokeWidth={1} strokeDasharray="3,1" />

                {/* Back edges (dashed) */}
                <line x1={50} y1={60} x2={50} y2={20} stroke="var(--muted-foreground)" strokeWidth={0.8} strokeDasharray="3,3" opacity={0.5} />
                <line x1={50} y1={20} x2={120} y2={20} stroke="var(--muted-foreground)" strokeWidth={0.8} strokeDasharray="3,3" opacity={0.5} />
                <line x1={50} y1={20} x2={20} y2={40} stroke="var(--muted-foreground)" strokeWidth={0.8} strokeDasharray="3,3" opacity={0.5} />

                {/* Solid edges */}
                <polygon points="20,40 90,40 120,20 120,60 90,80 20,80" fill="none" stroke="currentColor" strokeWidth={1.2} />
                <line x1={90} y1={40} x2={90} y2={80} stroke="currentColor" strokeWidth={1.2} />
                <line x1={90} y1={40} x2={120} y2={20} stroke="currentColor" strokeWidth={1.2} />
                <line x1={20} y1={40} x2={20} y2={80} stroke="currentColor" strokeWidth={1.2} />

                {/* Delta H arrow */}
                <line x1={-10} y1={70} x2={35} y2={70} className="stroke-indigo-500" strokeWidth={2} />
                <polygon points="35,70 30,67 30,73" fill="var(--indigo-500)" className="fill-indigo-500" />
                <text x={10} y={63} className="fill-indigo-500 text-[9px] font-mono font-bold">ΔH</text>

                {/* Dimension annotations */}
                {/* dx (length) */}
                <line x1={20} y1={88} x2={90} y2={88} stroke="currentColor" strokeWidth={0.6} />
                <text x={55} y={97} className="fill-muted-foreground text-[8px] font-mono" textAnchor="middle">Δx</text>

                {/* b (width) */}
                <line x1={96} y1={82} x2={124} y2={64} stroke="currentColor" strokeWidth={0.6} />
                <text x={115} y={80} className="fill-muted-foreground text-[8px] font-mono" textAnchor="middle">b</text>

                {/* Shaded area label */}
                <text x={65} y={70} className="fill-emerald-500 text-[8px] font-mono font-bold" textAnchor="middle">Area = b * Δx</text>
              </g>
            </svg>
          </div>
          <p className="text-[10.5px] text-muted-foreground mt-2 font-mono">
            Longitudinal Shearing Area (b * dx)
          </p>
        </div>
      }
    />
  );
};

export default GoverningStressFormula;
