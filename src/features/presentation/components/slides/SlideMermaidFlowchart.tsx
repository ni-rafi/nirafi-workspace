import React from 'react';
import MermaidDiagram from '../elements/MermaidDiagram';

export const SlideMermaidFlowchart: React.FC = () => {
  const definition = `graph TD
  A[Start Slab Estimation] --> B[Retrieve Length, Width & Thickness]
  B --> C{Thickness > 0?}
  C -->|No| D[Throw Validation Alert]
  C -->|Yes| E[Compute Base Net Volume]
  E --> F[Apply Concrete wastage coefficient 5%]
  F --> G[Round final results to 3 decimals]
  G --> H[Store in database registry]`;

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

      <div className="flex-1 flex justify-center items-center p-4 border border-white/10 bg-slate-900/40 rounded-2xl overflow-hidden">
        <MermaidDiagram definition={definition} scale={0.95} />
      </div>
    </div>
  );
};

export default SlideMermaidFlowchart;
