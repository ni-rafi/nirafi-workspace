import React from 'react';

export interface TrussTypologyDrawingProps {
  type: string;
  className?: string;
}

export const TrussTypologyDrawing: React.FC<TrussTypologyDrawingProps> = ({ type, className = '' }) => {
  const strokeColor = 'currentColor';

  switch (type.toLowerCase()) {
    case 'howe':
      return (
        <svg viewBox="0 0 200 80" className={`w-full h-auto ${className}`}>
          <path d="M 10 70 L 100 20 L 190 70 Z" fill="none" stroke={strokeColor} strokeWidth="1.5" />
          <path d="M 10 70 L 190 70" fill="none" stroke={strokeColor} strokeWidth="1.5" />
          <line x1="40" y1="70" x2="40" y2="53" stroke={strokeColor} strokeWidth="1.2" />
          <line x1="70" y1="70" x2="70" y2="36" stroke={strokeColor} strokeWidth="1.2" />
          <line x1="100" y1="70" x2="100" y2="20" stroke={strokeColor} strokeWidth="1.2" />
          <line x1="130" y1="70" x2="130" y2="36" stroke={strokeColor} strokeWidth="1.2" />
          <line x1="160" y1="70" x2="160" y2="53" stroke={strokeColor} strokeWidth="1.2" />
          <line x1="40" y1="70" x2="10" y2="70" stroke={strokeColor} strokeWidth="1.2" />
          <line x1="40" y1="53" x2="70" y2="70" stroke={strokeColor} strokeWidth="1.2" />
          <line x1="70" y1="36" x2="100" y2="70" stroke={strokeColor} strokeWidth="1.2" />
          <line x1="130" y1="36" x2="100" y2="70" stroke={strokeColor} strokeWidth="1.2" />
          <line x1="160" y1="53" x2="130" y2="70" stroke={strokeColor} strokeWidth="1.2" />
          <line x1="160" y1="70" x2="190" y2="70" stroke={strokeColor} strokeWidth="1.2" />
        </svg>
      );
    case 'warren':
      return (
        <svg viewBox="0 0 200 80" className={`w-full h-auto ${className}`}>
          <path d="M 10 70 L 100 20 L 190 70 Z" fill="none" stroke={strokeColor} strokeWidth="1.5" />
          <path d="M 10 70 L 190 70" fill="none" stroke={strokeColor} strokeWidth="1.5" />
          <line x1="10" y1="70" x2="55" y2="45" stroke={strokeColor} strokeWidth="1.2" />
          <line x1="55" y1="45" x2="100" y2="70" stroke={strokeColor} strokeWidth="1.2" />
          <line x1="100" y1="70" x2="145" y2="45" stroke={strokeColor} strokeWidth="1.2" />
          <line x1="145" y1="45" x2="190" y2="70" stroke={strokeColor} strokeWidth="1.2" />
          <line x1="55" y1="45" x2="100" y2="20" stroke={strokeColor} strokeWidth="1.2" />
          <line x1="145" y1="45" x2="100" y2="20" stroke={strokeColor} strokeWidth="1.2" />
        </svg>
      );
    case 'bowstring':
      return (
        <svg viewBox="0 0 200 80" className={`w-full h-auto ${className}`}>
          <path d="M 10 70 Q 100 10 190 70" fill="none" stroke={strokeColor} strokeWidth="1.5" />
          <path d="M 10 70 L 190 70" fill="none" stroke={strokeColor} strokeWidth="1.5" />
          <line x1="40" y1="70" x2="40" y2="47" stroke={strokeColor} strokeWidth="1.2" />
          <line x1="70" y1="70" x2="70" y2="30" stroke={strokeColor} strokeWidth="1.2" />
          <line x1="100" y1="70" x2="100" y2="25" stroke={strokeColor} strokeWidth="1.2" />
          <line x1="130" y1="70" x2="130" y2="30" stroke={strokeColor} strokeWidth="1.2" />
          <line x1="160" y1="70" x2="160" y2="47" stroke={strokeColor} strokeWidth="1.2" />
          <line x1="70" y1="30" x2="40" y2="70" stroke={strokeColor} strokeWidth="1.2" />
          <line x1="100" y1="25" x2="70" y2="70" stroke={strokeColor} strokeWidth="1.2" />
          <line x1="100" y1="25" x2="130" y2="70" stroke={strokeColor} strokeWidth="1.2" />
          <line x1="130" y1="30" x2="160" y2="70" stroke={strokeColor} strokeWidth="1.2" />
        </svg>
      );
    case 'pratt':
    default:
      return (
        <svg viewBox="0 0 200 80" className={`w-full h-auto ${className}`}>
          <path d="M 10 70 L 100 20 L 190 70 Z" fill="none" stroke={strokeColor} strokeWidth="1.5" />
          <path d="M 10 70 L 190 70" fill="none" stroke={strokeColor} strokeWidth="1.5" />
          <line x1="40" y1="70" x2="40" y2="53" stroke={strokeColor} strokeWidth="1.2" />
          <line x1="70" y1="70" x2="70" y2="36" stroke={strokeColor} strokeWidth="1.2" />
          <line x1="100" y1="70" x2="100" y2="20" stroke={strokeColor} strokeWidth="1.2" />
          <line x1="130" y1="70" x2="130" y2="36" stroke={strokeColor} strokeWidth="1.2" />
          <line x1="160" y1="70" x2="160" y2="53" stroke={strokeColor} strokeWidth="1.2" />
          <line x1="40" y1="53" x2="10" y2="70" stroke={strokeColor} strokeWidth="1.2" />
          <line x1="70" y1="36" x2="40" y2="70" stroke={strokeColor} strokeWidth="1.2" />
          <line x1="100" y1="20" x2="70" y2="70" stroke={strokeColor} strokeWidth="1.2" />
          <line x1="100" y1="20" x2="130" y2="70" stroke={strokeColor} strokeWidth="1.2" />
          <line x1="130" y1="36" x2="160" y2="70" stroke={strokeColor} strokeWidth="1.2" />
          <line x1="160" y1="53" x2="190" y2="70" stroke={strokeColor} strokeWidth="1.2" />
        </svg>
      );
  }
};
