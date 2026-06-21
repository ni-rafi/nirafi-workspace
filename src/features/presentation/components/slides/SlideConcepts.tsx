import React from 'react';
import ClickRevealGroup from '../elements/ClickRevealGroup';

interface SlideConceptsProps {
  slideNo: number;
}

export const SlideConcepts: React.FC<SlideConceptsProps> = ({ slideNo }) => {
  return (
    <div className="flex flex-col gap-4 animate-fade-in w-full text-left max-w-xl">
      <h3 className="text-xl font-bold text-foreground">
        Slide {slideNo}: Pending Slide Component
      </h3>
      <p className="text-xs text-muted-foreground leading-relaxed">
        This slide number is requested but is not yet mapped in the active lecture registry. If you have recently changed the slide count or structure, please refresh your browser to reload the slide deck module.
      </p>
      
      <ClickRevealGroup
        preset="up"
        className="list-disc pl-5 text-xs text-muted-foreground/90 flex flex-col gap-1.5"
      >
        <li>Verify that the slide component is exported in the slide deck files</li>
        <li>Check if the slide number is mapped in the lecture registry</li>
        <li>Confirm you are navigating within valid slide bounds</li>
      </ClickRevealGroup>
    </div>
  );
};

export default SlideConcepts;
