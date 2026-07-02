import React from 'react';
import { type ClickSyncedTabItem } from '@/features/presentation/components/elements/ClickSyncedTabs';
import { LatexFormula, InteractiveCard, SlideParagraph } from '@/features/presentation/components/elements';
import { ExpandableDrawing } from '@/shared/components';

export const CompoundSectionVisualizer: React.FC<{ click: number }> = ({ click }) => {
  const topFlangeY = 40;  // y = 40 to 90
  const webY = 90;        // y = 90 to 290
  const botFlangeY = 290; // y = 290 to 340

  const topFlangeW = 100;
  const webW = 50;
  const botFlangeW = 200;

  // Tab indices based on click:
  // Tab 0: clicks 0, 1, 2
  // Tab 1: clicks 3, 4, 5
  // Tab 2: clicks 6, 7
  // Tab 3: clicks 8, 9, 10
  // Tab 4: clicks 11, 12, 13

  const isSeparated = click >= 1;
  const showCentroids = click >= 3;
  const showNA = click >= 7;
  const showOffsets = click >= 8;

  return (
    <ExpandableDrawing title="Component Centroids & Neutral Axis" description="Highlights structural subdivisions, centroid locations, Neutral Axis position, and parallel axis transfer offsets.">
      <svg viewBox="0 0 240 380" className="h-[250px] w-[190px] overflow-visible">
        {/* Baseline (always present from click 3 onwards) */}
        {click >= 3 && (
          <g className="animate-in fade-in duration-300">
            <line x1={10} y1={360} x2={230} y2={360} stroke="var(--muted-foreground)" strokeWidth={1.5} />
            <text x={230} y={375} textAnchor="end" className="fill-muted-foreground text-[11px] font-mono font-bold">Baseline (y = 0)</text>
          </g>
        )}

        {/* Top Flange (1) */}
        <g style={{ transform: `translateY(${isSeparated ? -25 : 0}px)`, transition: 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)' }}>
          <rect
            x={120 - topFlangeW / 2}
            y={topFlangeY}
            width={topFlangeW}
            height={50}
            fill={click === 1 || click === 2 ? 'rgba(99, 102, 241, 0.25)' : 'rgba(99, 102, 241, 0.05)'}
            stroke={click >= 0 ? 'var(--foreground)' : 'var(--border)'}
            strokeWidth={2}
          />
          <text x={120} y={topFlangeY + 30} textAnchor="middle" className="fill-foreground text-[12px] font-bold">1</text>
          {showCentroids && (
            <circle cx={120} cy={topFlangeY + 25} r={5} className="fill-indigo-500 animate-pulse" />
          )}
          {/* Local Centroid Label for part 1 */}
          {click === 4 && (
            <text x={130} y={topFlangeY + 29} className="fill-indigo-500 text-[11px] font-bold animate-in fade-in">c₁</text>
          )}
        </g>

        {/* Web (2) */}
        <g>
          <rect
            x={120 - webW / 2}
            y={webY}
            width={webW}
            height={200}
            fill={click === 1 || click === 2 ? 'rgba(245, 158, 11, 0.2)' : 'rgba(99, 102, 241, 0.05)'}
            stroke={click >= 0 ? 'var(--foreground)' : 'var(--border)'}
            strokeWidth={2}
          />
          <text x={120} y={webY + 105} textAnchor="middle" className="fill-foreground text-[12px] font-bold">2</text>
          {showCentroids && (
            <circle cx={120} cy={webY + 100} r={5} className="fill-amber-500 animate-pulse" />
          )}
          {/* Local Centroid Label for part 2 */}
          {click === 4 && (
            <text x={130} y={webY + 104} className="fill-amber-500 text-[11px] font-bold animate-in fade-in">c₂</text>
          )}
        </g>

        {/* Bottom Flange (3) */}
        <g style={{ transform: `translateY(${isSeparated ? 25 : 0}px)`, transition: 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)' }}>
          <rect
            x={120 - botFlangeW / 2}
            y={botFlangeY}
            width={botFlangeW}
            height={50}
            fill={click === 1 || click === 2 ? 'rgba(16, 185, 129, 0.25)' : 'rgba(99, 102, 241, 0.05)'}
            stroke={click >= 0 ? 'var(--foreground)' : 'var(--border)'}
            strokeWidth={2}
          />
          <text x={120} y={botFlangeY + 30} textAnchor="middle" className="fill-foreground text-[12px] font-bold">3</text>
          {showCentroids && (
            <circle cx={120} cy={botFlangeY + 25} r={5} className="fill-emerald-500 animate-pulse" />
          )}
          {/* Local Centroid Label for part 3 */}
          {click === 4 && (
            <text x={130} y={botFlangeY + 29} className="fill-emerald-500 text-[11px] font-bold animate-in fade-in">c₃</text>
          )}
        </g>

        {/* Global Neutral Axis */}
        {showNA && (
          <g className="animate-in slide-in-from-left duration-500">
            <line x1={5} y1={360 - 125} x2={235} y2={360 - 125} stroke="var(--destructive)" strokeWidth={2.2} strokeDasharray="6,3" />
            <text x={235} y={360 - 132} textAnchor="end" className="fill-destructive text-[11px] font-mono font-bold">N.A. (y = 125 mm)</text>
          </g>
        )}

        {/* Centroid Dimensions (y_i) */}
        {click === 5 && (
          <g stroke="var(--muted-foreground)" strokeWidth={1} className="animate-in fade-in duration-300">
            {/* y3 = 25 + 25 = 50 from baseline */}
            <line x1={20} y1={360} x2={20} y2={360 - 50} />
            <text x={25} y={360 - 25} className="fill-muted-foreground text-[11px] font-mono font-bold">y₃=25</text>
            {/* y2 = 190 from baseline */}
            <line x1={40} y1={360} x2={40} y2={360 - 190} />
            <text x={45} y={360 - 110} className="fill-muted-foreground text-[11px] font-mono font-bold">y₂=150</text>
            {/* y1 = 340 from baseline */}
            <line x1={60} y1={360} x2={60} y2={360 - 340} />
            <text x={65} y={360 - 240} className="fill-muted-foreground text-[11px] font-mono font-bold">y₁=275</text>
          </g>
        )}

        {/* Offsets (d_i) */}
        {showOffsets && (
          <g stroke="var(--primary)" strokeWidth={1.5} className="animate-in fade-in duration-300">
            {/* d1: NA to centroid 1 */}
            {click >= 8 && (
              <g>
                <path d={`M 170 ${360 - 125} L 170 ${360 - 340}`} strokeDasharray="3,3" />
                <circle cx={170} cy={360 - 125} r={2.5} fill="var(--primary)" />
                <circle cx={170} cy={360 - 340} r={2.5} fill="var(--primary)" />
                <text x={178} y={360 - 220} className="fill-primary text-[11px] font-bold">d₁ = 150</text>
              </g>
            )}
            
            {/* d2: NA to centroid 2 */}
            {click >= 9 && (
              <g>
                <path d={`M 15 ${360 - 125} L 15 ${360 - 190}`} strokeDasharray="3,3" />
                <circle cx={15} cy={360 - 125} r={2.5} fill="var(--primary)" />
                <circle cx={15} cy={360 - 190} r={2.5} fill="var(--primary)" />
                <text x={22} y={360 - 150} className="fill-primary text-[11px] font-bold">d₂ = 25</text>
              </g>
            )}

            {/* d3: NA to centroid 3 */}
            {click >= 10 && (
              <g>
                <path d={`M 170 ${360 - 125} L 170 ${360 - 50}`} strokeDasharray="3,3" />
                <circle cx={170} cy={360 - 50} r={2.5} fill="var(--primary)" />
                <text x={178} y={360 - 85} className="fill-primary text-[11px] font-bold">d₃ = 100</text>
              </g>
            )}
          </g>
        )}
      </svg>
    </ExpandableDrawing>
  );
};

export const getCompoundSectionSolverItems = (currentClick: number): ClickSyncedTabItem[] => [
  {
    title: '1. Subdivision',
    badge: 'Step 1',
    badgeVariant: 'primary',
    description: 'Divide the asymmetric section into 3 clean rectangular components: Top Flange (1), Web (2), and Bottom Flange (3).',
    rightVisualizer: <CompoundSectionVisualizer click={currentClick} />,
    rightContent: (
      <div className="mt-3 space-y-3 bg-muted/10 p-3.5 rounded-xl border border-border/40 text-xs">
        <p className="font-bold text-foreground">Subdivision Areas:</p>
        <ul className="list-disc pl-4 space-y-1.5 text-muted-foreground text-[11px]">
          <li>Top Flange (<LatexFormula math="A_1" />): <LatexFormula math="100 \times 50 = 5,000\text{ mm}^2" /></li>
          <li>Web Segment (<LatexFormula math="A_2" />): <LatexFormula math="50 \times 200 = 10,000\text{ mm}^2" /></li>
          <li>Bottom Flange (<LatexFormula math="A_3" />): <LatexFormula math="200 \times 50 = 10,000\text{ mm}^2" /></li>
        </ul>
        {currentClick >= 2 && (
          <div className="mt-2 py-1.5 text-center bg-indigo-500/10 border border-indigo-500/20 text-indigo-500 rounded font-bold animate-in fade-in duration-300">
            <LatexFormula math="A_{\text{total}} = 25,000\text{ mm}^2" />
          </div>
        )}
      </div>
    ),
    leftBottomContent: (
      <div className="space-y-2">
        <SlideParagraph variant="plain" className="text-[11px] text-muted-foreground leading-normal">
          First, decompose the asymmetric profile. Click next to animate the physical separation of the flanged component shapes.
        </SlideParagraph>
      </div>
    )
  },
  {
    title: '2. Local Centroids',
    badge: 'Step 2',
    badgeVariant: 'warning',
    description: 'Determine the local centroid height (y_i) of each subdivided segment from the section base.',
    rightVisualizer: <CompoundSectionVisualizer click={currentClick} />,
    rightContent: (
      <div className="mt-3 space-y-3 bg-muted/10 p-3.5 rounded-xl border border-border/40 text-xs">
        <p className="font-bold text-foreground">Centroid Heights (from bottom baseline):</p>
        <ul className="list-disc pl-4 space-y-1.5 text-muted-foreground text-[11px]">
          <li>Top Flange (<LatexFormula math="y_1" />): <LatexFormula math="250 + 25 = 275\text{ mm}" /></li>
          <li>Web Segment (<LatexFormula math="y_2" />): <LatexFormula math="50 + 100 = 150\text{ mm}" /></li>
          <li>Bottom Flange (<LatexFormula math="y_3" />): <LatexFormula math="25\text{ mm}" /></li>
        </ul>
      </div>
    ),
    leftBottomContent: (
      <div className="space-y-2">
        <SlideParagraph variant="plain" className="text-[11px] text-muted-foreground leading-normal">
          Establish the local centroid of each rectangle with reference to the bottom baseline.
        </SlideParagraph>
      </div>
    )
  },
  {
    title: '3. Neutral Axis (y_bar)',
    badge: 'Step 3',
    badgeVariant: 'error',
    description: 'Locate the global neutral axis by taking the first moment of area of the combined layout.',
    rightVisualizer: <CompoundSectionVisualizer click={currentClick} />,
    rightContent: (
      <div className="mt-3 space-y-3 bg-muted/10 p-3.5 rounded-xl border border-border/40 text-xs">
        <p className="font-bold text-foreground">Global Centroid Calculation:</p>
        <div className="my-1.5 py-1.5 text-center bg-muted/30 border border-border/40 rounded font-mono">
          y_bar = Σ(A_i · y_i) / ΣA_i
        </div>
        {currentClick >= 7 && (
          <div className="mt-2 py-1.5 text-center bg-indigo-500/10 border border-indigo-500/20 text-indigo-500 rounded font-bold animate-in fade-in duration-300 text-sm">
            <LatexFormula math="\bar{y} = \frac{5\text{k}\cdot 275 + 10\text{k}\cdot 150 + 10\text{k}\cdot 25}{25\text{k}} = 125\text{ mm}" />
          </div>
        )}
      </div>
    ),
    leftBottomContent: (
      <div className="space-y-3">
        <InteractiveCard title="Axis Symmetrical Check">
          <p className="text-[10px] text-muted-foreground font-mono leading-normal">
            Due to the heavier bottom flange, the neutral axis shifts downward to 125mm (below the 150mm mid-height).
          </p>
        </InteractiveCard>
      </div>
    )
  },
  {
    title: '4. Parallel Axis Offsets',
    badge: 'Step 4',
    badgeVariant: 'info',
    description: 'Evaluate the parallel axis distance offsets (d_i) from each component centroid to the global Neutral Axis.',
    rightVisualizer: <CompoundSectionVisualizer click={currentClick} />,
    rightContent: (
      <div className="mt-3 space-y-3 bg-muted/10 p-3.5 rounded-xl border border-border/40 text-xs animate-in fade-in duration-300">
        <p className="font-bold text-foreground">Parallel Axis Distance Offsets:</p>
        <div className="my-1 py-1 text-center bg-muted/30 border border-border/40 rounded font-mono">
          d_i = |y_bar - y_i|
        </div>
        <ul className="list-disc pl-4 space-y-1 text-muted-foreground text-[11px]">
          {currentClick >= 8 && <li>Top Flange (<LatexFormula math="d_1" />): <LatexFormula math="|125 - 275| = 150\text{ mm" /></li>}
          {currentClick >= 9 && <li>Web Segment (<LatexFormula math="d_2" />): <LatexFormula math="|125 - 150| = 25\text{ mm" /></li>}
          {currentClick >= 10 && <li>Bottom Flange (<LatexFormula math="d_3" />): <LatexFormula math="|125 - 25| = 100\text{ mm" /></li>}
        </ul>
      </div>
    ),
    leftBottomContent: (
      <div className="space-y-2">
        <SlideParagraph variant="plain" className="text-[11px] text-muted-foreground leading-normal">
          Find the transfer distance from each component's local axis to the newly established Neutral Axis.
        </SlideParagraph>
      </div>
    )
  },
  {
    title: '5. Inertia Assembly',
    badge: 'Step 5',
    badgeVariant: 'success',
    description: 'Apply the Parallel Axis Theorem across all three subdivided shapes to assemble the global inertia I_xx.',
    rightVisualizer: <CompoundSectionVisualizer click={currentClick} />,
    rightContent: (
      <div className="mt-3 space-y-3 bg-muted/10 p-3.5 rounded-xl border border-border/40 text-xs animate-in fade-in duration-300">
        <p className="font-bold text-foreground">Parallel Axis Theorem Formula:</p>
        <div className="my-1 py-1 text-center bg-muted/30 border border-border/40 rounded font-mono">
          I_xx = Σ(I_c + A·d²)
        </div>
        {currentClick >= 12 && (
          <ul className="list-disc pl-4 space-y-1 text-muted-foreground text-[10px] font-mono">
            <li>Top: <LatexFormula math="1.04\text{M} + 5\text{k}\cdot 150^2 = 113.54 \times 10^6\text{ mm}^4" /></li>
            <li>Web: <LatexFormula math="33.33\text{M} + 10\text{k}\cdot 25^2 = 39.58 \times 10^6\text{ mm}^4" /></li>
            <li>Bottom: <LatexFormula math="2.08\text{M} + 10\text{k}\cdot 100^2 = 102.08 \times 10^6\text{ mm}^4" /></li>
          </ul>
        )}
        {currentClick >= 13 && (
          <div className="mt-2 py-1.5 text-center bg-indigo-500/10 border border-indigo-500/20 text-indigo-500 rounded font-bold text-sm">
            <LatexFormula math="I_{xx} = 255.20 \times 10^6\text{ mm}^4" />
          </div>
        )}
      </div>
    ),
    leftBottomContent: (
      <div className="space-y-2">
        <SlideParagraph variant="plain" className="text-[11px] text-muted-foreground leading-normal">
          Sum up the centroidal inertia and transfer components of all three sections.
        </SlideParagraph>
      </div>
    )
  }
];
