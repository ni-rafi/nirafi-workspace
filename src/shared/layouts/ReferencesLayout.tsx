import React from 'react';
import { FullWidthLayout } from './FullWidthLayout';

export interface ReferenceBook {
  title: string;
  authors: string;
  edition?: string;
  sections: string[];
}

interface ReferencesLayoutProps {
  title?: string;
  references: ReferenceBook[];
  instruction?: string;
  footer?: React.ReactNode;
}

export const ReferencesLayout: React.FC<ReferencesLayoutProps> = ({
  title = 'References',
  references,
  instruction = 'Go through these sections for a better understanding.',
  footer,
}) => {
  return (
    <FullWidthLayout title={title} footer={footer}>
      <div className="flex flex-col h-full w-full justify-between gap-6 py-2 select-text text-left max-w-4xl mx-auto">
        <div className="flex-1 flex flex-col justify-center gap-6 p-6 md:p-8 bg-slate-50 dark:bg-slate-950/40 rounded-2xl border border-border/60">
          {references.slice(0, 3).map((ref, idx) => (
            <div key={idx} className="flex flex-col gap-1.5 last:mb-0 mb-2">
              <h3 className="text-base md:text-lg font-extrabold text-foreground tracking-tight leading-snug">
                {ref.title}{ref.edition ? `, ${ref.edition}.` : ''}
              </h3>
              <p className="text-xs md:text-sm text-muted-foreground font-semibold">
                Book by {ref.authors}
              </p>
              <p className="text-xs md:text-sm text-foreground font-medium flex items-baseline gap-1">
                <span className="text-primary font-bold">Section:</span>{' '}
                <span className="font-mono bg-background border border-border/40 px-1.5 py-0.5 rounded text-[11px] md:text-xs">
                  {ref.sections.join(', ')}
                </span>
              </p>
            </div>
          ))}
        </div>

        {instruction && (
          <div className="bg-primary hover:bg-primary/95 text-primary-foreground text-center font-bold text-sm md:text-base py-3 px-6 rounded-xl shadow-xs transition-colors select-none">
            {instruction}
          </div>
        )}
      </div>
    </FullWidthLayout>
  );
};

export default ReferencesLayout;
