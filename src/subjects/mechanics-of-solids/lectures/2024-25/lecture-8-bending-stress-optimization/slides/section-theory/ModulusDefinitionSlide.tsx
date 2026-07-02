import { SlideParagraph, SlideBullet, SlideEquation, LatexFormula, ClickReveal, ClickHighlight } from '@/features/presentation/components/elements';
import { Settings } from 'lucide-react';
import TwoColumnLayout from '@/shared/layouts/TwoColumnLayout';

export const ModulusDefinitionSlide: React.FC = () => {
  return (
    <TwoColumnLayout
      title="Mathematical Definition of Z"
      leftWidth="55%"
      leftContent={
        <div className="flex flex-col h-full justify-between gap-4 text-left select-text">
          <div>
            <div className="flex items-center space-x-1.5 text-indigo-500 font-bold text-[10px] uppercase mb-1">
              <Settings className="h-4.5 w-4.5" />
              <span>Section Parameterization</span>
            </div>
            <SlideParagraph variant="plain" className="text-xs text-muted-foreground leading-relaxed">
              {"By separating the material geometry properties from the external load moment "}
              <LatexFormula math="M" />
              {", we define a single shape parameter: the Section Modulus ("}
              <LatexFormula math="Z" />
              {")."}
            </SlideParagraph>
          </div>
          <div className="space-y-2 my-2">
            <SlideBullet text={<span>Start with the peak flexure formula: <LatexFormula math="\sigma_{\max} = \frac{M \cdot y_{\max}}{I}" />.</span>} revealAt={1} />
            <SlideBullet text={<span>Rearrange terms: <LatexFormula math="\sigma_{\max} = \frac{M}{I / y_{\max}}" />.</span>} revealAt={2} />
            <SlideBullet text={<span>Define Section Modulus (<LatexFormula math="Z" />) as: <LatexFormula math="Z = \frac{I}{y_{\max}}" />.</span>} revealAt={3} />
            <SlideBullet text={<span>Yields simplified stress formula: <LatexFormula math="\sigma_{\max} = \frac{M}{Z}" />.</span>} revealAt={4} />
          </div>
        </div>
      }
      rightContent={
        <div className="bg-muted/30 border border-border/50 rounded-xl p-4 flex flex-col items-center justify-center h-full min-h-[250px] w-full text-center select-text text-left">
          <div className="space-y-4 w-full">
            <ClickReveal at={5} preset="fade">
              <SlideEquation math="\sigma_{\max} = \frac{M \cdot y_{\max}}{I}" />
            </ClickReveal>
            <ClickReveal at={6} preset="fade">
              <div className="text-indigo-500 dark:text-indigo-400 font-bold text-[10px] font-mono text-center">⇓ Rearranging terms</div>
              <SlideEquation math="Z = \frac{I}{y_{\max}}" />
            </ClickReveal>
            <ClickReveal at={7} preset="fade">
              <div className="text-indigo-500 dark:text-indigo-400 font-bold text-[10px] font-mono text-center">⇓ Yields</div>
              <ClickHighlight at={8} variant="paint" className="block rounded-lg p-1">
                <SlideEquation math="\sigma_{\max} = \frac{M}{Z}" />
              </ClickHighlight>
            </ClickReveal>
          </div>
        </div>
      }
    />
  );
};

export default ModulusDefinitionSlide;
