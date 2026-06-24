import React from 'react';
import { FullWidthLayout } from '@/shared/layouts/FullWidthLayout';
import { TwoColumnLayout } from '@/shared/layouts/TwoColumnLayout';
import { SlideParagraph, InteractiveCard, SlideList, SlideGrid } from '@/features/presentation/components/elements';
import { ClipboardList, FileText, Layers, PenTool, GitPullRequest, FileCheck } from 'lucide-react';

/**
 * Slide 1: Core Categories of Estimates
 */
export const Slide1: React.FC = () => {
  const estimateTypes = [
    { num: '1', title: 'Preliminary / Rough', desc: 'Quick approximate cost mapping for financial feasibility and sanctioning.', icon: <ClipboardList className="w-5 h-5 text-primary" /> },
    { num: '2', title: 'Detailed Estimate', desc: 'Accurate item-rate costing based on final working drawing quantities.', icon: <FileText className="w-5 h-5 text-primary" /> },
    { num: '3', title: 'Quantity Estimate', desc: 'Complete list of material and labor quantities required for works.', icon: <Layers className="w-5 h-5 text-primary" /> },
    { num: '4', title: 'Revised Estimate', desc: 'Updated detailed estimate for rate fluctuations without structural changes.', icon: <PenTool className="w-5 h-5 text-primary" /> },
    { num: '5', title: 'Supplementary Estimate', desc: 'Additional detailed estimate for mid-work structural design deviations.', icon: <GitPullRequest className="w-5 h-5 text-primary" /> },
    { num: '6', title: 'Complete Estimate', desc: 'Ultimate master budget covering all detailed items, land, and overheads.', icon: <FileCheck className="w-5 h-5 text-primary" /> },
  ];

  return (
    <FullWidthLayout title="Types of Estimates">
      <div className="space-y-4">
        <SlideParagraph variant="plain">
          Before executing detailed sub-structure calculations, a Quantity Surveyor must understand the various stages of project estimation. There are six primary types of estimates used in civil engineering:
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
 * Slide 2: Preliminary vs. Detailed Estimates
 */
export const Slide2: React.FC = () => {
  return (
    <TwoColumnLayout
      title="Defining the Core Estimate Types"
      leftWidth="50%"
      leftContent={
        <InteractiveCard title="Preliminary (Rough) Estimate">
          <p className="text-xs text-muted-foreground leading-relaxed">
            An approximate estimate prepared rapidly in the conceptual stage to evaluate financial viability and secure administrative approval.
          </p>
          <SlideList
            variant="plain"
            revealMode="none"
            items={[
              { title: 'Plinth Area Method:', text: 'Calculated using total built-up floor area multiplied by prevailing area rates.' },
              { title: 'Cubical Contents:', text: 'Calculates volume (Plinth Area × Height) to reflect vertical dimensions.' },
              { title: 'Unit Base Method:', text: 'Based on unit capacity metrics (e.g., cost per hospital bed, cost per classroom).' },
            ]}
          />
        </InteractiveCard>
      }
      rightContent={
        <InteractiveCard title="Detailed (Item Rate) Estimate">
          <p className="text-xs text-muted-foreground leading-relaxed">
            The most accurate, legally-binding cost projection method, compiled in two methodical stages:
          </p>
          <SlideList
            variant="plain"
            revealMode="none"
            items={[
              { title: 'Stage 1: Details of Measurement', text: 'Quantifying length, breadth, and depth of each construction item from final drawings.' },
              { title: 'Stage 2: Abstract of Estimated Cost', text: 'Applying specific schedule of rates (SoR) to calculated quantities to establish total cost.' },
            ]}
          />
        </InteractiveCard>
      }
    />
  );
};

/**
 * Slide 3: Estimates for Project Variations
 */
export const Slide3: React.FC = () => {
  const variationTypes = [
    { title: 'Revised Estimate', badge: 'Quantities/Rates Adjustment', desc: 'Prepared when original expenditures exceed sanction limits (typically by >5%) or rates fluctuate, but structural design remains unaltered.' },
    { title: 'Supplementary Estimate', badge: 'Structural Deviation', desc: 'Prepared in-progress when design changes or additional works are introduced that deviate from the originally approved structural drawings.' },
    { title: 'Quantity Estimate', badge: 'Material Schedules', desc: 'A complete itemized catalog of all raw quantities and material bills needed to complete works, excluding pricing indexes.' },
    { title: 'Complete Estimate', badge: 'All-inclusive Costing', desc: 'A master budget sheet covering land acquisition, legal fees, site supervision, contingencies (3-5%), and work charged establishment (1.5-2%) in addition to detailed item rates.' },
  ];

  return (
    <FullWidthLayout title="Estimates for Project Variations">
      <SlideGrid cols={2}>
        {variationTypes.map((v, i) => (
          <InteractiveCard key={i} title={v.title} variant="plain" className="p-4 border-border/40 hover:bg-muted/10 transition-colors">
            <span className="text-[10px] font-bold text-primary bg-primary/10 border border-primary/20 rounded px-2 py-0.5 inline-block mb-2">
              {v.badge}
            </span>
            <p className="text-xs text-muted-foreground leading-relaxed">
              {v.desc}
            </p>
          </InteractiveCard>
        ))}
      </SlideGrid>
    </FullWidthLayout>
  );
};
