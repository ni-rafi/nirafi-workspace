import React from 'react';
import { TwoColumnLayout } from '@/shared/layouts/TwoColumnLayout';
import {
  InteractiveCard,
  ParameterSlider,
  CalculationOutput,
  SlideParagraph,
  SlideList,
  SlideCallout
} from '@/features/presentation/components/elements';
import { useUrlSyncedState } from '@/features/presentation/hooks/useUrlSyncedState';
import { calculateSlabBarsCountInternal } from '../../cores';

export const SlabBarCountingSandbox: React.FC = () => {
  const [length, setLength] = useUrlSyncedState<number>('slab_length', 5.0);
  const [spacing, setSpacing] = useUrlSyncedState<number>('slab_spacing', 0.150);
  const [cover, setCover] = useUrlSyncedState<number>('slab_cover', 20); // in mm

  const coverM = cover / 1000;
  const result = calculateSlabBarsCountInternal(length, coverM, spacing);

  return (
    <TwoColumnLayout
      title="Slab Bar Distribution Sandbox"
      bgVariant="default"
      leftWidth="45%"
      leftContent={
        <InteractiveCard title="Slab Dimension &amp; Reinforcement Setup">
          <div className="space-y-4 mb-5">
            <ParameterSlider
              label="Total Slab Length (L)"
              min={2.0}
              max={10.0}
              step={0.1}
              value={length}
              onChange={setLength}
              unit=" m"
            />
            <ParameterSlider
              label="Bar Spacing (s)"
              min={0.1}
              max={0.3}
              step={0.025}
              value={spacing}
              onChange={setSpacing}
              unit=" m"
            />
            <ParameterSlider
              label="Clear Cover (cc)"
              min={15}
              max={40}
              step={5}
              value={cover}
              onChange={setCover}
              unit=" mm"
            />
          </div>

          <div className="border-t border-border/40 pt-4 space-y-3">
            <CalculationOutput
              title="Straight Bars (Bottom)"
              value={result.straightCount}
              unit="Nos."
              subtitle="[(L - 2×cc) / Spacing] + 1 (always rounded up)"
            />
            <CalculationOutput
              title="Cranked Bars (Alternating)"
              value={result.crankedCount}
              unit="Nos."
              subtitle="Straight Bars - 1"
            />
            <CalculationOutput
              title="Extra Top Bars (Both Sides)"
              value={result.extraTopCount}
              unit="Nos."
              subtitle="(Cranked Bars - 1) × 2"
            />
          </div>
        </InteractiveCard>
      }
      rightContent={
        <div className="h-full flex flex-col justify-between space-y-4">
          <InteractiveCard title="Slab Reinforcement Details" variant="default" className="flex-1">
            <div className="w-full flex justify-center py-2 bg-background/40 rounded-lg border border-border/30">
              <svg viewBox="0 0 400 140" className="w-full max-w-[360px] h-auto">
                <rect x="10" y="20" width="380" height="90" rx="4" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-foreground/20" />
                <line x1="10" y1="20" x2="390" y2="20" stroke="currentColor" strokeWidth="2" className="text-foreground/40" />
                <line x1="10" y1="110" x2="390" y2="110" stroke="currentColor" strokeWidth="2" className="text-foreground/40" />
                
                <line x1="10" y1="125" x2="390" y2="125" stroke="currentColor" strokeWidth="1" className="text-primary/60" />
                <polygon points="10,125 15,122 15,128" fill="currentColor" className="text-primary/60" />
                <polygon points="390,125 385,122 385,128" fill="currentColor" className="text-primary/60" />
                <text x="200" y="137" textAnchor="middle" className="fill-primary text-[11px] font-bold">L = {length.toFixed(2)}m</text>
                
                <path d="M 25 102 L 375 102" fill="none" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round" />
                <text x="30" y="95" className="fill-emerald-500 text-[11px] font-extrabold">Straight Bar ({result.straightCount} Nos)</text>
                
                <path d="M 25 102 L 80 102 L 110 40 L 290 40 L 320 102 L 375 102" fill="none" stroke="#f59e0b" strokeWidth="2.5" strokeLinecap="round" />
                <text x="140" y="32" className="fill-amber-500 text-[11px] font-extrabold">Cranked Bar ({result.crankedCount} Nos)</text>

                <path d="M 25 38 L 85 38" fill="none" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" />
                <path d="M 315 38 L 375 38" fill="none" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" />
                <text x="30" y="52" className="fill-red-500 text-[11px] font-extrabold">Extra Top ({result.extraTopCount} Nos)</text>
                
                <text x="200" y="75" textAnchor="middle" className="fill-muted-foreground text-[11px]">Spacing = {(spacing * 1000).toFixed(0)}mm</text>
              </svg>
            </div>

            <div className="mt-4">
              <SlideParagraph variant="plain" className="text-xs text-muted-foreground leading-relaxed">
                Notice the layout rules applied:
              </SlideParagraph>
              <SlideList
                items={[
                  { title: "Outer boundary start/end", text: "Layout is strictly bounded by straight bars at both ends to ensure proper structural closure." },
                  { title: "Alternating sequence", text: "Cranked bars sit in between straight bars, lifting the steel to the top to resist hogging tension at supports." },
                  { title: "Extra top consolidation", text: "Placed exclusively at top support zones to add resistance where high support moments occur." }
                ]}
              />
            </div>
          </InteractiveCard>
          
          <SlideCallout variant="info" title="Sessional BBS Rule of Thumb" className="py-2">
            <p className="text-[10px] leading-relaxed text-muted-foreground">
              Always use <strong>Math.ceil</strong> for the straight bars calculation: even a fractional remainder (e.g. 33.1) means an extra bar is physically required to satisfy maximum spacing constraints.
            </p>
          </SlideCallout>
        </div>
      }
    />
  );
};

export default SlabBarCountingSandbox;
