import { SlideParagraph, SlideBullet, LatexFormula } from '@/features/presentation/components/elements';
import { ExpandableDrawing } from '@/shared/components';
import { HelpCircle } from 'lucide-react';
import TwoColumnLayout from '@/shared/layouts/TwoColumnLayout';

export const Problem01TimberSlide: React.FC = () => {
  return (
    <TwoColumnLayout
      title="Problem 01: Circular Timber Log"
      leftWidth="55%"
      leftContent={
        <div className="flex flex-col h-full justify-between gap-4 text-left select-text">
          <div>
            <div className="flex items-center space-x-1.5 text-indigo-500 font-bold text-[10px] uppercase mb-1">
              <HelpCircle className="h-4.5 w-4.5" />
              <span>Real-world Sizing Challenge</span>
            </div>
            <SlideParagraph variant="plain" className="text-xs text-foreground font-semibold leading-relaxed">
              {"A circular log of timber has diameter "}
              <LatexFormula math="D" />
              {". Find the dimensions of the strongest rectangular section beam that can be cut from the log."}
            </SlideParagraph>
          </div>
          <div className="space-y-2 my-2">
            <SlideBullet text={<span>Target parameter: maximize Section Modulus <LatexFormula math="Z" /> (strength).</span>} revealAt={1} />
            <SlideBullet text={<span>Unknowns: rectangular width <LatexFormula math="b" /> and depth <LatexFormula math="d" />.</span>} revealAt={2} />
            <SlideBullet text="Inscribed geometry: corner points must lie on the circle's boundary." revealAt={3} />
          </div>
        </div>
      }
      rightContent={
        <div className="bg-muted/30 border border-border/50 rounded-xl p-4 flex flex-col items-center justify-center h-full min-h-[250px] w-full">
          <ExpandableDrawing title="Circular Log Inscribed Cross-Section" description="A rectangular section of width b and depth d cut from a circular log of diameter D.">
            <svg viewBox="0 0 100 100" className="w-[120px] h-[120px] overflow-visible">
              <circle cx={50} cy={50} r={40} fill="none" stroke="var(--border)" strokeWidth={1.5} />
              <rect x={35} y={26} width={30} height={48} fill="rgba(99, 102, 241, 0.08)" stroke="var(--foreground)" strokeWidth={1.2} />
              <line x1={50 - 40 * Math.cos(Math.PI / 6)} y1={50 - 40 * Math.sin(Math.PI / 6)} x2={50 + 40 * Math.cos(Math.PI / 6)} y2={50 + 40 * Math.sin(Math.PI / 6)} stroke="var(--primary)" strokeWidth={0.8} strokeDasharray="2,2" />
              <text x={50} y={40} textAnchor="middle" className="fill-primary text-[8px] font-bold">D</text>
              <text x={50} y={80} textAnchor="middle" className="fill-muted-foreground text-[8px] font-bold">b</text>
              <text x={70} y={53} textAnchor="middle" className="fill-muted-foreground text-[8px] font-bold">d</text>
            </svg>
          </ExpandableDrawing>
        </div>
      }
    />
  );
};

export default Problem01TimberSlide;
