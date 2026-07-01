import React from 'react';
import { TwoColumnLayout } from '@/shared/layouts/TwoColumnLayout';
import { SlideCallout } from '@/features/presentation/components/elements';
import { TimberBeamDesignDrawing } from '@/subjects/mechanics-of-solids/features/stress/components/diagrams/TimberBeamDesignDrawing';
import { problem3Config } from '../../problemConfig';

export const Problem03Statement: React.FC = () => {
  const { beam, h_mm, tau_allow } = problem3Config;
  const udl = beam.loads.find(l => l.type === 'udl');
  const w = udl?.magnitude ?? 10;
  const L = beam.length;

  return (
    <TwoColumnLayout
      title="Problem 03: Timber Beam Design Sizing"
      leftWidth="50%"
      leftContent={
        <div className="flex flex-col h-full justify-between gap-3 text-left">
          <div>
            <span className="text-[10px] font-bold text-indigo-500 uppercase tracking-widest block mb-1">
              Tutorial Problem 03: Sizing Design
            </span>
            <div className="bg-slate-50 dark:bg-muted/10 p-3 rounded-xl border border-border/40 text-xs leading-relaxed text-foreground">
              <strong>Question:</strong> A simply supported timber beam of span L = {L} m carries a uniformly distributed load of w = {w} kN/m. If the depth of the rectangular cross-section is limited to h = {h_mm} mm, determine the minimum required width b so that the shearing stress does not exceed τ_allow = {tau_allow.toFixed(1)} MPa.
            </div>
          </div>

          <div className="space-y-2 text-xs text-muted-foreground">
            <h4 className="font-bold text-foreground">Design Constraints:</h4>
            <ul className="list-disc pl-4 space-y-1">
              <li>Allowable shear stress τ_allow = {tau_allow.toFixed(1)} MPa = {tau_allow.toFixed(1)} N/mm²</li>
              <li>Fixed Section Depth h = {h_mm} mm = {(h_mm / 1000).toFixed(1)} m</li>
              <li>Target parameter: Minimum width b</li>
            </ul>
          </div>

          <SlideCallout variant="info" className="py-2 px-3 text-[10px]">
            To design the beam width, we must first find the maximum internal shear force (V_max) from the beam span load conditions.
          </SlideCallout>
        </div>
      }
      rightContent={
        <div className="bg-muted/30 border border-border/50 rounded-xl p-4 flex flex-col items-center justify-center h-full min-h-[250px]">
          <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest block mb-2">Beam Span and Cross Section</span>
          <TimberBeamDesignDrawing />
        </div>
      }
    />
  );
};

export default Problem03Statement;
