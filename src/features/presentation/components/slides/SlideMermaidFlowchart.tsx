import React, { useContext } from 'react';
import MermaidDiagram from '../elements/MermaidDiagram';
import { PresentationContext } from '../../context/PresentationContext';

export const SlideMermaidFlowchart: React.FC = () => {
  const presentation = useContext(PresentationContext);
  const isPresent = presentation?.viewMode === 'present';

  const definition = `graph TD
  A[Start Slab Estimation] --> B[Retrieve Length, Width & Thickness]
  B --> C{Thickness > 0?}
  C -->|No| D[Throw Validation Alert]
  C -->|Yes| E[Compute Base Net Volume]
  E --> F[Apply Concrete wastage coefficient 5%]
  F --> G[Round final results to 3 decimals]
  G --> H[Store in database registry]`;

  const containerClass = isPresent
    ? 'h-[360px] w-full flex justify-center items-center p-5 md:p-6 bg-muted/60 dark:bg-muted/20 rounded-xl overflow-hidden'
    : 'w-full flex justify-center items-center p-5 md:p-6 bg-muted/60 dark:bg-muted/20 rounded-xl overflow-hidden';

  return (
    <div className="relative w-full h-full flex flex-col justify-start text-left px-8 py-8 overflow-y-auto">
      <div className="flex flex-col gap-1 mb-4 select-none">
        <h3 className="text-xl font-bold text-foreground">
          Slide 7: Textual Flowcharts & Diagrams
        </h3>
        <p className="text-xs text-muted-foreground">
          Flowchart drawing from simple text descriptions, rendered via Mermaid.js.
        </p>
      </div>

      <div className={containerClass}>
        <MermaidDiagram definition={definition} scale={0.95} />
      </div>
    </div>
  );
};

export default SlideMermaidFlowchart;
