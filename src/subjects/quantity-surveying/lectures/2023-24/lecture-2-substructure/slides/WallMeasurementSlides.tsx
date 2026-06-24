import React, { useState } from 'react';
import { FullWidthLayout } from '@/shared/layouts/FullWidthLayout';
import { TwoColumnLayout } from '@/shared/layouts/TwoColumnLayout';
import { SlideParagraph, InteractiveCard, LatexFormula, SlideGrid } from '@/features/presentation/components/elements';
import { LayoutGrid, GitMerge, Columns, HelpCircle } from 'lucide-react';

/**
 * Slide 1: Methods of Taking Out Quantities
 */
export const Slide1: React.FC = () => {
  const methods = [
    {
      title: '1. Long Wall - Short Wall Method',
      badge: 'Individual Wall Units',
      desc: 'Separate calculations for long walls (out-to-out) and short walls (in-to-in). Highly adaptable to varying designs.',
      icon: <Columns className="w-5 h-5 text-primary" />
    },
    {
      title: '2. Center Line Method',
      badge: 'Continuous Speed',
      desc: 'Sums the entire centerline length of the structure. Extremely fast and accurate for uniform cross-sections.',
      icon: <GitMerge className="w-5 h-5 text-emerald-500" />
    },
    {
      title: '3. Partly Center Line & Cross Wall',
      badge: 'Hybrid Method',
      desc: 'Centerline method for outer boundary walls, combined with Long Wall-Short Wall for inner partition walls.',
      icon: <LayoutGrid className="w-5 h-5 text-amber-500" />
    }
  ];

  return (
    <FullWidthLayout title="Methods of Taking Out Quantities">
      <div className="space-y-4">
        <SlideParagraph variant="plain">
          Quantities of building items such as excavation, concrete foundation bed, and brickwork steps can be estimated from working blueprints using three standardized quantity surveying methods:
        </SlideParagraph>
        <SlideGrid cols={3}>
          {methods.map((m, idx) => (
            <InteractiveCard key={idx} title={m.title} variant="plain" className="p-5 border-border/40 hover:bg-muted/10 transition-colors">
              <div className="flex gap-3 items-start mb-2">
                <div className="mt-0.5">{m.icon}</div>
                <span className="text-[10px] font-mono font-bold text-muted-foreground uppercase">{m.badge}</span>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed mt-2">
                {m.desc}
              </p>
            </InteractiveCard>
          ))}
        </SlideGrid>
      </div>
    </FullWidthLayout>
  );
};

/**
 * Slide 2: Long Wall - Short Wall Method
 */
