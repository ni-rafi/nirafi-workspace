import React, { useState } from 'react';
import { TitleLayout } from '@/shared/layouts/TitleLayout';
import { TwoColumnLayout } from '@/shared/layouts/TwoColumnLayout';
import { FullWidthLayout } from '@/shared/layouts/FullWidthLayout';
import { calculateConcreteVolume } from '../calculations/concrete';
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
      title="Concrete Calculation Principles"
      bgVariant="default"
      leftWidth="45%"
      leftContent={
        <SlideContent
          blocks={[
            {
              type: 'paragraph',
              text: 'Estimating structural concrete requires isolating total volumetric cubic meters from internal rebar steel displacement constants.',
            },
            {
              type: 'equation',
              math: 'V = L \\times W \\times H \\times (1 + \\text{wastage})',
              revealAt: 1,
            },
          ]}
        />
      }
      rightContent={
        <SlideContent
          blocks={[
            { type: 'paragraph', text: 'Wastage Allowances:' },
            { type: 'bullet', text: 'Standard structural members (beams/columns): 5% waste' },
            { type: 'bullet', text: 'Slabs and massive casting elements: 8% waste' },
            { type: 'bullet', text: 'Thin foundation blindings and overlays: 10% waste' },
          ]}
        />
      }
    />
  );
};

// Slide 3: Live Volumetric Calculator
const Slide3: React.FC = () => {
  const [length, setLength] = useState(10);
  const [width, setWidth] = useState(0.3);
  const [height, setHeight] = useState(0.4);
  const [wastage] = useState(0.05);

  const result = calculateConcreteVolume(length, width, height, wastage);

  return (
    <TwoColumnLayout
      title="Volumetric Calculation Sandbox"
      bgVariant="calculation"
      leftWidth="45%"
      leftContent={
        <div className="space-y-3 text-xs">
          <span className="font-semibold text-muted-foreground block uppercase text-[10px] tracking-wider">Parameters (SI Meters)</span>
          <div className="flex flex-col gap-1.5">
            <label className="text-muted-foreground">Length: {length}m</label>
            <input
              type="range" min="1" max="50" step="0.5" value={length}
              onChange={(e) => setLength(parseFloat(e.target.value))}
              className="w-full accent-primary cursor-pointer"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-muted-foreground">Width: {width}m</label>
            <input
              type="range" min="0.1" max="2" step="0.05" value={width}
              onChange={(e) => setWidth(parseFloat(e.target.value))}
              className="w-full accent-primary cursor-pointer"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-muted-foreground">Height: {height}m</label>
            <input
              type="range" min="0.1" max="2" step="0.05" value={height}
              onChange={(e) => setHeight(parseFloat(e.target.value))}
              className="w-full accent-primary cursor-pointer"
            />
          </div>
        </div>
      }
      rightContent={
        <div className="flex flex-col items-center justify-center h-full border rounded-xl bg-card p-6 shadow-sm">
          <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-1">Casting Volume Output</span>
          <span className="text-3xl font-extrabold text-primary select-all">
            {result.volume.toFixed(3)} m³
          </span>
          <div className="mt-4 text-[10px] text-muted-foreground text-center">
            Automatic wastage factor multiplier: {Math.round(wastage * 100)}%
          </div>
        </div>
      }
    />
  );
};

// Slide 4: BoQ Spreadsheet View
const Slide4: React.FC = () => {
  return (
    <FullWidthLayout title="Itemized Bill of Quantities (BoQ) Template" bgVariant="gallery">
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
            '1.1',
            'Concrete cast in situ for columns (SI metrics)',
            '12.500',
            'm³',
            '$120.00',
            <span className="text-foreground font-semibold">$1,500.00</span>
          ],
          [
            '1.2',
            'Mild steel reinforcement D=12mm',
            '920.000',
            'kg',
            '$1.50',
            <span className="text-foreground font-semibold">$1,380.00</span>
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
  1: { title: 'Concrete Cover', type: 'Cover Slide', section: 'Introduction' },
  2: { title: 'Calculation Principles', type: 'Theory Overview', section: 'Introduction' },
  3: { title: 'Volumetric Calculator', type: 'Live Sandbox', section: 'Calculations' },
  4: { title: 'Bill of Quantities', type: 'Spreadsheet View', section: 'BoQ Summary' },
};
