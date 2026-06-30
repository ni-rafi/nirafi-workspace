import React from 'react';

export const RectangleSVG: React.FC = () => (
  <svg width="80" height="40" viewBox="0 0 80 40" className="mx-auto text-foreground">
    <rect x="5" y="5" width="70" height="22" fill="currentColor" fillOpacity="0.1" stroke="currentColor" strokeWidth="1.5" />
    <circle cx="40" cy="16" r="3" className="fill-blue-500" />
    <path d="M 5 33 L 40 33" stroke="currentColor" strokeWidth="1" strokeDasharray="2 1" />
    <text x="22" y="32" className="fill-muted-foreground text-[8px] font-mono" textAnchor="middle">x̄=L/2</text>
  </svg>
);

export const RightTriangleSVG: React.FC = () => (
  <svg width="80" height="40" viewBox="0 0 80 40" className="mx-auto text-foreground">
    <path d="M 5 5 L 5 27 L 75 27 Z" fill="currentColor" fillOpacity="0.1" stroke="currentColor" strokeWidth="1.5" />
    <circle cx="28" cy="20" r="3" className="fill-blue-500" />
    <path d="M 5 33 L 28 33" stroke="currentColor" strokeWidth="1" strokeDasharray="2 1" />
    <text x="16" y="32" className="fill-muted-foreground text-[8px] font-mono" textAnchor="middle">x̄=L/3</text>
  </svg>
);

export const PeakTriangleSVG: React.FC = () => (
  <svg width="80" height="40" viewBox="0 0 80 40" className="mx-auto text-foreground">
    <path d="M 5 27 L 35 5 L 75 27 Z" fill="currentColor" fillOpacity="0.1" stroke="currentColor" strokeWidth="1.5" />
    <circle cx="38" cy="20" r="3" className="fill-blue-500" />
    <text x="38" y="37" className="fill-muted-foreground text-[8px] font-mono" textAnchor="middle">x̄=1/3(L+a)</text>
  </svg>
);

export const TrapezoidSVG: React.FC = () => (
  <svg width="80" height="40" viewBox="0 0 80 40" className="mx-auto text-foreground">
    <path d="M 5 15 L 75 5 L 75 27 L 5 27 Z" fill="currentColor" fillOpacity="0.1" stroke="currentColor" strokeWidth="1.5" />
    <circle cx="43" cy="19" r="3" className="fill-blue-500" />
    <text x="40" y="37" className="fill-muted-foreground text-[7px] font-mono" textAnchor="middle">Trapezoid</text>
  </svg>
);

export const ParabolaDownSVG: React.FC = () => (
  <svg width="80" height="40" viewBox="0 0 80 40" className="mx-auto text-foreground">
    <path d="M 5 5 Q 45 5 75 27 L 5 27 Z" fill="currentColor" fillOpacity="0.1" stroke="currentColor" strokeWidth="1.5" />
    <circle cx="31" cy="19" r="3" className="fill-blue-500" />
    <text x="31" y="37" className="fill-muted-foreground text-[8px] font-mono" textAnchor="middle">x̄=3L/8</text>
  </svg>
);

export const CubicDownSVG: React.FC = () => (
  <svg width="80" height="40" viewBox="0 0 80 40" className="mx-auto text-foreground">
    <path d="M 5 5 C 35 5 65 17 75 27 L 5 27 Z" fill="currentColor" fillOpacity="0.1" stroke="currentColor" strokeWidth="1.5" />
    <circle cx="35" cy="19" r="3" className="fill-blue-500" />
    <text x="35" y="37" className="fill-muted-foreground text-[8px] font-mono" textAnchor="middle">x̄=2L/5</text>
  </svg>
);

export const ParabolaUpSVG: React.FC = () => (
  <svg width="80" height="40" viewBox="0 0 80 40" className="mx-auto text-foreground">
    <path d="M 5 5 Q 5 27 75 27 L 5 27 Z" fill="currentColor" fillOpacity="0.1" stroke="currentColor" strokeWidth="1.5" />
    <circle cx="22" cy="21" r="3" className="fill-blue-500" />
    <text x="35" y="37" className="fill-muted-foreground text-[8px] font-mono" textAnchor="middle">x̄=L/4</text>
  </svg>
);

export const CubicUpSVG: React.FC = () => (
  <svg width="80" height="40" viewBox="0 0 80 40" className="mx-auto text-foreground">
    <path d="M 5 5 C 5 22 45 27 75 27 L 5 27 Z" fill="currentColor" fillOpacity="0.1" stroke="currentColor" strokeWidth="1.5" />
    <circle cx="19" cy="22" r="3" className="fill-blue-500" />
    <text x="35" y="37" className="fill-muted-foreground text-[8px] font-mono" textAnchor="middle">x̄=L/5</text>
  </svg>
);