export const Slide2: React.FC = () => {
  const [activeMode, setActiveMode] = useState<'none' | 'long' | 'short'>('none');

  return (
    <TwoColumnLayout
      title="Long Wall - Short Wall Method"
      leftWidth="45%"
      leftContent={
        <div className="space-y-4 flex flex-col justify-between h-full">
          <InteractiveCard title="Calculation Protocol">
            <p className="text-xs text-muted-foreground leading-relaxed">
              Walls running along the length of a room are treated as Long Walls; perpendicular walls are treated as Short Walls.
            </p>
            <div className="space-y-2 mt-2">
              <button
                type="button"
                onClick={() => setActiveMode('long')}
                className={`w-full p-2.5 rounded-lg border text-left text-xs transition-all ${
                  activeMode === 'long'
                    ? 'bg-primary/10 border-primary text-primary font-bold'
                    : 'bg-muted/20 border-border/40 hover:bg-muted/40 text-foreground'
                }`}
              >
                <div className="font-bold">Long Wall (Out-to-Out)</div>
                <div className="text-[10.5px] text-muted-foreground font-normal mt-0.5">
                  Length = Center Line Length + 2 × (0.5 × Breadth)
                </div>
              </button>
              <button
                type="button"
                onClick={() => setActiveMode('short')}
                className={`w-full p-2.5 rounded-lg border text-left text-xs transition-all ${
                  activeMode === 'short'
                    ? 'bg-emerald-500/10 border-emerald-500 text-emerald-500 font-bold'
                    : 'bg-muted/20 border-border/40 hover:bg-muted/40 text-foreground'
                }`}
              >
                <div className="font-bold">Short Wall (In-to-In)</div>
                <div className="text-[10.5px] text-muted-foreground font-normal mt-0.5">
                  Length = Center Line Length - 2 × (0.5 × Breadth)
                </div>
              </button>
            </div>
          </InteractiveCard>
          <div className="p-3 bg-muted/20 border border-border/40 rounded-xl flex gap-2.5 items-start">
            <HelpCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
            <p className="text-[10.5px] text-muted-foreground leading-relaxed">
              <strong>Key Rule:</strong> Long walls add wall thickness offsets to stretch Out-to-Out, while short walls subtract offsets to fit In-to-In, preventing double-counting of corners.
            </p>
          </div>
        </div>
      }
      rightContent={
        <div className="flex flex-col justify-between h-full bg-muted/20 p-4 border border-border/40 rounded-xl">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Visual Dimension Overlay</span>
            <button
              onClick={() => setActiveMode('none')}
              className="text-[10px] text-muted-foreground hover:text-foreground px-2 py-0.5 border border-border/40 rounded bg-background"
            >
              Reset view
            </button>
          </div>
          
          <div className="h-56 bg-muted/40 rounded-lg border border-border/30 flex items-center justify-center p-2 relative overflow-hidden select-none">
            <svg width="280" height="200" viewBox="0 0 280 200" className="w-full h-full max-h-[190px]">
              {/* Outer wall boundary */}
              <rect x="30" y="30" width="220" height="140" fill="none" stroke="currentColor" strokeWidth="2" className="text-muted-foreground/30" />
              {/* Inner wall boundary (wall thickness = 20) */}
              <rect x="50" y="50" width="180" height="100" fill="none" stroke="currentColor" strokeWidth="2" className="text-muted-foreground/30" />
              
              {/* Centerline */}
              <rect x="40" y="40" width="200" height="120" fill="none" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="4,3" opacity="0.6" />

              {/* Long Walls (Top and Bottom Horizontal) */}
              <rect
                x="30" y="30" width="220" height="20"
                className={`transition-all duration-300 ${
                  activeMode === 'long' ? 'fill-primary/20 stroke-primary stroke-[1.5]' : 'fill-muted/20 stroke-transparent'
                }`}
              />
              <rect
                x="30" y="150" width="220" height="20"
                className={`transition-all duration-300 ${
                  activeMode === 'long' ? 'fill-primary/20 stroke-primary stroke-[1.5]' : 'fill-muted/20 stroke-transparent'
                }`}
              />

              {/* Short Walls (Left and Right Vertical) */}
              <rect
                x="30" y="50" width="20" height="100"
                className={`transition-all duration-300 ${
                  activeMode === 'short' ? 'fill-emerald-500/20 stroke-emerald-500 stroke-[1.5]' : 'fill-muted/20 stroke-transparent'
                }`}
              />
              <rect
                x="230" y="50" width="20" height="100"
                className={`transition-all duration-300 ${
                  activeMode === 'short' ? 'fill-emerald-500/20 stroke-emerald-500 stroke-[1.5]' : 'fill-muted/20 stroke-transparent'
                }`}
              />

              {/* Centerline length labels */}
              <text x="140" y="24" className="fill-muted-foreground text-[10px] text-center" textAnchor="middle">Center Line Length = 2.00m</text>
              <text x="140" y="188" className="fill-muted-foreground text-[10px] text-center" textAnchor="middle">Wall Breadth (B) = 0.30m</text>

              {/* Out-to-Out dimension arrow (Long Wall) */}
              {activeMode === 'long' && (
                <g className="animate-fadeIn">
                  <line x1="30" y1="15" x2="250" y2="15" stroke="var(--primary)" strokeWidth="1.5" />
                  <polygon points="30,15 35,12 35,18" fill="var(--primary)" />
                  <polygon points="250,15 245,12 245,18" fill="var(--primary)" />
                  <text x="140" y="11" className="fill-primary font-mono text-[9px] font-bold text-center" textAnchor="middle">Out-to-Out: L_cl + B = 2.30m</text>
                </g>
              )}

              {/* In-to-In dimension arrow (Short Wall) */}
              {activeMode === 'short' && (
                <g className="animate-fadeIn">
                  <line x1="60" y1="100" x2="60" y2="100" stroke="var(--primary)" /> {/* anchor reference */}
                  <line x1="50" y1="100" x2="230" y2="100" stroke="#10b981" strokeWidth="1.5" />
                  <polygon points="50,100 55,97 55,103" fill="#10b981" />
                  <polygon points="230,100 225,97 225,103" fill="#10b981" />
                  <text x="140" y="93" className="fill-emerald-500 font-mono text-[9px] font-bold text-center" textAnchor="middle">In-to-In: L_cl - B = 1.70m</text>
                </g>
              )}
            </svg>
          </div>
          <div className="p-2.5 bg-muted/40 rounded border border-border/40 text-center font-mono text-[10px]">
            {activeMode === 'none' && <span className="text-muted-foreground">Select a protocol on the left to see the dimensions.</span>}
            {activeMode === 'long' && <span className="text-primary font-bold">Long Wall Out-to-Out includes both corner junctions.</span>}
            {activeMode === 'short' && <span className="text-emerald-500 font-bold">Short Wall In-to-In excludes corners (already measured).</span>}
          </div>
        </div>
      }
    />
  );
};

