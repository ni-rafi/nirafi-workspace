import React, { useState } from 'react';
import { TitleLayout } from '@/shared/layouts/TitleLayout';
import { TwoColumnLayout } from '@/shared/layouts/TwoColumnLayout';
import { FullWidthLayout } from '@/shared/layouts/FullWidthLayout';
import { calculateBrickwork } from '../calculations/brickwork';
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
      title="Masonry Estimating Theory"
      bgVariant="default"
      leftWidth="45%"
      leftContent={
        <SlideContent
          blocks={[
            {
              type: 'paragraph',
              text: 'Brickwork estimation determines the number of raw bricks and the volume of wet mortar joint filling needed.',
            },
            {
              type: 'equation',
              math: '\\text{Mortar Vol} = \\text{Wall Vol} - (\\text{Bricks} \\times \\text{Brick Vol})',
              revealAt: 1,
            },
          ]}
        />
      }
      rightContent={
        <SlideContent
          blocks={[
            { type: 'paragraph', text: 'Standard brick dimensions in SI metrics:' },
            { type: 'bullet', text: 'Length: 0.240m (240mm)' },
            { type: 'bullet', text: 'Width: 0.115m (115mm)' },
            { type: 'bullet', text: 'Height: 0.070m (70mm)' },
            { type: 'bullet', text: 'Standard mortar joint width: 0.010m (10mm)' },
          ]}
        />
      }
    />
  );
};

// Slide 3: Live Masonry Calculator
const Slide3: React.FC = () => {
  const [area, setArea] = useState(15);
  const [thickness, setThickness] = useState(0.24);
  const [mortar, setMortar] = useState(0.01);

  const result = calculateBrickwork(area, thickness, 0.24, 0.115, 0.07, mortar);

  return (
    <TwoColumnLayout
      title="Masonry Calculation Sandbox"
      bgVariant="calculation"
      leftWidth="45%"
      leftContent={
        <div className="space-y-3 text-xs">
          <span className="font-semibold text-muted-foreground block uppercase text-[10px] tracking-wider">Parameters (SI Meters)</span>
          <div className="flex flex-col gap-1.5">
            <label className="text-muted-foreground">Wall Surface Area: {area}m²</label>
            <input
              type="range" min="1" max="100" step="1" value={area}
              onChange={(e) => setArea(parseFloat(e.target.value))}
              className="w-full accent-primary cursor-pointer"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-muted-foreground">Wall Thickness: {thickness}m</label>
            <input
              type="range" min="0.115" max="0.5" step="0.005" value={thickness}
              onChange={(e) => setThickness(parseFloat(e.target.value))}
              className="w-full accent-primary cursor-pointer"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-muted-foreground">Mortar Joints: {Math.round(mortar * 1000)}mm</label>
            <input
              type="range" min="0.005" max="0.02" step="0.001" value={mortar}
              onChange={(e) => setMortar(parseFloat(e.target.value))}
              className="w-full accent-primary cursor-pointer"
            />
          </div>
        </div>
      }
      rightContent={
        <div className="flex flex-col items-center justify-center h-full border rounded-xl bg-card p-6 shadow-sm">
          <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-1">Bricks & Mortar Output</span>
          <span className="text-2xl font-extrabold text-primary select-all">
            {result.brickCount} Bricks
          </span>
          <span className="text-2xl font-extrabold text-primary select-all mt-2">
            {result.mortarVolume.toFixed(3)} m³ Mortar
          </span>
        </div>
      }
    />
  );
};

// Slide 4: BoQ Brickwork View
const Slide4: React.FC = () => {
  return (
    <FullWidthLayout title="Itemized Brickwork Bill of Quantities" bgVariant="gallery">
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
            '2.1',
            'First class brickwork in 1:4 cement sand mortar',
            '15.000',
            'm³',
            '$150.00',
            <span className="text-foreground font-semibold">$2,250.00</span>
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
  1: { title: 'Brickwork Cover', type: 'Cover Slide', section: 'Introduction' },
  2: { title: 'Masonry Principles', type: 'Theory Overview', section: 'Introduction' },
  3: { title: 'Masonry Calculator', type: 'Live Sandbox', section: 'Calculations' },
  4: { title: 'Masonry BoQ', type: 'Spreadsheet View', section: 'BoQ Summary' },
};
