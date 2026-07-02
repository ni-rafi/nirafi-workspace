import { SlideParagraph, LatexFormula, SlideList } from '@/features/presentation/components/elements';
import { ExpandableDrawing } from '@/shared/components';
import TwoColumnLayout from '@/shared/layouts/TwoColumnLayout';

export const HandBendingSlide: React.FC = () => {
  return (
    <TwoColumnLayout
      title="Hand Bending Demonstration"
      leftWidth="50%"
      leftContent={
        <div className="flex flex-col justify-between h-full gap-4 text-left select-text">
          <SlideList
            title="Tactile Intuition"
            description="Think about bending a dry wooden stick or raw spaghetti in your hands. As you force the ends together, what physically happens?"
            revealMode="each-click"
            items={[
              { text: "The top face compresses, forcing material cells closer together.", revealAt: 1 },
              { text: "The bottom face stretches, pulling fibers apart until a crack snaps open.", revealAt: 2 },
              { text: "Bending creates a dual stress profile: Compression on one side, Tension on the other.", revealAt: 3 },
            ]}
          />
          <SlideParagraph variant="info" className="text-[10px] my-1">
            <strong>Try it:</strong> The sensation of resistance increases as bending curvature increases, showing stress magnitude correlates with bending depth.
          </SlideParagraph>
        </div>
      }
      rightContent={
        <div className="bg-muted/30 border border-border/50 rounded-xl p-5 flex flex-col items-center justify-center h-full min-h-[260px]">
          {/* Hands bending illustration */}
          <ExpandableDrawing title="Hands Bending Demonstration Diagram" description="Demonstrates tension and compression stresses generated under moment couples at opposite faces of a bent stick.">
            <svg viewBox="0 0 300 150" className="w-[200px] h-[100px] overflow-visible">
              {/* Bent element */}
              <path d="M 50 100 Q 150 40 250 100" fill="none" stroke="var(--foreground)" strokeWidth={4} strokeLinecap="round" />

              {/* Rotational Arrows representing Hands Moment */}
              <path d="M 55 105 A 15 15 0 0 1 35 90" fill="none" stroke="var(--primary)" strokeWidth={2} markerEnd="url(#arrow)" />
              <path d="M 245 105 A 15 15 0 0 0 265 90" fill="none" stroke="var(--primary)" strokeWidth={2} markerEnd="url(#arrow)" />

              {/* Markers */}
              <defs>
                <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                  <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--primary)" />
                </marker>
              </defs>

              <text x={150} y={45} textAnchor="middle" className="fill-red-500 text-[10px] font-bold">Compression (Top Face)</text>
              <text x={150} y={120} textAnchor="middle" className="fill-emerald-500 text-[10px] font-bold">Tension (Bottom Face)</text>
              <text x={50} y={135} textAnchor="middle" className="fill-muted-foreground text-[8px] font-bold font-mono">Moment (<LatexFormula math="M" />)</text>
              <text x={250} y={135} textAnchor="middle" className="fill-muted-foreground text-[8px] font-bold font-mono">Moment (<LatexFormula math="M" />)</text>
            </svg>
          </ExpandableDrawing>
        </div>
      }
    />
  );
};

export default HandBendingSlide;
