import React from 'react';
import { TwoColumnLayout } from '@/shared/layouts/TwoColumnLayout';
import { SlideParagraph, SlideCallout, SlideList } from '@/features/presentation/components/elements';
import { ExpandableDrawing } from '@/shared/components';

export const PrimaryShearStress: React.FC = () => {
  return (
    <TwoColumnLayout
      title="Primary Transverse Shear Stresses"
      leftWidth="55%"
      leftContent={
        <div className="flex flex-col h-full justify-between gap-3 text-left">
          <div>
            <span className="text-[10px] font-bold text-indigo-500 uppercase tracking-widest block mb-1">
              Transverse Loading Response
            </span>
            <SlideParagraph variant="plain" className="text-xs text-muted-foreground">
              When a beam experiences a vertical shear force ($V$), shearing stresses act vertically along the vertical cross-sectional cutting planes.
            </SlideParagraph>
          </div>

          <div className="space-y-2">
            <h4 className="text-xs font-bold text-foreground">Vertical Shear Actions:</h4>
            <SlideList
              items={[
                { text: 'On the right face: shear stress acts upward (τ_xy).' },
                { text: 'On the left face: shear stress acts downward to balance the vertical forces (\\(\\sum F_y = 0\\)).' },
                { text: 'This pair of vertical stresses is called the **Primary Shear Stress**.' }
              ]}
            />
          </div>

          <SlideCallout variant="warning" className="py-2 px-3 text-[10px]">
            Notice a critical problem: These two opposing forces form a couple that wants to rotate the block. Let's analyze this dilemma next.
          </SlideCallout>
        </div>
      }
      rightContent={
        <div className="flex flex-col items-center justify-center h-full">
          <ExpandableDrawing
            title="Primary Transverse Shear Stress Block"
            description="FBD representation of a differential element displaying the vertical shear stress couple."
            className="max-w-[280px] mx-auto w-full"
          >
            <svg viewBox="0 0 160 160" className="w-full h-full aspect-square overflow-visible">
              <g transform="translate(80, 80)">
                <rect
                  x={-25}
                  y={-25}
                  width={50}
                  height={50}
                  className="fill-muted/20 stroke-foreground"
                  strokeWidth={1.5}
                />
                <line x1={-30} y1={-20} x2={-30} y2={20} stroke="#f59e0b" strokeWidth={1.5} />
                <polygon points="-30,20 -32.5,16 -27.5,16" fill="#f59e0b" />
                <line x1={30} y1={20} x2={30} y2={-20} stroke="#f59e0b" strokeWidth={1.5} />
                <polygon points="30,-20 27.5,-16 32.5,-16" fill="#f59e0b" />
                <text x={36} y={3} className="fill-amber-500 text-[8px] font-mono font-bold">
                  τ_xy
                </text>
                <text x={-48} y={3} className="fill-amber-500 text-[8px] font-mono font-bold">
                  τ_xy
                </text>
              </g>
            </svg>
          </ExpandableDrawing>
          <SlideParagraph variant="plain" className="text-[10.5px] text-muted-foreground mt-2 font-mono">
            Primary Vertical Stresses Applied
          </SlideParagraph>
        </div>
      }
    />
  );
};

export default PrimaryShearStress;
