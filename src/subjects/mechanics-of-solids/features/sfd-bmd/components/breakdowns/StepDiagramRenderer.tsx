import React from 'react';
import { logger } from '@/cores/logger/logger';
import { DoiStepVisual } from './diagrams/DoiStepVisual';
import { ReactionsStepVisual } from './diagrams/ReactionsStepVisual';
import { SectionStepVisual } from './diagrams/SectionStepVisual';
import { GraphicalStepVisual } from './diagrams/GraphicalStepVisual';
import { DoubleIntegrationStepVisual } from './diagrams/DoubleIntegrationStepVisual';
import { MomentAreaStepVisual } from './diagrams/MomentAreaStepVisual';
import { ConjugateBeamStepVisual } from './diagrams/ConjugateBeamStepVisual';
import { MicroStressWedge } from './diagrams/MicroStressWedge';
import { MicroMohrRadiusTriangle } from './diagrams/MicroMohrRadiusTriangle';
import { MicroPrincipalRotation } from './diagrams/MicroPrincipalRotation';

interface StepDiagramRendererProps {
  text: string;
  tab: string;
}

export const hasDiagram = (text: string, tab: string): boolean => {
  const trimmed = text.trim();
  if (
    trimmed.startsWith('#') ||
    trimmed === '' ||
    trimmed.toLowerCase().includes('calculation steps') ||
    trimmed.toLowerCase().includes('calculation breakdown') ||
    trimmed.toLowerCase().includes('transforms the real beam') ||
    trimmed.toLowerCase().includes('equations are only solved')
  ) {
    return false;
  }

  // Only show diagram toggle if the step actually has a specific diagram to display
  switch (tab) {
    case 'doi':
      return /^(support|internal)\s+(roller|hinge|fixed)/i.test(trimmed);
    case 'reactions':
      return trimmed.startsWith('**Step') && !trimmed.toLowerCase().includes('solved support reactions');
    case 'double-integration':
      return (
        trimmed.toLowerCase().includes('at support') ||
        trimmed.toLowerCase().includes('fixed support')
      );
    case 'moment-area':
      return (
        trimmed.toLowerCase().includes('centroid') ||
        trimmed.toLowerCase().includes('theorem ii') ||
        trimmed.toLowerCase().includes('m/ei') ||
        trimmed.toLowerCase().includes('deviation') ||
        trimmed.toLowerCase().includes('t_{') ||
        trimmed.toLowerCase().includes('t_') ||
        trimmed.toLowerCase().includes('reference tangent') ||
        trimmed.toLowerCase().includes('slope at') ||
        trimmed.toLowerCase().includes('\\theta_')
      );
    case 'conjugate-beam':
      return (
        trimmed.toLowerCase().includes('becomes') ||
        trimmed.toLowerCase().includes('remains') ||
        (trimmed.toLowerCase().includes('conjugate') && (trimmed.toLowerCase().includes('support') || trimmed.toLowerCase().includes('free end'))) ||
        trimmed.toLowerCase().includes('shear and moment') ||
        trimmed.toLowerCase().includes('step 3')
      );
    case 'section':
      return /\[([\d.]+),\s*([\d.]+)\]/.test(trimmed);
    case 'graphical':
      return (
        /\[([\d.]+),\s*([\d.]+)\]/.test(trimmed) ||
        /at\s+\$x\s*=\s*[\d.]+/i.test(trimmed)
      );
    case 'stress':
      return (
        trimmed.includes('R = \\sqrt') ||
        trimmed.includes('radius') ||
        trimmed.includes("Mohr's Circle") ||
        trimmed.includes('orientation') ||
        trimmed.includes('principal plane') ||
        trimmed.includes('rotation') ||
        trimmed.includes('theta_p') ||
        trimmed.includes('theta_s') ||
        trimmed.includes('wedge') ||
        trimmed.includes('inclined plane')
      );
    default:
      return false;
  }
};

const stepLogger = logger.child('StepDiagramRenderer');

export const StepDiagramRenderer: React.FC<StepDiagramRendererProps> = ({ text, tab }) => {
  const hasDiag = hasDiagram(text, tab);
  stepLogger.debug('StepDiagramRenderer evaluation', { text, tab, hasDiag });

  if (!hasDiag) {
    return null;
  }

  switch (tab) {
    case 'doi':
      return <DoiStepVisual text={text} />;
    case 'reactions':
      return <ReactionsStepVisual text={text} />;
    case 'section':
      return <SectionStepVisual text={text} />;
    case 'graphical':
      return <GraphicalStepVisual text={text} />;
    case 'double-integration':
      return <DoubleIntegrationStepVisual text={text} />;
    case 'moment-area':
      return <MomentAreaStepVisual text={text} />;
    case 'conjugate-beam':
      return <ConjugateBeamStepVisual text={text} />;
    case 'stress':
      if (text.includes('R = \\sqrt') || text.includes('radius') || text.includes('radius $R$') || text.includes("Mohr's Circle")) {
        return <MicroMohrRadiusTriangle text={text} />;
      }
      if (text.includes('orientation') || text.includes('principal plane') || text.includes('rotation') || text.includes('theta_p') || text.includes('theta_s')) {
        return <MicroPrincipalRotation text={text} />;
      }
      if (text.includes('wedge') || text.includes('inclined plane')) {
        return <MicroStressWedge text={text} />;
      }
      return null;
    default:
      return null;
  }
};
