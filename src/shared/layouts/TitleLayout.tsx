import React from 'react';
import MorphingBackground from '../components/MorphingBackground';

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
  return (
    <div className="relative flex flex-col justify-between h-full w-full p-12 bg-background text-foreground overflow-hidden">
      <MorphingBackground variant="cover" />
      
      <div className="relative z-10 flex-1 flex flex-col justify-center items-center text-center max-w-3xl mx-auto gap-4">
        {subtitle && (
          <span className="text-[10px] tracking-widest text-primary uppercase font-mono font-bold animate-pulse">
            {subtitle}
          </span>
        )}
        <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl leading-tight">
          {title}
        </h1>
        {description && (
          <p className="text-sm text-muted-foreground max-w-lg mx-auto leading-relaxed">
            {description}
          </p>
        )}
      </div>
      
      {footer && (
        <div className="relative z-10 text-[10px] font-semibold text-muted-foreground font-mono text-center">
          {footer}
        </div>
      )}
    </div>
  );
};

export default TitleLayout;
