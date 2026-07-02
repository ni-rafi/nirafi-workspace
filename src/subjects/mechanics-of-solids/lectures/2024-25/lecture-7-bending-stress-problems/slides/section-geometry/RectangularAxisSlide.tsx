import { SlideParagraph, SlideBullet, SlideEquation, LatexFormula, ClickReveal } from '@/features/presentation/components/elements';
import { ExpandableDrawing } from '@/shared/components';
import { Ruler } from 'lucide-react';
import TwoColumnLayout from '@/shared/layouts/TwoColumnLayout';

export const RectangularAxisSlide: React.FC = () => {
  return (
    <TwoColumnLayout
      title="Standard Rectangular Axis Inertia"
      leftWidth="55%"
      leftContent={
        <div className="flex flex-col h-full justify-between gap-4 text-left select-text">
          <div>
            <div className="flex items-center space-x-1.5 text-indigo-500 font-bold text-[10px] uppercase mb-1">
              <Ruler className="h-4.5 w-4.5" />
              <span>Symmetric Section Properties</span>
            </div>
            <SlideParagraph variant="plain" className="text-xs text-muted-foreground leading-relaxed">
              {"For a solid rectangular cross-section of width "}
              <LatexFormula math="b" />
              {" and depth "}
              <LatexFormula math="h" />
              {", the area moment of inertia depends strongly on which axis the section bends about."}
            </SlideParagraph>
          </div>
          <div className="space-y-2 my-2">
            <SlideBullet text={<span>Horizontal Centroidal Axis (<LatexFormula math="x-x" />): Base is <LatexFormula math="b" />, height is <LatexFormula math="h" />. Cubing <LatexFormula math="h" /> makes depth the dominant factor in bending stiffness.</span>} revealAt={1} />
            <SlideBullet text={<span>Vertical Centroidal Axis (<LatexFormula math="y-y" />): Base is <LatexFormula math="h" />, height is <LatexFormula math="b" />. Cubing <LatexFormula math="b" /> makes width the dominant factor.</span>} revealAt={2} />
          </div>
          <div className="space-y-2.5 text-left">
            <ClickReveal at={3} preset="fade">
              <SlideEquation math="I_{xx} = \frac{b \cdot h^3}{12}" />
            </ClickReveal>
            <ClickReveal at={4} preset="fade">
              <SlideEquation math="I_{yy} = \frac{h \cdot b^3}{12}" />
            </ClickReveal>
          </div>
        </div>
      }
      rightContent={
        <div className="bg-muted/30 border border-border/50 rounded-xl p-4 flex flex-col items-center justify-center h-full min-h-[250px] w-full">
          <ExpandableDrawing title="Rectangular Centroidal Axes" description="Standard rectangular cross-section displaying the centroidal axes x-x and y-y and corresponding width b and depth h dimensions.">
            <svg viewBox="0 0 160 160" className="w-[125px] h-[125px] overflow-visible">
              {/* Draw Rectangle */}
              <rect x={40} y={30} width={80} height={100} fill="rgba(99, 102, 241, 0.08)" stroke="var(--foreground)" strokeWidth={1.5} />

              {/* Centroidal Axes */}
              {/* Horizontal Axis x-x */}
              <line x1={20} y1={80} x2={140} y2={80} stroke="var(--destructive)" strokeWidth={1.5} strokeDasharray="3,1" />
              <text x={145} y={83} className="fill-destructive text-[9px] font-bold">x</text>
              <text x={10} y={83} className="fill-destructive text-[9px] font-bold">x</text>

              {/* Vertical Axis y-y */}
              <line x1={80} y1={10} x2={80} y2={150} stroke="var(--primary)" strokeWidth={1} strokeDasharray="3,1" opacity={0.6} />
              <text x={78} y={8} className="fill-primary text-[9px] font-bold">y</text>
              <text x={78} y={158} className="fill-primary text-[9px] font-bold">y</text>

              {/* Dimension b */}
              <line x1={40} y1={140} x2={120} y2={140} stroke="var(--muted-foreground)" strokeWidth={0.8} />
              <text x={80} y={150} textAnchor="middle" className="fill-muted-foreground text-[8px] font-bold">b</text>

              {/* Dimension h */}
              <line x1={25} y1={30} x2={25} y2={130} stroke="var(--muted-foreground)" strokeWidth={0.8} />
              <text x={16} y={83} textAnchor="middle" className="fill-muted-foreground text-[8px] font-bold">h</text>
            </svg>
          </ExpandableDrawing>
        </div>
      }
    />
  );
};

export default RectangularAxisSlide;
