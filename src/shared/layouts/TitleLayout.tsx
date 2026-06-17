import React, { useContext } from 'react';
import { PresentationContext } from '../../features/presentation/context/PresentationContext';
import LayoutHeader from './components/LayoutHeader';
import LayoutFooter from './components/LayoutFooter';

interface TitleLayoutProps {
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  description?: React.ReactNode;
  footer?: React.ReactNode;
}

/**
 * TitleLayout renders cover pages, session openers, or major dividers.
 */
export const TitleLayout: React.FC<TitleLayoutProps> = ({
  title,
  subtitle,
  description,
  footer,
}) => {
  const presentation = useContext(PresentationContext);
  const viewMode = presentation?.viewMode || 'present';

  if (viewMode === 'scroll') {
    return (
      <div className="relative flex flex-col items-center justify-center text-center max-w-2xl mx-auto py-10 px-6 gap-4 bg-card border border-border/60 rounded-2xl shadow-xs w-full">
        {subtitle && (
          <span className="text-[10px] tracking-widest text-primary uppercase font-mono font-bold">
            {subtitle}
          </span>
        )}
        <LayoutHeader title={title} variant="title" />
        {description && (
          <p className="text-sm text-muted-foreground max-w-lg mx-auto leading-relaxed">
            {description}
          </p>
        )}
        <LayoutFooter footer={footer} variant="title" />
      </div>
    );
  }

  return (
    <div className="relative flex flex-col justify-between h-full w-full p-12 bg-transparent text-foreground overflow-hidden">
      <div className="relative z-10 flex-1 flex flex-col justify-center items-center text-center max-w-3xl mx-auto gap-4">
        {subtitle && (
          <span className="text-[10px] tracking-widest text-primary uppercase font-mono font-bold animate-pulse">
            {subtitle}
          </span>
        )}
        <LayoutHeader title={title} variant="title" />
        {description && (
          <p className="text-sm text-muted-foreground max-w-lg mx-auto leading-relaxed">
            {description}
          </p>
        )}
      </div>
      
      <LayoutFooter footer={footer} variant="title" />
    </div>
  );
};

export default TitleLayout;
