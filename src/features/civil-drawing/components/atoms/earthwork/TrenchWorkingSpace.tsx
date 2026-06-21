import React from 'react';

interface TrenchWorkingSpaceProps {
  formationLevel: number;
  formationWidth: number; // base structure width (e.g. pile cap/footing width)
  workingSpaceAllowance?: number; // e.g. 500mm side space
  isTrenchExcavation?: boolean;
}

export const TrenchWorkingSpace: React.FC<TrenchWorkingSpaceProps> = ({
  formationLevel,
  formationWidth,
  workingSpaceAllowance = 500,
  isTrenchExcavation = true,
}) => {
  if (!isTrenchExcavation) return null;

  const fl = formationLevel;
  const structW = formationWidth;
  const space = workingSpaceAllowance;

  const leftWallX = -structW / 2 - space;
  const rightWallX = structW / 2 + space;
  
  const leftStructX = -structW / 2;
  const rightStructX = structW / 2;

  // Let's assume the trench height extends upward to a ground reference level
  const groundY = fl - 200; // Visual top of shoring
  
  return (
    <g>
      {/* 1. Excavation Trench Base Line (Bottom floor) */}
      <line
        x1={leftWallX}
        y1={fl}
        x2={rightWallX}
        y2={fl}
        className="stroke-foreground/60 stroke-[1.5]"
      />

      {/* 2. Shoring Sheet Piles (Vertical timber/steel retaining walls) */}
      {/* Left shoring wall */}
      <rect
        x={leftWallX - 4}
        y={groundY - 20}
        width="6"
        height={fl - groundY + 20}
        className="fill-zinc-400 stroke-zinc-600 dark:fill-zinc-600 dark:stroke-zinc-500 stroke-[0.75]"
      />
      {/* Right shoring wall */}
      <rect
        x={rightWallX - 2}
        y={groundY - 20}
        width="6"
        height={fl - groundY + 20}
        className="fill-zinc-400 stroke-zinc-600 dark:fill-zinc-600 dark:stroke-zinc-500 stroke-[0.75]"
      />

      {/* 3. Horizontal Timber/Steel Struts (bracing the shoring walls) */}
      {/* Upper Strut */}
      <rect
        x={leftWallX + 2}
        y={groundY + 30}
        width={rightWallX - leftWallX - 4}
        height="8"
        className="fill-amber-800/80 stroke-amber-950/60 dark:fill-amber-700/80 dark:stroke-amber-900/60 stroke-[0.5]"
      />
      {/* Lower Strut */}
      <rect
        x={leftWallX + 2}
        y={fl - 40}
        width={rightWallX - leftWallX - 4}
        height="8"
        className="fill-amber-800/80 stroke-amber-950/60 dark:fill-amber-700/80 dark:stroke-amber-900/60 stroke-[0.5]"
      />

      {/* 4. Clearance Dimension Line & Indicator Labels */}
      {/* Left Dimension Arrow */}
      <g className="stroke-primary fill-primary">
        {/* Dimension Line */}
        <line
          x1={leftWallX}
          y1={fl - 12}
          x2={leftStructX}
          y2={fl - 12}
          strokeWidth="0.8"
          strokeDasharray="2,1"
        />
        {/* Left Arrow tick */}
        <path d={`M ${leftWallX} ${fl - 12} l 4 -2 v 4 z`} />
        {/* Right Arrow tick */}
        <path d={`M ${leftStructX} ${fl - 12} l -4 -2 v 4 z`} />
        {/* Label */}
        <text
          x={(leftWallX + leftStructX) / 2}
          y={fl - 18}
          textAnchor="middle"
          fontSize="6"
          fontWeight="600"
          className="fill-primary font-mono stroke-none"
        >
          {`${space}mm offset`}
        </text>
      </g>

      {/* Right Dimension Arrow */}
      <g className="stroke-primary fill-primary">
        {/* Dimension Line */}
        <line
          x1={rightStructX}
          y1={fl - 12}
          x2={rightWallX}
          y2={fl - 12}
          strokeWidth="0.8"
          strokeDasharray="2,1"
        />
        {/* Left Arrow tick */}
        <path d={`M ${rightStructX} ${fl - 12} l 4 -2 v 4 z`} />
        {/* Right Arrow tick */}
        <path d={`M ${rightWallX} ${fl - 12} l -4 -2 v 4 z`} />
        {/* Label */}
        <text
          x={(rightStructX + rightWallX) / 2}
          y={fl - 18}
          textAnchor="middle"
          fontSize="6"
          fontWeight="600"
          className="fill-primary font-mono stroke-none"
        >
          {`${space}mm offset`}
        </text>
      </g>
    </g>
  );
};
