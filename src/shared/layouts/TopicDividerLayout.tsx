import React, { useContext } from 'react';
import { PresentationContext } from '../../features/presentation/context/PresentationContext';

interface TopicDividerLayoutProps {
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  topicNumber?: string;
  description?: React.ReactNode;
}

export const TopicDividerLayout: React.FC<TopicDividerLayoutProps> = ({
  title,
  subtitle,
  topicNumber,
  description,
}) => {
  const presentation = useContext(PresentationContext);
  const viewMode = presentation?.viewMode || 'present';
  const isThumbnail = presentation?.isThumbnail || false;
  const headerTitleClass = isThumbnail ? '' : 'slide-header-title';

  const badgeText = topicNumber || subtitle || 'Next Topic';

  if (viewMode === 'blog') {
    return (
      <div className="flex flex-col gap-3 py-6 text-left border-l-4 border-primary pl-4 my-6 w-full bg-accent/10 rounded-r-lg">
        <span className="text-xs font-extrabold font-mono tracking-widest text-primary uppercase">
          {badgeText}
        </span>
        <h2 className="text-xl md:text-2xl font-black tracking-tight text-foreground">
          {title}
        </h2>
        {description && (
          <p className="text-xs md:text-sm text-muted-foreground mt-1">
            {description}
          </p>
        )}
      </div>
    );
  }

  if (viewMode === 'scroll') {
    return (
      <div className="relative flex flex-col w-full bg-card rounded-2xl border border-border/80 p-6 select-text text-foreground animate-in fade-in duration-200 justify-center items-center text-center my-4 overflow-hidden shadow-sm">
        {/* Glow decorative elements */}
        <div className="absolute -top-12 -left-12 h-32 w-32 rounded-full bg-primary/5 blur-2xl pointer-events-none" />
        <div className="absolute -bottom-12 -right-12 h-32 w-32 rounded-full bg-primary/5 blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center gap-3 py-4 max-w-xl">
          <span className="inline-flex w-fit items-center rounded-full px-3 py-0.5 text-[9px] font-bold font-mono tracking-widest border border-primary/20 bg-primary/5 text-primary uppercase">
            {badgeText}
          </span>
          <h3 className={`text-lg md:text-xl font-bold tracking-tight text-primary leading-tight ${headerTitleClass}`}>
            {title}
          </h3>
          {description && (
            <p className="text-[10px] md:text-xs text-muted-foreground font-medium leading-relaxed mt-1">
              {description}
            </p>
          )}
        </div>
      </div>
    );
  }

  // Slide/Presentation Mode: Clean, striking, minimal, and fully centered section opener
  return (
    <div className="relative flex flex-col items-center justify-center h-full w-full px-6 py-8 bg-transparent text-foreground overflow-hidden select-none">
      {/* Dynamic graphic accents behind the title */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.02]">
        <div className="h-[400px] w-[400px] rounded-full border border-foreground animate-pulse" />
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center text-center max-w-2xl mx-auto gap-5 animate-in fade-in zoom-in-95 duration-500">
        {/* Sleek pill badge */}
        <span className="inline-flex items-center rounded-full px-4 py-1 text-xs font-extrabold font-mono tracking-widest border border-primary/25 bg-primary/10 text-primary uppercase">
          {badgeText}
        </span>

        {/* Title */}
        <h1 className={`text-3xl md:text-5xl font-extrabold tracking-tight text-primary leading-tight mt-1 ${headerTitleClass}`}>
          {title}
        </h1>

        {/* Minimal accent line */}
        <div className="h-0.5 w-24 bg-gradient-to-r from-transparent via-primary/50 to-transparent my-1" />

        {/* Description */}
        {description && (
          <p className="text-sm md:text-base text-muted-foreground/90 font-medium max-w-lg leading-relaxed">
            {description}
          </p>
        )}
      </div>
    </div>
  );
};

export default TopicDividerLayout;
