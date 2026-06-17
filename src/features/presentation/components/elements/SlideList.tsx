import React from 'react';
import { SlideBullet } from './SlideBullet';

interface SlideListProps {
  items: Array<{
    title?: string;
    text: string;
    revealAt?: number | string;
    revealPreset?: 'fade' | 'fade-in' | 'up' | 'down' | 'scale' | 'none';
    icon?: React.ReactNode;
  }>;
  className?: string;
}

export const SlideList: React.FC<SlideListProps> = ({
  items,
  className = '',
}) => {
  return (
    <ul className={`space-y-3 text-left ${className}`}>
      {items.map((item, idx) => (
        <SlideBullet
          key={idx}
          title={item.title}
          text={item.text}
          revealAt={item.revealAt}
          revealPreset={item.revealPreset}
          icon={item.icon}
        />
      ))}
    </ul>
  );
};

export default SlideList;
