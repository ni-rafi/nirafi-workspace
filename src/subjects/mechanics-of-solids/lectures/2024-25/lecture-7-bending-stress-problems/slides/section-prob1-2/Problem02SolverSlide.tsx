import React from 'react';
import { ClickSyncedTabs, ClickHighlight } from '@/features/presentation/components/elements';
import { useClickStepsContext } from '@/features/presentation/context/ClickStepsContext';
import { getProblem2SolverItems } from './problem2SolverData';

export const Problem02SolverSlide: React.FC = () => {
  const { currentClick } = useClickStepsContext();
  const items = getProblem2SolverItems(currentClick);

  return (
    <>
      <ClickHighlight at={7} className="hidden">{' '}</ClickHighlight>
      <ClickHighlight at={8} className="hidden">{' '}</ClickHighlight>
      <ClickHighlight at={9} className="hidden">{' '}</ClickHighlight>
      <ClickSyncedTabs
        title="Step-by-Step Design Sizing Solver"
        items={items}
        leftTitle="Sizing & Optimization Components"
        rightTitle="Solver Output & Profile View"
        leftWidth="52%"
        visualizerHeight={185}
        clickToTabMap={[0, 0, 0, 1, 1, 1, 2, 2, 2, 2]}
        dense={true}
      />
    </>
  );
};

export default Problem02SolverSlide;
