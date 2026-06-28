import React, { useContext, useState, useEffect } from 'react';
import { useUrlSyncedState } from '@/features/presentation/hooks/useUrlSyncedState';
import { useClickStepsContext } from '@/features/presentation/context/ClickStepsContext';
import { PresentationContext } from '@/features/presentation/context/PresentationContext';
import { TwoColumnLayout } from '@/shared/layouts/TwoColumnLayout';
import { ParameterSlider, LatexFormula, SlideParagraph, SlideBullet, ClickReveal } from '@/features/presentation/components/elements';
import { CurveCalculusSandboxDrawing } from '@/subjects/mechanics-of-solids/features/sfd-bmd/components/drawings';

export const CurveCalculusSandbox: React.FC = () => {
  const clickContext = useClickStepsContext();
  const { currentClick } = clickContext;
  const presentation = useContext(PresentationContext);
  const viewMode = presentation?.viewMode || 'present';

  const isScrollOrBlog = viewMode === 'scroll' || viewMode === 'blog';

  // Override states for manual presenter interaction
  const [userX, setUserX] = useState<number | null>(null);
  const [userTab, setUserTab] = useState<'slope' | 'area' | null>(null);

  // Reset overrides when presenter advances click steps
  useEffect(() => {
    setUserX(null);
    setUserTab(null);
  }, [currentClick]);

  // Synchronize parameter x for sandbox mode
  const [sandboxX, setSandboxX] = useUrlSyncedState<number>('curve_x_val', 8.0);
  const [activeTab, setActiveTab] = useUrlSyncedState<'slope' | 'area'>('curve_tab_mode', 'slope');

  // Math equations for f(x) = -0.05*x^2 + 0.8*x + 1.0
  const df = (x: number) => -0.1 * x + 0.8;
  const integral = (x: number) => (-0.05 / 3) * Math.pow(x, 3) + 0.4 * x * x + x;

  // Determine slide stage based on currentClick in presentation mode
  // Click 0: Slope tangent at x = 8.0 (flatter, peak)
  // Click 1: Slope tangent at x = 3.0 (steeper, rising)
  // Click 2: Shading area at x = 5.0 (rising)
  // Click 3: Shading area at x = 10.0 (fully integrated)
  // Click 4+: Sandbox mode (free play)
  const isSandbox = isScrollOrBlog || currentClick >= 4;

  let currentX = 8.0;
  let showSlope = true;
  let showArea = false;
  let showShading = false;
  let stageTitle = "Differentiation (Tangents & Slopes)";
  let stageDesc = "Let's inspect how slopes and areas behave along a curve geometrically.";

  if (!isSandbox) {
    if (currentClick === 0) {
      currentX = userX !== null ? userX : 8.0;
      showSlope = userTab !== null ? userTab === 'slope' : true;
      showArea = userTab !== null ? userTab === 'area' : false;
      showShading = userTab !== null ? userTab === 'area' : false;
      stageTitle = "Differentiation: Tangent Slope at Peak (x = 8.0)";
      stageDesc = "The derivative represents the slope of the tangent line. Near the peak (x = 8.0), the curve flattens out, meaning the slope dy/dx approaches zero.";
    } else if (currentClick === 1) {
      currentX = userX !== null ? userX : 3.0;
      showSlope = userTab !== null ? userTab === 'slope' : true;
      showArea = userTab !== null ? userTab === 'area' : false;
      showShading = userTab !== null ? userTab === 'area' : false;
      stageTitle = "Differentiation: Changing Slope (x = 3.0)";
      stageDesc = "Moving left along the curve (x = 3.0), the slope is steeper. This confirms that the derivative dy/dx changes continuously along a non-linear curve.";
    } else if (currentClick === 2) {
      currentX = userX !== null ? userX : 5.0;
      showSlope = userTab !== null ? userTab === 'slope' : false;
      showArea = userTab !== null ? userTab === 'area' : true;
      showShading = userTab !== null ? userTab === 'area' : true;
      stageTitle = "Integration: Defining Area Under the Curve";
      stageDesc = "Integrating a function represents accumulating the physical area bounded between the function's curve and the baseline (x-axis).";
    } else if (currentClick === 3) {
      currentX = userX !== null ? userX : 10.0;
      showSlope = userTab !== null ? userTab === 'slope' : false;
      showArea = userTab !== null ? userTab === 'area' : true;
      showShading = userTab !== null ? userTab === 'area' : true;
      stageTitle = "Integration: Definite Integral Shading";
      stageDesc = "Shading the entire bounded region. The definite integral calculates this net area directly between the limits.";
    }
  } else {
    currentX = userX !== null ? userX : sandboxX;
    const currentTab = userTab !== null ? userTab : activeTab;
    showSlope = currentTab === 'slope';
    showArea = currentTab === 'area';
    showShading = currentTab === 'area';
    stageTitle = currentTab === 'slope' ? "Sandbox Mode: Slope Explorer" : "Sandbox Mode: Area Accumulator";
    stageDesc = "Use the slider to drag coordinate X and observe the derivative and integral values update in real time.";
  }

  const slopeVal = df(currentX);
  const areaVal = integral(currentX);

  const handleSliderChange = (val: number) => {
    setUserX(val);
    if (isSandbox) {
      setSandboxX(val);
    }
  };

  const handleTabToggle = (mode: 'slope' | 'area') => {
    setUserTab(mode);
    if (isSandbox) {
      setActiveTab(mode);
    }
  };

  return (
    <TwoColumnLayout
      title={stageTitle}
      leftWidth="52%"
      leftContent={
        <div className="flex flex-col items-center justify-between h-full space-y-4">
          {/* Registry clicks to control presentation sequence */}
          {!isScrollOrBlog && (
            <>
              <ClickReveal at={1} className="hidden">{' '}</ClickReveal>
              <ClickReveal at={2} className="hidden">{' '}</ClickReveal>
              <ClickReveal at={3} className="hidden">{' '}</ClickReveal>
              <ClickReveal at={4} className="hidden">{' '}</ClickReveal>
            </>
          )}
          <div className="w-full relative h-[210px] bg-muted/10 border border-border/40 rounded-xl flex items-center justify-center p-3">
            <CurveCalculusSandboxDrawing
              currentX={currentX}
              showSlope={showSlope}
              showArea={showArea}
              showShading={showShading}
            />
          </div>

          <div className="w-full p-2.5 bg-indigo-500/[0.02] border border-indigo-500/10 rounded-xl text-[10.5px] leading-normal text-left">
            <span className="font-bold text-indigo-500 block mb-0.5">Calculus Theorem:</span>
            <div className="space-y-1">
              <SlideBullet icon={<span className="text-red-500 font-bold">Slope:</span>}>
                <span>
                  The derivative <LatexFormula math="f'(x) = \\frac{dy}{dx}" /> represents the tangent slope. At the peak, <LatexFormula math="f'(x) = 0" />.
                </span>
              </SlideBullet>
              <SlideBullet icon={<span className="text-orange-500 font-bold">Area:</span>}>
                <span>
                  The definite integral <LatexFormula math="F(x) = \\int_0^x f(t) \\, dt" /> is the cumulative area under the curve.
                </span>
              </SlideBullet>
            </div>
          </div>
        </div>
      }
      rightContent={
        <div className="flex flex-col justify-between h-full space-y-4">
          <div className="space-y-3">
            <SlideParagraph variant="plain" className="text-xs text-muted-foreground leading-normal text-left">
              {stageDesc}
            </SlideParagraph>

            <div className="bg-muted/30 border border-border/40 rounded-xl p-3 space-y-2 text-left">
              <div className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider">Equations</div>
              <div className="flex flex-col gap-1.5 font-mono text-xs text-foreground bg-background/40 p-2.5 rounded-lg border border-border/30">
                <div className="flex justify-between items-center border-b border-border/10 pb-1">
                  <span className="text-muted-foreground text-[10px]">Function:</span>
                  <LatexFormula math="f(x) = -0.05x^2 + 0.8x + 1" />
                </div>
                {showSlope && (
                  <div className="flex justify-between items-center border-b border-border/10 py-1 text-red-500">
                    <span className="text-muted-foreground text-[10px]">Derivative (Slope):</span>
                    <LatexFormula math="f'(x) = -0.1x + 0.8" />
                  </div>
                )}
                {showArea && (
                  <div className="flex justify-between items-center pt-1 text-orange-500">
                    <span className="text-muted-foreground text-[10px]">Integral (Area):</span>
                    <LatexFormula math="\int_0^x f(t) \, dt = -\frac{0.05}{3}x^3 + 0.4x^2 + x" />
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="space-y-4 text-left">
            {/* Interactive controls (always visible) */}
            <div className="bg-muted/40 border border-border/30 rounded-xl p-3 space-y-3 animate-in fade-in duration-300">
              <div className="flex justify-between items-center border-b border-border/20 pb-1.5">
                <span className="text-[9.5px] uppercase font-bold text-muted-foreground tracking-wider">Interactive Controls</span>
                <div className="flex gap-1 bg-background/50 p-0.5 rounded-md border border-border/30">
                  <button
                    onClick={() => handleTabToggle('slope')}
                    className={`px-2 py-0.5 text-[10px] font-bold rounded cursor-pointer ${showSlope ? 'bg-red-500 text-white' : 'text-muted-foreground hover:text-foreground'}`}
                  >
                    Slope
                  </button>
                  <button
                    onClick={() => handleTabToggle('area')}
                    className={`px-2 py-0.5 text-[10px] font-bold rounded cursor-pointer ${showArea ? 'bg-orange-500 text-white' : 'text-muted-foreground hover:text-foreground'}`}
                  >
                    Area
                  </button>
                </div>
              </div>

              <ParameterSlider
                label="Coordinate X Position"
                min={0.0}
                max={10.0}
                step={0.1}
                value={currentX}
                onChange={handleSliderChange}
                unit=""
              />
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2 border-t border-border/30">
              <div className={`p-2.5 rounded-xl border transition-all ${showSlope ? 'bg-red-500/[0.04] border-red-500/35' : 'bg-muted/10 border-border/20 opacity-35'}`}>
                <span className="text-[8px] font-mono text-muted-foreground uppercase tracking-wider block">Slope (dy/dx)</span>
                <div className="text-lg font-black font-mono text-foreground mt-0.5">
                  {slopeVal.toFixed(3)}
                </div>
              </div>

              <div className={`p-2.5 rounded-xl border transition-all ${showArea ? 'bg-orange-500/[0.04] border-orange-500/35' : 'bg-muted/10 border-border/20 opacity-35'}`}>
                <span className="text-[8px] font-mono text-muted-foreground uppercase tracking-wider block">Shaded Area</span>
                <div className="text-lg font-black font-mono text-foreground mt-0.5">
                  {areaVal.toFixed(3)}
                </div>
              </div>
            </div>
          </div>
        </div>
      }
    />
  );
};

export default CurveCalculusSandbox;
