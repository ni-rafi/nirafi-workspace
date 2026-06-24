import React from 'react';
import { FullWidthLayout } from '@/shared/layouts/FullWidthLayout';
import { TwoColumnLayout } from '@/shared/layouts/TwoColumnLayout';
import { SlideParagraph, InteractiveCard, SlideList, SlideGrid, ParameterSlider, LatexFormula } from '@/features/presentation/components/elements';
import { ClipboardList, FileText, Layers, PenTool, GitPullRequest, FileCheck, HelpCircle } from 'lucide-react';
import { useUrlSyncedState } from '@/features/presentation/hooks/useUrlSyncedState';

/**
 * Slide 1: Types of Construction Estimates
 */
export const Slide1: React.FC = () => {
  const estimateTypes = [
    { num: '1', title: 'Preliminary / Rough', desc: 'Evaluates project financial viability quickly for administrative sanction.', icon: <ClipboardList className="w-5 h-5 text-primary" /> },
    { num: '2', title: 'Detailed Estimate', desc: 'Exhaustive rates and quantities calculation for all items involved.', icon: <FileText className="w-5 h-5 text-primary" /> },
    { num: '3', title: 'Quantity Estimate', desc: 'Detailed schedules of material and labor quantities, excluding prices.', icon: <Layers className="w-5 h-5 text-primary" /> },
    { num: '4', title: 'Revised Estimate', desc: 'Prepared when costs exceed sanction limits, without structural shifts.', icon: <PenTool className="w-5 h-5 text-primary" /> },
    { num: '5', title: 'Supplementary Estimate', desc: 'Detailed estimate for structural deviations introduced mid-execution.', icon: <GitPullRequest className="w-5 h-5 text-primary" /> },
    { num: '6', title: 'Complete Estimate', desc: 'Master budget incorporating land cost, legal fees, and contingencies.', icon: <FileCheck className="w-5 h-5 text-primary" /> },
  ];

  return (
    <FullWidthLayout title="The Estimation Hierarchy: Types of Estimates">
      <div className="space-y-4">
        <SlideParagraph variant="plain">
          Before initiating detailed superstructure estimations, a Quantity Surveyor must classify the stages of project costing. Estimates are divided into six primary categories:
        </SlideParagraph>
        <SlideGrid cols={3}>
          {estimateTypes.map((t) => (
            <InteractiveCard key={t.num} title={`${t.num}. ${t.title}`} variant="plain" className="hover:bg-muted/10 border-border/40 transition-colors p-4">
              <div className="flex gap-3 items-start">
                <div className="mt-1 flex-shrink-0">{t.icon}</div>
                <p className="text-xs text-muted-foreground leading-relaxed">{t.desc}</p>
              </div>
            </InteractiveCard>
          ))}
        </SlideGrid>
      </div>
    </FullWidthLayout>
  );
};

/**
 * Slide 2: Conceptual Estimates (Part 1)
 */
export const Slide2: React.FC = () => {
  return (
    <TwoColumnLayout
      title="Approximate Estimating Methods"
      leftWidth="50%"
      leftContent={
        <InteractiveCard title="Plinth Area Method">
          <p className="text-xs text-muted-foreground leading-relaxed">
            Constructed by determining the building's total built-up floor area (outer envelope dimensions) and multiplying it by local PWD plinth rates.
          </p>
          <SlideList
            variant="plain"
            revealMode="none"
            items={[
              { title: 'Outer Dimensions:', text: 'Measured at plinth level, excluding plinth projection offsets.' },
              { title: 'Rate Adjustments:', text: 'Customized based on local material costs, foundation conditions, and number of stories.' },
              { title: 'Contingency Factor:', text: 'Usually covers 5% to 10% for unforeseen budget overheads.' },
            ]}
          />
        </InteractiveCard>
      }
      rightContent={
        <InteractiveCard title="Unit Base Method">
          <p className="text-xs text-muted-foreground leading-relaxed">
            Determines cost projections by multiplying total primary functional units (e.g. beds, students) by a standard historical rate.
          </p>
          <SlideList
            variant="plain"
            revealMode="none"
            items={[
              { title: 'Schools:', text: 'Cost is estimated per student capacity (e.g., total enrollment base).' },
              { title: 'Hospitals:', text: 'Cost is projected per clinic bed capability.' },
              { title: 'Residential:', text: 'Calculated per flat unit or habitable room unit.' },
            ]}
          />
        </InteractiveCard>
      }
    />
  );
};

