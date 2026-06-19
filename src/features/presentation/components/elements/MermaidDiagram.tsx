import React, { useEffect, useState, useId, useContext } from 'react';
import mermaid from 'mermaid';
import { PresentationContext } from '../../context/PresentationContext';

// Initialize Mermaid layout options globally
mermaid.initialize({
  startOnLoad: false,
  theme: 'base',
  securityLevel: 'loose',
  themeVariables: {
    background: 'transparent',
    primaryColor: '#3b82f6',
    primaryTextColor: '#f8fafc',
    lineColor: '#64748b',
  },
  themeCSS: `
    .node rect, .node circle, .node ellipse, .node polygon, .node path {
      fill: var(--card) !important;
      stroke: var(--border) !important;
      stroke-width: 1.5px !important;
    }
    .node .label, .node .label *, .node text, .node text * {
      color: var(--foreground) !important;
      fill: var(--foreground) !important;
    }
    .edgePath .path {
      stroke: var(--muted-foreground) !important;
      stroke-width: 1.5px !important;
    }
    .arrowheadPath {
      fill: var(--muted-foreground) !important;
      stroke: none !important;
    }
  `,
});

interface MermaidDiagramProps {
  definition: string;
  scale?: number;
}

export const MermaidDiagram: React.FC<MermaidDiagramProps> = ({ definition, scale = 1 }) => {
  const presentation = useContext(PresentationContext);
  const isPresentMode = presentation ? presentation.viewMode === 'present' : false;

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
          // Make the SVG responsive by replacing hardcoded width/style rules depending on display mode
          let adjustedSvg = svg;
          
          if (isPresentMode) {
            adjustedSvg = adjustedSvg
              .replace(/width="[^"]*"/, 'width="100%"')
              .replace(/height="[^"]*"/, 'height="100%"');
            
            if (adjustedSvg.includes('preserveAspectRatio="')) {
              adjustedSvg = adjustedSvg.replace(/preserveAspectRatio="[^"]*"/, 'preserveAspectRatio="xMidYMid meet"');
            } else {
              adjustedSvg = adjustedSvg.replace('<svg', '<svg preserveAspectRatio="xMidYMid meet"');
            }

            if (adjustedSvg.includes('style="')) {
              adjustedSvg = adjustedSvg.replace(/style="([^"]*)"/, (_, styles: string) => {
                const cleaned = styles
                  .split(';')
                  .filter((s) => !s.trim().startsWith('max-width') && !s.trim().startsWith('max-height') && !s.trim().startsWith('height'))
                  .join(';');
                return `style="${cleaned}; max-width: 100%; max-height: 100%; display: block; margin: auto;"`;
              });
            } else {
              adjustedSvg = adjustedSvg.replace('<svg', '<svg style="max-width: 100%; max-height: 100%; display: block; margin: auto;"');
            }
          } else {
            // For scroll/blog modes, scale only by width, letting height grow naturally
            adjustedSvg = adjustedSvg
              .replace(/width="[^"]*"/, 'width="100%"')
              .replace(/height="[^"]*"/, 'height="auto"');

            if (adjustedSvg.includes('style="')) {
              adjustedSvg = adjustedSvg.replace(/style="([^"]*)"/, (_, styles: string) => {
                const cleaned = styles
                  .split(';')
                  .filter((s) => !s.trim().startsWith('max-width') && !s.trim().startsWith('height'))
                  .join(';');
                return `style="${cleaned}; max-width: 100%; height: auto; display: block; margin: 0 auto;"`;
              });
            } else {
              adjustedSvg = adjustedSvg.replace('<svg', '<svg style="max-width: 100%; height: auto; display: block; margin: 0 auto;"');
            }
          }
          setSvgContent(adjustedSvg);
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
  }, [definition, elementId, isPresentMode]);

  if (error) {
    return (
      <div className="w-full rounded-xl border border-destructive/20 bg-destructive/5 p-4 text-center text-xs font-semibold text-destructive select-none">
        {error}
      </div>
    );
  }

  if (isPresentMode) {
    return (
      <div
        className="w-full h-full self-stretch flex justify-center items-center overflow-hidden"
        data-mermaid-diagram
      >
        <div 
          className="w-full h-full flex justify-center items-center transition-all duration-300"
          style={{
            maxWidth: `${scale * 100}%`,
          }}
          dangerouslySetInnerHTML={{ __html: svgContent || '<div class="text-xs text-muted-foreground animate-pulse">Rendering flowchart...</div>' }}
        />
      </div>
    );
  }

  // Scroll and Blog modes: height auto
  return (
    <div
      className="w-full flex justify-center items-center overflow-hidden py-2"
      data-mermaid-diagram
    >
      <div 
        className="w-full transition-all duration-300"
        style={{
          maxWidth: `${scale * 100}%`,
        }}
        dangerouslySetInnerHTML={{ __html: svgContent || '<div class="text-xs text-muted-foreground animate-pulse">Rendering flowchart...</div>' }}
      />
    </div>
  );
};

export default MermaidDiagram;
