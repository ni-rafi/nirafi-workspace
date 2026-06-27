import React from 'react';
import { TwoColumnLayout } from './TwoColumnLayout';
import { CheckSquare } from 'lucide-react';

export interface SummaryItem {
  title: string;
  description: string | React.ReactNode;
  icon?: React.ReactNode;
}

export interface SummaryOutcome {
  coCode: string;       // e.g. "CO2 MAPPED"
  title: string;        // e.g. "Prepare Bill of Quantities"
  description: string;  // e.g. "Prepare the bill of quantity for different work packages..."
  assessmentMetric: string; // e.g. "Your ability to interpret 2D elevations..."
}

interface LectureSummaryLayoutProps {
  title?: string;
  summaryTitle?: string;
  summaryItems: SummaryItem[];
  outcome: SummaryOutcome;
  footer?: React.ReactNode;
}

export const LectureSummaryLayout: React.FC<LectureSummaryLayoutProps> = ({
  title = 'Summary & Outcome Alignment',
  summaryTitle = 'LECTURE SUMMARY',
  summaryItems,
  outcome,
  footer,
}) => {
  return (
    <TwoColumnLayout
      title={title}
      footer={footer}
      leftWidth="52%"
      leftContent={
        <div className="flex flex-col h-fit justify-start text-left select-text relative pl-5 border-l-[3px] border-primary py-2.5">
          {/* Bracket Ticks */}
          <div className="absolute top-0 left-0 w-4.5 h-[3px] bg-primary" />
          <div className="absolute bottom-0 left-0 w-4.5 h-[3px] bg-primary" />

          <div className="flex flex-col gap-4">
            <div>
              <h2 className="text-xs md:text-sm font-extrabold uppercase text-primary tracking-wider mb-3">
                {summaryTitle}
              </h2>
              <div className="flex flex-col gap-4">
                {summaryItems.map((item, idx) => (
                  <div key={idx} className="flex gap-3 items-start">
                    <div className="shrink-0 text-primary mt-0.5">
                      {item.icon || <CheckSquare className="h-4.5 w-4.5" />}
                    </div>
                    <div className="flex-1">
                      <h4 className="text-xs md:text-sm font-bold text-foreground leading-snug mb-0.5">
                        {item.title}
                      </h4>
                      <p className="text-[11px] md:text-xs text-muted-foreground leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      }
      rightContent={
        <div className="flex flex-col h-fit justify-start text-left select-text relative pl-5 border-l-[3px] border-primary py-2.5">
          {/* Bracket Ticks */}
          <div className="absolute top-0 left-0 w-4.5 h-[3px] bg-primary" />
          <div className="absolute bottom-0 left-0 w-4.5 h-[3px] bg-primary" />

          <div className="flex flex-col gap-4">
            <div>
              <h2 className="text-xs md:text-sm font-extrabold uppercase text-primary tracking-wider mb-2">
                COURSE OUTCOME ALIGNMENT
              </h2>
              
              <div className="inline-block px-2 py-0.5 text-[9px] font-bold text-primary bg-primary/10 rounded-sm border border-primary/20 mb-3 select-none">
                {outcome.coCode}
              </div>

              <div className="text-[11px] md:text-xs text-muted-foreground leading-relaxed mb-3">
                This session directly maps to <strong className="font-extrabold text-foreground">{outcome.coCode} ({outcome.title})</strong>:
              </div>

              <div className="pl-3 border-l-2 border-primary bg-muted/30 p-2.5 rounded-r-md text-[11px] md:text-xs font-semibold text-foreground italic leading-normal mb-3">
                "{outcome.description}"
              </div>

              <div className="text-[10px] md:text-[11px] text-muted-foreground italic leading-relaxed">
                {outcome.assessmentMetric}
              </div>
            </div>
          </div>
        </div>
      }
    />
  );
};

export default LectureSummaryLayout;
