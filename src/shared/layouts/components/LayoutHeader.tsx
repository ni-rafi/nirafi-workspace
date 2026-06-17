import React, { useContext } from 'react';
import { PresentationContext } from '../../../features/presentation/context/PresentationContext';

interface LayoutHeaderProps {
  title: React.ReactNode;
  variant?: 'default' | 'title';
}

export const LayoutHeader: React.FC<LayoutHeaderProps> = ({ title, variant = 'default' }) => {
  const presentation = useContext(PresentationContext);
  const viewMode = presentation?.viewMode || 'present';

  if (viewMode === 'scroll') {
    if (variant === 'title') {
      return (
        <h1 className="text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl leading-tight">
          {title}
        </h1>
      );
    }
    return (
      <header className="slide-header text-lg font-bold tracking-tight text-foreground mb-6">
        {title}
      </header>
    );
  }

  if (variant === 'title') {
    return (
      <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl leading-tight slide-header-title">
        {title}
      </h1>
    );
  }

  return (
    <header className="slide-header text-xl font-bold tracking-tight text-foreground mb-4 slide-header-title">
      {title}
    </header>
  );
};

export default LayoutHeader;
