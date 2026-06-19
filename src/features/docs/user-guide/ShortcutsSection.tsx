import React from 'react';
import { Keyboard, HelpCircle } from 'lucide-react';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion';

export const ShortcutsSection: React.FC = () => {
  return (
    <div className="flex flex-col gap-6 w-full animate-in fade-in duration-200 text-left">
      <div className="flex flex-col gap-2">
        <h3 className="text-xl font-extrabold text-foreground tracking-tight">Navigation & Keyboard Controls</h3>
        <p className="text-xs text-muted-foreground leading-relaxed">
          Navigate presentation slides, control interactive elements, and trigger overlay canvases directly from your keyboard.
        </p>
      </div>

      <Accordion type="single" collapsible defaultValue="slide-nav" className="w-full">
        {/* Slide Navigation */}
        <AccordionItem value="slide-nav">
          <AccordionTrigger className="text-xs font-bold text-foreground">
            <span className="flex items-center gap-2">
              <Keyboard className="h-4 w-4 text-primary" />
              Slide Presentation Shortcuts
            </span>
          </AccordionTrigger>
          <AccordionContent>
            <div className="flex flex-col gap-2 text-xs text-muted-foreground mt-2 pl-6">
              <p className="leading-relaxed">
                Control the flow of the presentation slide deck:
              </p>
              <div className="grid grid-cols-1 gap-2.5 max-w-3xl">
                <div className="flex justify-between items-center py-1.5 border-b border-border/30">
                  <span className="font-semibold text-foreground">Next slide / trigger highlight step</span>
                  <kbd className="px-2 py-0.5 bg-muted border border-border rounded shadow-xs font-mono text-[10px]">Right Arrow</kbd>
                </div>
                <div className="flex justify-between items-center py-1.5 border-b border-border/30">
                  <span className="font-semibold text-foreground">Previous slide / clear highlights</span>
                  <kbd className="px-2 py-0.5 bg-muted border border-border rounded shadow-xs font-mono text-[10px]">Left Arrow</kbd>
                </div>
                <div className="flex justify-between items-center py-1.5 border-b border-border/30">
                  <span className="font-semibold text-foreground">Direct jump to slide number</span>
                  <div className="flex items-center gap-1">
                    <kbd className="px-2 py-0.5 bg-muted border border-border rounded shadow-xs font-mono text-[10px]">1</kbd>
                    <span className="text-[10px]">to</span>
                    <kbd className="px-2 py-0.5 bg-muted border border-border rounded shadow-xs font-mono text-[10px]">9</kbd>
                  </div>
                </div>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Presenter Overlays */}
        <AccordionItem value="overlay-controls">
          <AccordionTrigger className="text-xs font-bold text-foreground">
            <span className="flex items-center gap-2">
              <HelpCircle className="h-4 w-4 text-primary" />
              Presenter Overlays & Canvas Draw
            </span>
          </AccordionTrigger>
          <AccordionContent>
            <div className="flex flex-col gap-2 text-xs text-muted-foreground mt-2 pl-6">
              <p className="leading-relaxed">
                Draw markings over slide cards or access supplementary analytics panels:
              </p>
              <div className="grid grid-cols-1 gap-2.5 max-w-3xl">
                <div className="flex justify-between items-center py-1.5 border-b border-border/30">
                  <span className="font-semibold text-foreground">Toggle ink overlay sketch drawing canvas</span>
                  <kbd className="px-2 py-0.5 bg-muted border border-border rounded shadow-xs font-mono text-[10px]">D Key</kbd>
                </div>
                <div className="flex justify-between items-center py-1.5 border-b border-border/30">
                  <span className="font-semibold text-foreground">Clear ink drawings from the canvas</span>
                  <kbd className="px-2 py-0.5 bg-muted border border-border rounded shadow-xs font-mono text-[10px]">Escape Key</kbd>
                </div>
                <div className="flex justify-between items-center py-1.5 border-b border-border/30">
                  <span className="font-semibold text-foreground">Toggle slide layout configuration settings</span>
                  <kbd className="px-2 py-0.5 bg-muted border border-border rounded shadow-xs font-mono text-[10px]">P Key</kbd>
                </div>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default ShortcutsSection;
