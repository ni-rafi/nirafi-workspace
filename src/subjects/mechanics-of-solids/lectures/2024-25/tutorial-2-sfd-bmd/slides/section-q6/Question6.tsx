import React from 'react';
import { TwoColumnLayout } from '@/shared/layouts/TwoColumnLayout';

export const Question6Statement: React.FC = () => {
  return (
    <TwoColumnLayout
      title="Question 6: Reconstruct Load & BMD from SFD"
      leftContent={
        <div className="flex flex-col gap-4 text-left font-sans">
          <p className="text-sm font-semibold leading-relaxed text-foreground">
            Draw the <span className="font-bold">load diagram</span> and the <span className="font-bold">bending moment diagram (BMD)</span> that correspond to the shear force diagram (SFD) shown.
          </p>
          <div className="p-3 bg-amber-500/5 border border-amber-500/20 text-amber-600 dark:text-amber-500 rounded-xl text-xs space-y-1 font-bold">
            <div>Paper-Based Offline Question:</div>
            <div className="font-normal text-muted-foreground">Solve this problem directly on your answer sheet. There are no online checkpoints for this inverse calculation.</div>
          </div>
        </div>
      }
      rightContent={
        <div className="w-full h-[300px] flex items-center justify-center bg-card/40 border border-border/30 rounded-xl p-2">
          <svg viewBox="0 0 400 240" className="w-full h-full max-h-[220px] text-foreground" style={{ background: 'transparent' }}>
            {/* Baseline */}
            <line x1="50" y1="120" x2="350" y2="120" stroke="currentColor" strokeWidth="1.5" opacity="0.5" />
            
            {/* SFD curve */}
            {/* From x=50 (A) to x=100 (E) to x=150 (C) to x=175 (D) to x=325 (B) */}
            {/* Shear curve coordinates:
                A: (50, 80) -> +0.8 kN
                E: (100, 120) -> 0 kN
                C: (150, 160) -> -0.8 kN
                C_right: (175, 160) -> -0.8 kN
                D: (175, 180) -> -1.2 kN
                B: (325, 180) -> -1.2 kN
            */}
            <path
              d="M 50,120 L 50,80 L 150,160 L 175,160 L 175,180 L 325,180 L 325,120"
              fill="rgba(14, 165, 233, 0.08)"
              stroke="#0ea5e9"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Support labels / annotations */}
            <line x1="50" y1="115" x2="50" y2="125" stroke="currentColor" strokeWidth="1.5" />
            <line x1="100" y1="115" x2="100" y2="125" stroke="currentColor" strokeWidth="1.5" />
            <line x1="150" y1="115" x2="150" y2="125" stroke="currentColor" strokeWidth="1.5" />
            <line x1="175" y1="115" x2="175" y2="125" stroke="currentColor" strokeWidth="1.5" />
            <line x1="325" y1="115" x2="325" y2="125" stroke="currentColor" strokeWidth="1.5" />

            <text x="48" y="137" className="text-[10px] font-black font-sans" fill="currentColor">A</text>
            <text x="96" y="137" className="text-[10px] font-black font-sans" fill="currentColor">E</text>
            <text x="146" y="137" className="text-[10px] font-black font-sans" fill="currentColor">C</text>
            <text x="171" y="137" className="text-[10px] font-black font-sans" fill="currentColor">D</text>
            <text x="321" y="137" className="text-[10px] font-black font-sans" fill="currentColor">B</text>

            {/* Values */}
            <text x="35" y="76" className="text-[9px] font-black font-mono text-[#0ea5e9]">+0.8</text>
            <text x="142" y="172" className="text-[9px] font-black font-mono text-[#0ea5e9]">-0.8</text>
            <text x="330" y="184" className="text-[9px] font-black font-mono text-[#0ea5e9]">-1.2</text>

            {/* Dimension Lines */}
            <g stroke="currentColor" strokeWidth="0.8" opacity="0.6">
              {/* 1 m */}
              <line x1="50" y1="205" x2="150" y2="205" />
              <line x1="50" y1="200" x2="50" y2="210" />
              <line x1="150" y1="200" x2="150" y2="210" />
              <text x="95" y="201" className="text-[8px] font-bold font-sans" fill="currentColor" stroke="none">1 m</text>

              {/* 0.5 m */}
              <line x1="150" y1="205" x2="175" y2="205" />
              <line x1="175" y1="200" x2="175" y2="210" />
              <text x="156" y="201" className="text-[7px] font-bold font-sans" fill="currentColor" stroke="none">0.5 m</text>

              {/* 1 m */}
              <line x1="175" y1="205" x2="325" y2="205" />
              <line x1="325" y1="200" x2="325" y2="210" />
              <text x="245" y="201" className="text-[8px] font-bold font-sans" fill="currentColor" stroke="none">1 m</text>
            </g>

            <text x="180" y="25" className="text-[10px] font-black font-sans text-sky-500 uppercase tracking-widest" fill="currentColor">SFD (kN)</text>
          </svg>
        </div>
      }
    />
  );
};

export default Question6Statement;