/**
 * Slide 3: Conceptual Estimates (Part 2) - Cost Sandbox
 */
export const Slide3: React.FC = () => {
  const [length, setLength] = useUrlSyncedState<number>('conceptual_len', 15.0);
  const [width, setWidth] = useUrlSyncedState<number>('conceptual_width', 10.0);
  const [height, setHeight] = useUrlSyncedState<number>('conceptual_height', 6.5); // 2 storied building height

  const [plinthRate, setPlinthRate] = useUrlSyncedState<number>('conceptual_plinth_rate', 25000); // BDT per m2
  const [cubicRate, setCubicRate] = useUrlSyncedState<number>('conceptual_cubic_rate', 4200); // BDT per m3

  const plinthArea = length * width;
  const plinthCost = plinthArea * plinthRate;

  const cubicalVolume = length * width * height;
  const cubicalCost = cubicalVolume * cubicRate;

  return (
    <TwoColumnLayout
      title="The Cubical Contents Method & Cost Modeler"
      leftWidth="45%"
      leftContent={
        <div className="space-y-4 flex flex-col justify-between h-full">
          <InteractiveCard title="Cubical Contents Method">
            <p className="text-xs text-muted-foreground leading-relaxed">
              Provides higher accuracy for multi-storied buildings than the Plinth Area method, as it directly accounts for the vertical dimension (height).
            </p>
            <div className="mt-2 p-2.5 bg-muted/40 rounded border border-border/40 text-xs">
              <strong>Formula:</strong> Cost = Volume ($L \times B \times H$) &times; Local Cubic Rate.
            </div>
            <SlideList
              variant="plain"
              revealMode="none"
              className="mt-2"
              items={[
                { text: 'Length and Breadth are measured out-to-out of walls.' },
                { text: 'Height is measured from floor level up to the roof slab top.' },
                { text: 'Minor architectural projections are neglected at this stage.' },
              ]}
            />
          </InteractiveCard>
          
          <div className="p-3 bg-muted/20 border border-border/40 rounded-xl flex gap-2.5 items-start">
            <HelpCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
            <p className="text-[10.5px] text-muted-foreground leading-relaxed">
              <strong>Estimating Note:</strong> Notice how changes in height alter the Cubical Cost modeler, while the Plinth Area cost remains static.
            </p>
          </div>
        </div>
      }
      rightContent={
        <InteractiveCard title="Interactive Approximate Cost Sandbox">
          <div className="space-y-3">
            <div className="grid grid-cols-3 gap-2">
              <ParameterSlider label="Length" min={5} max={40} step={0.5} value={length} onChange={setLength} unit="m" />
              <ParameterSlider label="Width" min={5} max={30} step={0.5} value={width} onChange={setWidth} unit="m" />
              <ParameterSlider label="Height" min={3} max={15} step={0.5} value={height} onChange={setHeight} unit="m" />
            </div>

            <div className="grid grid-cols-2 gap-2 border-t border-border/40 pt-3">
              <ParameterSlider label="Plinth Rate (BDT/m²)" min={10000} max={40000} step={1000} value={plinthRate} onChange={setPlinthRate} unit="" />
              <ParameterSlider label="Cubic Rate (BDT/m³)" min={2000} max={8000} step={100} value={cubicRate} onChange={setCubicRate} unit="" />
            </div>

            <div className="grid grid-cols-2 gap-3 border-t border-border/40 pt-3">
              <div className="bg-primary/5 p-3 rounded-xl border border-primary/20">
                <span className="text-[9px] font-mono text-muted-foreground uppercase">Plinth Area Est.</span>
                <div className="text-xs font-bold text-foreground font-mono mt-0.5">Area: {plinthArea.toFixed(1)} m²</div>
                <div className="text-sm font-black text-primary font-mono mt-1">
                  ৳{plinthCost.toLocaleString('en-IN')}
                </div>
              </div>

              <div className="bg-emerald-500/5 p-3 rounded-xl border border-emerald-500/20">
                <span className="text-[9px] font-mono text-muted-foreground uppercase">Cubical Contents Est.</span>
                <div className="text-xs font-bold text-foreground font-mono mt-0.5">Vol: {cubicalVolume.toFixed(1)} m³</div>
                <div className="text-sm font-black text-emerald-500 font-mono mt-1">
                  ৳{cubicalCost.toLocaleString('en-IN')}
                </div>
              </div>
            </div>
          </div>
        </InteractiveCard>
      }
    />
  );
};



