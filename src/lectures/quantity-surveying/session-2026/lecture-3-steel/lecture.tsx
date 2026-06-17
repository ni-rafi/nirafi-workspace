import React, { useState } from 'react';
import { TitleLayout } from '@/shared/layouts/TitleLayout';
import { TwoColumnLayout } from '@/shared/layouts/TwoColumnLayout';
import { FullWidthLayout } from '@/shared/layouts/FullWidthLayout';
import { calculateSteelWeight } from '../calculations/steel';
import { SlideContent, SlideTable } from '@/features/presentation';

// Slide 1: Cover Slide
const Slide1: React.FC<any> = ({ subject, lecture }) => (
  <TitleLayout
    title={lecture.title}
    subtitle={`${subject.code} Series • Session 2026-27`}
    description={lecture.description}
    footer="CE-QS Academic Department"
  />
);

// Slide 2: Theoretical Overview
const Slide2: React.FC = () => {
  return (
    <TwoColumnLayout
      title="Reinforcement Steel Theory"
      bgVariant="default"
      leftWidth="45%"
      leftContent={
        <SlideContent
          blocks={[
            {
              type: 'paragraph',
              text: 'Reinforcement bars (rebar) are estimated in terms of weight (kilograms or tons) rather than length.',
            },
            {
              type: 'equation',
              math: 'W_{\\text{unit}} = \\frac{d^2}{162} \\text{ kg/m}',
              revealAt: 1,
            },
          ]}
        />
      }
      rightContent={
        <SlideContent
          blocks={[
            { type: 'paragraph', text: 'Standard millimeter diameters used in calculations:' },
            { type: 'bullet', text: 'D=10mm: 0.617 kg/m' },
            { type: 'bullet', text: 'D=12mm: 0.888 kg/m' },
            { type: 'bullet', text: 'D=16mm: 1.580 kg/m' },
            { type: 'bullet', text: 'D=20mm: 2.469 kg/m' },
          ]}
        />
      }
    />
  );
};

// Slide 3: Live Steel Weight Calculator
const Slide3: React.FC = () => {
  const [diameter, setDiameter] = useState(12);
  const [length, setLength] = useState(100);

  const result = calculateSteelWeight(diameter, length);

  return (
    <TwoColumnLayout
      title="Rebar Steel Calculation Sandbox"
      bgVariant="calculation"
      leftWidth="45%"
      leftContent={
        <div className="space-y-3 text-xs">
          <span className="font-semibold text-muted-foreground block uppercase text-[10px] tracking-wider">Parameters (SI Units)</span>
          <div className="flex flex-col gap-1.5">
            <label className="text-muted-foreground">Rebar Diameter: {diameter}mm</label>
            <input
              type="range" min="6" max="32" step="1" value={diameter}
              onChange={(e) => setDiameter(parseFloat(e.target.value))}
              className="w-full accent-primary cursor-pointer"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-muted-foreground">Total Length: {length}m</label>
            <input
              type="range" min="10" max="1000" step="10" value={length}
              onChange={(e) => setLength(parseFloat(e.target.value))}
              className="w-full accent-primary cursor-pointer"
            />
          </div>
        </div>
      }
      rightContent={
        <div className="flex flex-col items-center justify-center h-full border rounded-xl bg-card p-6 shadow-sm">
          <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-1">Rebar Weight Output</span>
          <span className="text-3xl font-extrabold text-primary select-all">
            {result.weightKg.toFixed(3)} kg
          </span>
          <div className="mt-4 text-[10px] text-muted-foreground text-center">
            Estimated Unit Weight: {((diameter * diameter) / 162).toFixed(3)} kg/m
          </div>
        </div>
      }
    />
  );
};

// Slide 4: BoQ Steel View
const Slide4: React.FC = () => {
  return (
    <FullWidthLayout title="Itemized Steel Reinforcement BoQ" bgVariant="gallery">
      <SlideTable
        headers={[
          { label: 'Item No', align: 'left' },
          { label: 'Description', align: 'left' },
          { label: 'Qty', align: 'right' },
          { label: 'Unit', align: 'center' },
          { label: 'Rate', align: 'right' },
          { label: 'Amount', align: 'right' },
        ]}
        rows={[
          [
            '3.1',
            'Deformed steel reinforcement bar including cutting/bending',
            '493.800',
            'kg',
            '$1.60',
            <span className="text-foreground font-semibold">$790.08</span>
          ],
        ]}
      />
    </FullWidthLayout>
  );
};

export const slides: Record<number, React.ComponentType<any>> = {
  1: Slide1,
  2: Slide2,
  3: Slide3,
  4: Slide4,
};

export const slideMetadata: Record<number, { title: string; type: string; section: string }> = {
  1: { title: 'Steel Cover', type: 'Cover Slide', section: 'Introduction' },
  2: { title: 'Steel Weight Principles', type: 'Theory Overview', section: 'Introduction' },
  3: { title: 'Rebar Calculator', type: 'Live Sandbox', section: 'Calculations' },
  4: { title: 'Reinforcement BoQ', type: 'Spreadsheet View', section: 'BoQ Summary' },
};
