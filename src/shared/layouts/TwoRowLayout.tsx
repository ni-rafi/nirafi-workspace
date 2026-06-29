import React, { useContext } from 'react';
import { PresentationContext } from '@/features/presentation/context/PresentationContext';
import LayoutHeader from './components/LayoutHeader';
import LayoutFooter from './components/LayoutFooter';

interface TwoRowLayoutProps {
  title: React.ReactNode;
  topContent: React.ReactNode;
  bottomContent: React.ReactNode;
  topHeight?: string; // e.g. "40%" or "60%"
  bgVariant?: 'default' | 'calculation' | 'gallery';
  footer?: React.ReactNode;
}

/**
 * TwoRowLayout stacks contents vertically.
 * Ideal for horizontal drawings/charts at the top and descriptive text/calculations below.
 */
export const TwoRowLayout: React.FC<TwoRowLayoutProps> = ({
  title,
  topContent,
  bottomContent,
  topHeight = '50%',
  footer,
}) => {
  const presentation = useContext(PresentationContext);
  const viewMode = presentation?.viewMode || 'present';

  if (viewMode === 'blog') {
    return (
      <div className="w-full flex flex-col gap-6 text-left">
        <section className="top-row w-full">
          {topContent}
        </section>
        <section className="bottom-row w-full border-t pt-6 border-border/40">
          {bottomContent}
        </section>
      </div>
    );
  }

  if (viewMode === 'scroll') {
    return (
      <div className="relative flex flex-col w-full bg-transparent select-text text-foreground min-h-[200px] justify-between">
        <div>
          <LayoutHeader title={title} />
          <main className="flex flex-col gap-6 w-full items-start">
            <section className="top-row w-full text-left">
              {topContent}
            </section>
            <section className="bottom-row w-full text-left border-t pt-6 border-border/40">
              {bottomContent}
            </section>
          </main>
        </div>
        <LayoutFooter footer={footer} />
      </div>
    );
  }

  return (
    <div className="relative flex flex-col justify-between h-full w-full px-2.5 py-1.5 bg-transparent text-foreground overflow-hidden select-text">
      <div className="relative z-10 flex flex-col h-full w-full min-h-0 flex-1">
        <LayoutHeader title={title} />
        
        <main className="flex flex-col flex-1 gap-4 w-full min-h-0 items-start">
          <section 
            style={{ height: topHeight }}
            className="top-row w-full flex-shrink-0 overflow-hidden"
          >
            {topContent}
          </section>
          <section 
            className="bottom-row w-full flex-1 overflow-y-auto pl-1 pr-2 text-left border-t border-border/20 pt-3"
          >
            {bottomContent}
          </section>
        </main>
      </div>

      <LayoutFooter footer={footer} />
    </div>
  );
};

export default TwoRowLayout;
