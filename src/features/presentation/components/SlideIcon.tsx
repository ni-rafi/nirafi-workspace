import React from 'react';
import { Icon } from '@iconify/react';

interface SlideIconProps {
  icon: string;
  className?: string;
}

export const SlideIcon: React.FC<SlideIconProps> = ({ icon, className = '' }) => {
  return (
    <span className={`inline-flex items-center justify-center ${className}`} data-slide-icon>
      <Icon icon={icon} className="h-full w-full" />
    </span>
  );
};

export default SlideIcon;
