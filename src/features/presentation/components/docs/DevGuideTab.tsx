import React, { useState } from 'react';
import { Palette, Play, Sliders, FileCode, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  ClickHighlight,
  LatexFormula,
  InteractiveCard,
  ParameterSlider,
  CalculationOutput,
  ClickStepsProvider
} from '@/features/presentation';
import { Gauge } from '@/features/presentation/components/elements/bklit/charts/gauge';

export const DevGuideTab: React.FC = () => {
  // ClickHighlight Step Controller
  const [activeStep, setActiveStep] = useState(1);

  // Parameter Slider States
  const [sliderLength, setSliderLength] = useState(6);
  const [sliderWidth, setSliderWidth] = useState(0.4);
  const concreteVolume = parseFloat((sliderLength * sliderWidth * 0.5).toFixed(3));

  return (
    <div className="flex flex-col gap-8 text-left animate-in fade-in duration-300">
      {/* 1. Click Highlight Demos */}
      <section className="flex flex-col gap-4">
        <div className="flex items-center gap-2 border-b pb-2">
          <Palette className="h-5 w-5 text-primary" />
          <h3 className="text-base font-extrabold text-foreground">Interactive Text Highlighting</h3>
        </div>
        <p className="text-xs text-muted-foreground leading-relaxed">
          Apply dynamic visual highlighting that triggers in sequence with slides using the <code>ClickHighlight</code> component.
          To see how this is implemented in code, inspect any of the existing lecture slides (e.g. active session files inside <code>src/lectures/</code>).
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Interactive Highlight Box */}
          <div className="border border-border bg-card p-5 rounded-2xl flex flex-col gap-4 shadow-sm">
            <h4 className="text-xs font-bold text-foreground font-mono uppercase tracking-wider text-primary border-b pb-1.5">Live Interactive Preview</h4>
            <div className="min-h-16 flex items-center justify-center p-3 bg-muted/10 border border-dashed rounded-xl">
              <ClickStepsProvider currentClickOverride={activeStep}>
                <p className="text-xs leading-relaxed font-sans text-foreground select-none">
                  Estimating structural concrete requires{' '}
                  <ClickHighlight at={1} variant="paint">
                    isolating volumetric cubic meters
                  </ClickHighlight>{' '}
                  and applying{' '}
                  <ClickHighlight at={2} variant="rect">
                    wastage multipliers
                  </ClickHighlight>{' '}
                  to prevent{' '}
                  <ClickHighlight at={3} variant="strike">
                    material shortages
                  </ClickHighlight>{' '}
                  on site.
                </p>
              </ClickStepsProvider>
            </div>

            <div className="flex gap-2 justify-center">
              <Button size="xs" variant="outline" onClick={() => setActiveStep(0)} className="cursor-pointer text-[10px]">Reset</Button>
              <Button size="xs" variant={activeStep >= 1 ? 'default' : 'outline'} onClick={() => setActiveStep(1)} className="cursor-pointer text-[10px]">Step 1 (Paint)</Button>
              <Button size="xs" variant={activeStep >= 2 ? 'default' : 'outline'} onClick={() => setActiveStep(2)} className="cursor-pointer text-[10px]">Step 2 (Rect)</Button>
              <Button size="xs" variant={activeStep >= 3 ? 'default' : 'outline'} onClick={() => setActiveStep(3)} className="cursor-pointer text-[10px]">Step 3 (Strike)</Button>
            </div>
          </div>

          {/* Highlight Guidance */}
          <div className="border border-border bg-card p-5 rounded-2xl flex flex-col gap-3 shadow-sm justify-center">
            <h4 className="text-xs font-bold text-foreground font-mono uppercase tracking-wider text-primary border-b pb-1.5 flex items-center gap-1.5">
              <FileCode className="h-3.5 w-3.5" /> Component Reference
            </h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Wrap target terms in <code>&lt;ClickHighlight&gt;</code> and specify the click-step trigger using the <code>at</code> prop.
            </p>
            <p className="text-xs text-muted-foreground leading-relaxed">
              The parent slide or presentation viewer automatically manages the steps context. For layout configuration or complex sequencing examples, refer directly to any existing lecture deck file in the codebase.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Unified Sandbox Panels & Connected Gauge */}
      <section className="flex flex-col gap-4">
        <div className="flex items-center gap-2 border-b pb-2">
          <Sliders className="h-5 w-5 text-primary" />
          <h3 className="text-base font-extrabold text-foreground">Sandbox Parameter Panels & Real-Time Charts</h3>
        </div>
        <p className="text-xs text-muted-foreground leading-relaxed">
          Maintain full compatibility with both Slide Mode and Blog Mode by avoiding raw styling templates or raw input tags.
          Instead, use modular sandbox sliders connected directly to real-time visualizations or output computations.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-start">
          {/* Reactive Estimator Demo */}
          <div className="border border-border bg-card p-5 rounded-2xl flex flex-col gap-4 shadow-sm">
            <h4 className="text-xs font-bold text-foreground font-mono uppercase tracking-wider text-primary border-b pb-1.5">Interactive Sandbox Card</h4>
            <InteractiveCard title="Beam Volume Estimator">
              <div className="flex flex-col gap-4">
                <ParameterSlider
                  label="Beam Length"
                  value={sliderLength}
                  min={2}
                  max={12}
                  step={1}
                  unit="m"
                  onChange={setSliderLength}
                />
                <ParameterSlider
                  label="Beam Width"
                  value={sliderWidth}
                  min={0.2}
                  max={0.8}
                  step={0.1}
                  unit="m"
                  onChange={setSliderWidth}
                />
                <CalculationOutput
                  title="Concrete Volume"
                  value={concreteVolume}
                  unit="m³"
                />
              </div>
            </InteractiveCard>
          </div>

          {/* Connected Graph Visualization */}
          <div className="border border-border bg-card p-5 rounded-2xl flex flex-col gap-4 shadow-sm items-center justify-center min-h-[295px]">
            <h4 className="text-xs font-bold text-foreground font-mono uppercase tracking-wider text-primary border-b pb-1.5 w-full text-left">Live Gauge Graph</h4>
            <div className="w-full flex items-center justify-center py-2">
              <Gauge 
                value={Math.min(100, Math.max(0, Math.round((concreteVolume / 4.8) * 100)))}
                centerValue={concreteVolume}
                suffix=" m³"
                defaultLabel="Volume"
                useGradient={true}
                totalNotches={30}
                minWidth={180}
                className="w-full max-w-[200px]"
              />
            </div>
            <p className="text-[10px] text-muted-foreground text-center leading-relaxed">
              Real-time synchronization: Modifying the length and width inputs on the left recalculates the volume and redraws this interactive Bklit Gauge chart dynamically.
            </p>
          </div>
        </div>
      </section>

      {/* 3. Equations & Formulas */}
      <section className="flex flex-col gap-4">
        <div className="flex items-center gap-2 border-b pb-2">
          <Play className="h-5 w-5 text-primary" />
          <h3 className="text-base font-extrabold text-foreground">LaTeX Equations Step-Highlighting</h3>
        </div>
        <p className="text-xs text-muted-foreground leading-relaxed">
          For mathematical layouts, separate the LaTeX equation string into distinct nodes to avoid breaking the KaTeX parser when applying click highlights.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-start">
          <div className="border border-border bg-card p-5 rounded-2xl flex flex-col gap-4 shadow-sm">
            <h4 className="text-xs font-bold text-foreground font-mono uppercase tracking-wider text-primary border-b pb-1.5">Live Formula Sandbox</h4>
            <div className="flex items-center gap-1.5 justify-center py-4 bg-muted/10 border border-dashed rounded-xl select-none text-xs">
              <ClickStepsProvider currentClickOverride={activeStep}>
                <LatexFormula math="V = L \times W \times H \times" />
                <ClickHighlight at={2} variant="text">
                  <LatexFormula math="(1 + \text{wastage})" />
                </ClickHighlight>
              </ClickStepsProvider>
            </div>
            <p className="text-[10px] text-muted-foreground text-center">
              (Use Step 2 button in the Highlight panel above to toggle state)
            </p>
          </div>

          {/* Equation Guidance */}
          <div className="border border-border bg-card p-5 rounded-2xl flex flex-col gap-3 shadow-sm min-h-[140px] justify-center">
            <h4 className="text-xs font-bold text-foreground font-mono uppercase tracking-wider text-primary border-b pb-1.5 flex items-center gap-1.5">
              <FileCode className="h-3.5 w-3.5" /> Formula Guidelines
            </h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Wrap math segments using the <code>LatexFormula</code> element. Use consecutive nodes inside an inline flex container to apply step highlighting cleanly to specific parts of a math equation.
            </p>
            <p className="text-xs text-muted-foreground leading-relaxed">
              For complete reference files, please check the existing quantity surveying slide definitions in the repo.
            </p>
          </div>
        </div>
      </section>

      {/* 4. Chart Components */}
      <section className="flex flex-col gap-4">
        <div className="flex items-center gap-2 border-b pb-2">
          <CheckCircle2 className="h-5 w-5 text-primary" />
          <h3 className="text-base font-extrabold text-foreground">Responsive Chart Layout Bounds</h3>
        </div>
        <p className="text-xs text-muted-foreground leading-relaxed">
          Charts are imported from Bklit UI. Wrap them in a width-constrained container (e.g. <code>w-full max-w-[700px] mx-auto</code>) to limit the height to 350px. The charts automatically resolve active color schemes via HSL variables from <code>charts.css</code>. See existing presentation components for reference implementation.
        </p>
      </section>
    </div>
  );
};

export default DevGuideTab;
