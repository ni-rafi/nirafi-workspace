import React from 'react';
import { AlertTriangle } from 'lucide-react';

export const PrintingSection: React.FC = () => {
  return (
    <div className="flex flex-col gap-6 w-full animate-in fade-in duration-200 text-left">
      <div className="flex flex-col gap-2">
        <h3 className="text-xl font-extrabold text-foreground tracking-tight">PDF Exporting Guide</h3>
        <p className="text-xs text-muted-foreground leading-relaxed">
          Generate print-ready handouts and copies of lecture slide decks utilizing stylesheet overrides.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
        <div className="flex flex-col gap-1 p-4 bg-muted/20 border border-border/60 rounded-xl">
          <span className="text-[10px] font-bold text-primary uppercase font-mono tracking-wider">Normal Output</span>
          <h4 className="text-xs font-bold text-foreground mt-0.5">Export PDF (Normal)</h4>
          <p className="text-[11px] text-muted-foreground leading-relaxed">
            Downloads a clean, presentation handout. Automatically hides all sidebar panels, theme selectors, navigation controls, and live interactive buttons.
          </p>
        </div>

        <div className="flex flex-col gap-1 p-4 bg-muted/20 border border-border/60 rounded-xl">
          <span className="text-[10px] font-bold text-primary uppercase font-mono tracking-wider">Annotated Output</span>
          <h4 className="text-xs font-bold text-foreground mt-0.5">Export with Annotations</h4>
          <p className="text-[11px] text-muted-foreground leading-relaxed">
            Includes custom calculations, text overrides, input states, and screen drawings on top of the slide cards. Excellent for review manuals.
          </p>
        </div>
      </div>

      <div className="p-4 border border-amber-500/20 bg-amber-500/5 rounded-2xl flex items-start gap-3 mt-1">
        <AlertTriangle className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
        <div className="flex flex-col gap-1 text-xs">
          <span className="font-bold text-foreground">Critical Browser Print Settings:</span>
          <p className="text-muted-foreground leading-relaxed">
            When the system print layout modal opens, ensure you specify:
          </p>
          <ul className="list-disc pl-4 flex flex-col gap-1 mt-1 text-muted-foreground font-medium">
            <li><strong>Orientation: Landscape</strong> (To capture slide proportions correctly)</li>
            <li><strong>Margins: None</strong></li>
            <li><strong>Background graphics: Checked / Enabled</strong> (To render colors and borders)</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PrintingSection;
