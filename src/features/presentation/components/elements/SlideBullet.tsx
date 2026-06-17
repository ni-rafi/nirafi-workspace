import React from 'react';
import { ClickReveal } from './ClickReveal';
import { SlideElementProps } from './SlideParagraph';

interface SlideBulletProps extends SlideElementProps {
  title?: string;
  text?: string;
  children?: React.ReactNode;
  icon?: React.ReactNode;
}

export const SlideBullet: React.FC<SlideBulletProps> = ({
  title,
  text,
  children,
  revealAt,
  revealPreset,
  icon,
  className = '',
}) => {
  const content = (
    <li className={`text-xs md:text-sm leading-relaxed text-muted-foreground select-text list-none flex items-start gap-2 ${className}`}>
      {icon ? (
        <span className="mt-1 shrink-0 text-primary">{icon}</span>
      ) : (
        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
      )}
      <div>
        {title && <span className="font-bold text-foreground mr-1.5">{title}</span>}
        {text || children}
      </div>
    </li>
  );

  if (revealAt !== undefined) {
    return <ClickReveal at={revealAt} preset={revealPreset}>{content}</ClickReveal>;
  }

  return content;
};

export default SlideBullet;
