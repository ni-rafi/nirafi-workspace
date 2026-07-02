import { SlideParagraph, SlideList } from '@/features/presentation/components/elements';
import { ExpandableDrawing } from '@/shared/components';
import TwoColumnLayout from '@/shared/layouts/TwoColumnLayout';

export const PhysicalFailureSlide: React.FC = () => {
  return (
    <TwoColumnLayout
      title="Physical Failure in Bending (Wood Beams)"
      leftWidth="50%"
      leftContent={
        <div className="flex flex-col justify-between h-full gap-4 text-left select-text">
          <SlideList
            title="Real-World Failure Mechanics"
            description="When structural members like wood beams undergo extreme bending loads, they fail due to internal stresses exceeding their material capacities."
            revealMode="each-click"
            items={[
              { text: "Distinct split fracturing appears at the center zone of maximum bending moment.", revealAt: 1 },
              { text: "Fibers at the outer boundary layers rip apart or splinter open first.", revealAt: 2 },
              { text: "Failure highlights that stresses vary across the depth of the section.", revealAt: 3 },
            ]}
          />
          <SlideParagraph variant="warning" className="text-[10px] my-1">
            <strong>Physical Evidence:</strong> Structural materials do not experience uniform stresses under bending, unlike simple axial loads.
          </SlideParagraph>
        </div>
      }
      rightContent={
        <div className="bg-muted/30 border border-border/50 rounded-xl p-5 flex flex-col items-center justify-center h-full min-h-[260px]">
          {/* Visual sketch of wood grain failure */}
          <ExpandableDrawing title="Wood Beam Bending Failure Diagram" description="Shows bottom fiber splintering and split fractures emerging under tension stress in wood members.">
            <svg viewBox="0 0 300 150" className="w-[200px] h-[100px] overflow-visible">
              <g className="stroke-muted-foreground fill-none" strokeWidth={1.5}>
                {/* Beam body */}
                <path d="M 20 60 L 280 60 L 280 90 L 20 90 Z" />
                {/* Wood grains */}
                <line x1={20} y1={68} x2={280} y2={68} strokeDasharray="15, 5, 25, 10" />
                <line x1={20} y1={75} x2={280} y2={75} strokeDasharray="40, 10, 10, 5" stroke="var(--destructive)" />
                <line x1={20} y1={82} x2={280} y2={82} strokeDasharray="5, 15, 20, 5" />

                {/* Fracture cracks at bottom middle */}
                <path d="M 150 90 L 148 82 L 152 75 L 147 68" stroke="var(--destructive)" strokeWidth={2} />
                <path d="M 140 90 L 138 85 L 141 80" stroke="var(--destructive)" strokeWidth={1.5} />
                <path d="M 160 90 L 159 84 L 162 78" stroke="var(--destructive)" strokeWidth={1.5} />

                {/* Splintering arrows */}
                <path d="M 125 98 L 105 98 L 110 94" stroke="#10b981" strokeWidth={1} />
                <path d="M 175 98 L 195 98 L 190 94" stroke="#10b981" strokeWidth={1} />
              </g>
              {/* Labels */}
              <text x={150} y={50} textAnchor="middle" className="fill-muted-foreground text-[10px] font-bold">Wood Grain Splintering (Tension)</text>
              <text x={150} y={115} textAnchor="middle" className="fill-emerald-500 text-[10px] font-bold">Bottom Fibers Pull Apart</text>
            </svg>
          </ExpandableDrawing>
        </div>
      }
    />
  );
};

export default PhysicalFailureSlide;