export const Slide4: React.FC = () => {
  const methods = [
    {
      title: '1. Long Wall - Short Wall Method',
      badge: 'Individual Offsets',
      desc: 'Separate calculations for long walls (Out-to-Out) and short walls (In-to-In). Highly dynamic and accurate for complex steps.',
    },
    {
      title: '2. Center Line Method',
      badge: 'Continuous Totals',
      desc: 'Sums the total centerline length of all walls. Rapid and accurate for buildings with uniform cross-sections.',
    },
    {
      title: '3. Partly Center Line & Cross Wall',
      badge: 'Hybrid Strategy',
      desc: 'Applies Centerline methods to external main walls and Long-Short methods to internal partition walls.',
    }
  ];

  return (
    <FullWidthLayout title="Methods of Taking Out Quantities">
      <div className="space-y-4">
        <SlideParagraph variant="plain">
          To extract exact material quantities for earthwork, foundation concrete, and superstructure brickwork, quantity surveyors utilize three primary methods:
        </SlideParagraph>
        <SlideGrid cols={3}>
          {methods.map((m, idx) => (
            <InteractiveCard key={idx} title={m.title} variant="plain" className="p-5 border-border/40 hover:bg-muted/10 transition-colors">
              <span className="text-[10px] font-mono font-bold text-primary bg-primary/10 border border-primary/20 rounded px-2 py-0.5 inline-block mb-3">
                {m.badge}
              </span>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {m.desc}
              </p>
            </InteractiveCard>
          ))}
        </SlideGrid>
      </div>
    </FullWidthLayout>
  );
};

/**
 * Slide 5: Executing the Measurement Methods
 */
export const Slide5: React.FC = () => {
  return (
    <TwoColumnLayout
      title="Navigating Long Walls & Center Lines"
      leftWidth="50%"
      leftContent={
        <InteractiveCard title="Long Wall - Short Wall Application">
          <p className="text-xs text-muted-foreground leading-relaxed mb-3">
            Long walls running horizontally are estimated out-to-out; perpendicular short walls are in-to-in:
          </p>
          <div className="space-y-3 font-mono">
            <div className="bg-muted/40 p-3 border border-border/40 rounded-lg">
              <span className="text-[9px] text-muted-foreground uppercase font-bold block mb-1">Long Wall Length (Out-to-Out)</span>
              <div className="text-xs text-foreground font-bold">
                <LatexFormula math="L_{\text{out}} = L_{\text{cl}} + 2 \times (0.5 \times B)" />
              </div>
            </div>
            <div className="bg-muted/40 p-3 border border-border/40 rounded-lg">
              <span className="text-[9px] text-muted-foreground uppercase font-bold block mb-1">Short Wall Length (In-to-In)</span>
              <div className="text-xs text-foreground font-bold">
                <LatexFormula math="L_{\text{in}} = L_{\text{cl}} - 2 \times (0.5 \times B)" />
              </div>
            </div>
          </div>
        </InteractiveCard>
      }
      rightContent={
        <InteractiveCard title="Center Line Application & Junctions">
          <p className="text-xs text-muted-foreground leading-relaxed">
            The total center line length is calculated and multiplied directly by the wall breadth and depth.
          </p>
          <div className="mt-3 p-3 bg-muted/40 border border-border/40 rounded-lg">
            <span className="text-[9px] text-muted-foreground uppercase font-bold block mb-1">The Junction Deduction Law</span>
            <p className="text-xs text-muted-foreground leading-relaxed">
              When cross walls, partition walls, or veranda walls join the main wall, the total centerline length must be reduced by half the wall width for every T-junction.
            </p>
            <div className="text-xs text-primary font-bold font-mono mt-2 text-center bg-primary/5 p-2 rounded border border-primary/10">
              Deduction = 0.5 &times; Breadth (B) per T-Junction
            </div>
          </div>
        </InteractiveCard>
      }
    />
  );
};
