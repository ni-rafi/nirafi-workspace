import React, { useEffect, useState, useId } from 'react';
import mermaid from 'mermaid';

// Initialize Mermaid layout options globally
mermaid.initialize({
  startOnLoad: false,
  theme: 'dark',
  securityLevel: 'loose',
  themeVariables: {
    background: '#020617', // Match slate-950 color
    primaryColor: '#3b82f6',
    primaryTextColor: '#f8fafc',
    lineColor: '#64748b',
  },
});

interface MermaidDiagramProps {
  definition: string;
  scale?: number;
}

export const MermaidDiagram: React.FC<MermaidDiagramProps> = ({ definition, scale = 1 }) => {
  const uniqueId = useId();
  // Strip colons from React useId to make it a valid HTML ID selector
  const elementId = `mermaid-${uniqueId.replace(/:/g, '')}`;
  const [svgContent, setSvgContent] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    setError(null);

    const generateDiagram = async () => {
      try {
        const cleanedDef = definition.trim();
        if (!cleanedDef) return;

        // Render diagram SVG asynchronously
        const { svg } = await mermaid.render(elementId + '-svg', cleanedDef);
        
        if (active) {
          setSvgContent(svg);
        }
      } catch (err) {
        console.warn('Failed to parse Mermaid flowchart:', err);
        if (active) {
          setError('Invalid flowchart syntax. Click reset or edit block.');
        }
      }
    };

    generateDiagram();

    return () => {
      active = false;
    };
  }, [definition, elementId]);

  if (error) {
    return (
      <div className="w-full rounded-xl border border-destructive/20 bg-destructive/5 p-4 text-center text-xs font-semibold text-destructive select-none">
        {error}
      </div>
    );
  }

  return (
    <div
      className="w-full flex justify-center overflow-auto py-2 transition-transform duration-300"
      style={{
        transform: `scale(${scale})`,
        transformOrigin: 'top center',
      }}
      data-mermaid-diagram
      dangerouslySetInnerHTML={{ __html: svgContent || '<div class="text-xs text-muted-foreground animate-pulse">Rendering flowchart...</div>' }}
    />
  );
};

export default MermaidDiagram;