/**
 * Slide 3: The Center Line Method & Junctions
 */
export const Slide3: React.FC = () => {
  return (
    <TwoColumnLayout
      title="The Center Line Method & Junctions"
      leftWidth="50%"
      leftContent={
        <div className="space-y-4">
          <InteractiveCard title="The Centerline Principle">
            <p className="text-xs text-muted-foreground leading-relaxed">
              Suitable for structures with uniform wall widths. The total centerline length of all walls is calculated and multiplied by the wall breadth and depth.
            </p>
            <div className="mt-3 p-3 bg-muted/40 rounded-lg border border-border/40 font-mono text-center">
              <span className="text-xs text-muted-foreground">Volume = </span>
              <span className="text-primary font-black text-xs">Total L_cl &times; Breadth &times; Depth</span>
            </div>
          </InteractiveCard>
          
          <InteractiveCard title="The T-Junction Correction Law">
            <p className="text-xs text-muted-foreground leading-relaxed">
              When cross walls or partition walls intersect a main wall, they create a T-junction. To prevent double-counting of the intersection volume:
            </p>
            <div className="p-2.5 bg-destructive/5 border-l-4 border-destructive text-destructive text-[11px] font-semibold mt-2">
              Deduct 0.5 &times; Breadth (B) from centerline length for each T-Junction.
            </div>
          </InteractiveCard>
        </div>
      }
      rightContent={
        <div className="flex flex-col justify-between h-full bg-muted/20 p-4 border border-border/40 rounded-xl space-y-4">
          <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Junction Balancing Logic</h3>
          
          <div className="relative h-44 bg-muted/40 rounded-lg border border-border/30 flex items-center justify-center p-2">
            <svg width="220" height="150" viewBox="0 0 220 150" className="w-full h-full max-h-[140px]">
              {/* Outer boundary T-Junction */}
              <path d="M 20 40 L 200 40 L 200 60 L 120 60 L 120 130 L 100 130 L 100 60 L 20 60 Z" fill="none" stroke="currentColor" strokeWidth="2" className="text-muted-foreground/30" />
              
              {/* Centerlines */}
              <line x1="20" y1="50" x2="200" y2="50" stroke="#f59e0b" strokeWidth="2" strokeDasharray="4,3" />
              <line x1="110" y1="50" x2="110" y2="130" stroke="#f59e0b" strokeWidth="2" strokeDasharray="4,3" />
              
              {/* Double counted overlap block (size 20x10, from y=50 to y=60, x=100 to x=120) */}
              <rect x="100" y="50" width="20" height="10" fill="var(--destructive)" fillOpacity="0.3" stroke="var(--destructive)" strokeWidth="1" />
              
              <text x="60" y="32" className="fill-muted-foreground text-[9px]" fontWeight="bold">Main Wall</text>
              <text x="110" y="142" className="fill-muted-foreground text-[9px]" textAnchor="middle" fontWeight="bold">Cross Wall</text>
              <text x="110" y="75" className="fill-destructive text-[8.5px] font-bold" textAnchor="middle">Double Counted Area</text>
              <text x="110" y="85" className="fill-destructive text-[8.5px] font-mono" textAnchor="middle">(-0.5 &times; B)</text>
            </svg>
          </div>

          <div className="p-3 bg-muted/40 rounded border border-border/40 text-xs leading-relaxed text-muted-foreground">
            <strong>Geometric Proof:</strong> The centerline of the cross wall is measured up to the center of the main wall, overlapping by exactly half the width of the main wall (<LatexFormula math="0.5 \times B" />).
          </div>
        </div>
      }
    />
  );
};

/**
 * Slide 4: Partly Center Line and Partly Cross Wall Method
 */
