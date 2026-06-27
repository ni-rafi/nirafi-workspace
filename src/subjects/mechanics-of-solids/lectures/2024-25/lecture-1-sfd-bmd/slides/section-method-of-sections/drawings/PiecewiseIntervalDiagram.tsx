import React from 'react';
import { Beam2DDrawing } from '@/subjects/mechanics-of-solids/features/sfd-bmd/components/drawings';
import { IBeam } from '@/subjects/mechanics-of-solids/cores/sfd-bmd/types';

interface PiecewiseIntervalDiagramProps {
  activeStep: number;
}

export const PiecewiseIntervalDiagram: React.FC<PiecewiseIntervalDiagramProps> = ({ activeStep }) => {
  const beam: IBeam = {
    length: 16,
    supports: [
      { id: 'A', type: 'hinge', position: 0 },
      { id: 'B', type: 'roller', position: 16 }
    ],
    loads: [
      { id: 'P', type: 'point', position: 5, magnitude: 20 },
      { id: 'w', type: 'udl', startPosition: 10, endPosition: 16, magnitude: 5 }
    ]
  };

  return (
    <div className="w-full select-none">
      <Beam2DDrawing
        beam={beam}
        showDiscontinuities={true}
        showZones={true}
        showSections={true}
        activeStep={activeStep}
      />
    </div>
  );
};
