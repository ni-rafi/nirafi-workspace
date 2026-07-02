import React from 'react';
import { ClickSyncedTabs, type ClickSyncedTabItem } from '@/features/presentation/components/elements/ClickSyncedTabs';
import { LatexFormula, SlideParagraph, ClickHighlight } from '@/features/presentation/components/elements';
import { ShearEquilibriumDrawing } from './drawings/ShearEquilibriumDrawing';

export const ShearEquilibriumSteps: React.FC = () => {
  const items: ClickSyncedTabItem[] = [
    {
      title: '1. Stress Element Setup',
      badge: 'FBD Particle',
      badgeVariant: 'primary',
      description: 'Isolate a tiny material block aligned with coordinate axes.',
      rightContent: (
        <div className="flex flex-col items-center justify-start gap-2 w-full text-left">
          <ShearEquilibriumDrawing currentTab={0} />
          <div className="text-[11px] leading-relaxed text-muted-foreground w-full px-1">
            <SlideParagraph variant="plain" className="text-[11px] font-bold text-foreground mb-1">
              Microscopic Continuum Analysis:
            </SlideParagraph>
            <span className="space-y-1 block text-muted-foreground">
              • <strong>Infinitesimal Element</strong>: We isolate a tiny 2D square particle from the beam segment.
              <br />
              • <strong>Coordinate Orientation</strong>: Faces are aligned perpendicular to coordinate axes.
              <br />
              • <strong>Stresses Tracked</strong>: Normal (<LatexFormula math="\sigma" />) and shearing (<LatexFormula math="\tau" />) stresses act on these planes.
            </span>
          </div>
        </div>
      )
    },
    {
      title: '2. Primary Transverse Shear',
      badge: 'Vertical Couple',
      badgeVariant: 'warning',
      description: 'Vertical shear force creates opposing vertical stresses.',
      rightContent: (
        <div className="flex flex-col items-center justify-start gap-2 w-full text-left">
          <ShearEquilibriumDrawing currentTab={1} />
          <div className="text-[11px] leading-relaxed text-muted-foreground w-full px-1">
            <SlideParagraph variant="plain" className="text-[11px] font-bold text-foreground mb-1">
              Vertical Shear Actions:
            </SlideParagraph>
            <span className="space-y-1 block text-muted-foreground">
              • <strong>Vertical Couple</strong>: Applied vertical shear force creates vertical shear stress (<LatexFormula math="\tau_{xy}" />).
              <br />
              • <strong>Directional Balance</strong>: Acts upward on the right face, and downward on the left face to satisfy force equilibrium (<ClickHighlight variant="paint" at={2} className="inline-block font-extrabold"><LatexFormula math="\sum F_y = 0" /></ClickHighlight>).
            </span>
          </div>
        </div>
      )
    },
    {
      title: '3. Rotational Dilemma',
      badge: 'Unstable Spin',
      badgeVariant: 'error',
      description: 'Opposing vertical forces form a moment couple causing spin.',
      rightContent: (
        <div className="flex flex-col items-center justify-start gap-2 w-full text-left">
          <ShearEquilibriumDrawing currentTab={2} />
          <div className="text-[11px] leading-relaxed text-muted-foreground w-full px-1">
            <SlideParagraph variant="plain" className="text-[11px] font-bold text-foreground mb-1">
              Equilibrium Violation:
            </SlideParagraph>
            <span className="space-y-1 block text-muted-foreground">
              • <strong>Moment Couple</strong>: Opposing vertical shear stresses create a clockwise moment couple.
              <br />
              • <strong>Rotational Instability</strong>: The element spins infinitely, violating static equilibrium: (<ClickHighlight variant="paint" at={4} className="inline-block font-extrabold text-red-500"><LatexFormula math="\sum M_z \neq 0" /></ClickHighlight>).
            </span>
          </div>
        </div>
      )
    },
    {
      title: '4. Complementary Shear',
      badge: 'Balanced State',
      badgeVariant: 'success',
      description: 'Equal and opposite horizontal couple restores equilibrium.',
      rightContent: (
        <div className="flex flex-col items-center justify-start gap-2 w-full text-left">
          <ShearEquilibriumDrawing currentTab={3} />
          <div className="text-[11px] leading-relaxed text-muted-foreground w-full px-1">
            <SlideParagraph variant="plain" className="text-[11px] font-bold text-foreground mb-1">
              Complementary Shear Theorem:
            </SlideParagraph>
            <span className="space-y-1 block text-muted-foreground">
              • <strong>The Theorem</strong>: Shear stress on any plane is accompanied by an equal shear stress on a perpendicular plane.
              <br />
              • <strong>Rotational Balance</strong>: Vertical shear (<LatexFormula math="\tau_{xy}" />) induces an equal horizontal shear (<LatexFormula math="\tau_{yx}" />) to restore stability: (<ClickHighlight variant="paint" at={6} className="inline-block font-extrabold text-emerald-500"><LatexFormula math="\tau_{xy} = \tau_{yx}" /></ClickHighlight>).
            </span>
          </div>
        </div>
      )
    }
  ];

  return (
    <ClickSyncedTabs
      title="Elemental Stress Block and Equilibrium"
      items={items}
      leftTitle="Development of Complementary Shear Stress"
      rightTitle="Stress Element FBD & State Details"
      leftWidth="48%"
      clickToTabMap={[0, 1, 1, 2, 2, 3, 3]}
    />
  );
};

export default ShearEquilibriumSteps;