export const Slide4: React.FC = () => {
  const [highlightPart, setHighlightPart] = useState<'none' | 'outer' | 'inner'>('none');

  return (
    <TwoColumnLayout
      title="Partly Center Line & Cross Wall"
      leftWidth="45%"
      leftContent={
        <div className="space-y-4 flex flex-col justify-between h-full">
          <InteractiveCard title="Hybrid Measurement Strategy">
            <p className="text-xs text-muted-foreground leading-relaxed">
              Adopted for structures with varying wall thicknesses, such as a thick external brick envelope enclosing thin partition walls.
            </p>
            <div className="space-y-2 mt-2">
              <button
                type="button"
                onClick={() => setHighlightPart('outer')}
                className={`w-full p-2.5 rounded-lg border text-left text-xs transition-all ${
                  highlightPart === 'outer'
                    ? 'bg-emerald-500/10 border-emerald-500 text-emerald-500 font-bold'
                    : 'bg-muted/20 border-border/40 hover:bg-muted/40 text-foreground'
                }`}
              >
                <div className="font-bold">1. External Envelope (Center Line)</div>
                <div className="text-[10.5px] text-muted-foreground font-normal mt-0.5">
                  Measure the thick outer wall envelope continuously using its own centerline.
                </div>
              </button>
              <button
                type="button"
                onClick={() => setHighlightPart('inner')}
                className={`w-full p-2.5 rounded-lg border text-left text-xs transition-all ${
                  highlightPart === 'inner'
                    ? 'bg-primary/10 border-primary text-primary font-bold'
                    : 'bg-muted/20 border-border/40 hover:bg-muted/40 text-foreground'
                }`}
              >
                <div className="font-bold">2. Internal Walls (Long/Short Wall)</div>
                <div className="text-[10.5px] text-muted-foreground font-normal mt-0.5">
                  Calculate thinner internal partition walls individually using In-to-In length offsets.
                </div>
              </button>
            </div>
          </InteractiveCard>

          <div className="p-3 bg-muted/20 border border-border/40 rounded-xl flex gap-2 items-start">
            <HelpCircle className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
            <p className="text-[10.5px] text-muted-foreground leading-relaxed">
              <strong>Professional Tip:</strong> Because modern architectural plans utilize diverse wall depths, this hybrid approach is widely practiced in public works departments.
            </p>
          </div>
        </div>
      }
      rightContent={
        <div className="flex flex-col justify-between h-full bg-muted/20 p-4 border border-border/40 rounded-xl">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Multi-thickness Blueprint</span>
            <button
              onClick={() => setHighlightPart('none')}
              className="text-[10px] text-muted-foreground hover:text-foreground px-2 py-0.5 border border-border/40 rounded bg-background"
            >
              Reset view
            </button>
          </div>

          <div className="h-56 bg-muted/40 rounded-lg border border-border/30 flex items-center justify-center p-2 relative overflow-hidden select-none">
            <svg width="240" height="180" viewBox="0 0 240 180" className="w-full h-full max-h-[170px]">
              {/* Outer Envelope Wall (Thick, thickness=16) */}
              <rect x="30" y="30" width="180" height="120" fill="none" stroke="currentColor" strokeWidth="16" 
                className={`transition-colors duration-300 ${highlightPart === 'outer' ? 'text-emerald-500/20' : 'text-muted-foreground/10'}`} 
              />
              <rect x="30" y="30" width="180" height="120" fill="none" stroke="currentColor" strokeWidth="2" className="text-muted-foreground/30" />
              <rect x="38" y="38" width="164" height="104" fill="none" stroke="currentColor" strokeWidth="2" className="text-muted-foreground/30" />

              {/* Internal Wall (Thin, thickness=8) */}
              <line x1="120" y1="38" x2="120" y2="142" stroke="currentColor" strokeWidth="8"
                className={`transition-colors duration-300 ${highlightPart === 'inner' ? 'text-primary/30' : 'text-muted-foreground/10'}`} 
              />
              <line x1="116" y1="38" x2="116" y2="142" stroke="currentColor" strokeWidth="2" className="text-muted-foreground/30" />
              <line x1="124" y1="38" x2="124" y2="142" stroke="currentColor" strokeWidth="2" className="text-muted-foreground/30" />

              {/* Labels */}
              <text x="55" y="65" className="fill-muted-foreground text-[8px]" fontWeight="bold">Outer envelope: 250mm</text>
              <text x="135" y="90" className="fill-muted-foreground text-[8px]" fontWeight="bold">Internal: 125mm</text>

              {/* Highlights */}
              {highlightPart === 'outer' && (
                <rect x="34" y="34" width="172" height="112" fill="none" stroke="#10b981" strokeWidth="2" strokeDasharray="4,2" className="animate-pulse" />
              )}
              {highlightPart === 'inner' && (
                <line x1="120" y1="38" x2="120" y2="142" stroke="var(--primary)" strokeWidth="2" strokeDasharray="4,2" className="animate-pulse" />
              )}
            </svg>
          </div>

          <div className="p-2.5 bg-muted/40 rounded border border-border/40 text-center font-mono text-[10px]">
            {highlightPart === 'none' && <span className="text-muted-foreground">Select a method on the left to see highlights.</span>}
            {highlightPart === 'outer' && <span className="text-emerald-500 font-bold">Thick outer wall is evaluated continuously as a centerline loop.</span>}
            {highlightPart === 'inner' && <span className="text-primary font-bold">Thin inner cross wall calculated in-between outer boundaries.</span>}
          </div>
        </div>
      }
    />
  );
};
