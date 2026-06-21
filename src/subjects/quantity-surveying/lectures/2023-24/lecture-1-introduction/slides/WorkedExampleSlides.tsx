import React from 'react';
import { CONCRETE_SHRINKAGE_FACTOR } from '@/subjects/quantity-surveying/cores';
import { FullWidthLayout } from '@/shared/layouts/FullWidthLayout';
import { TwoColumnLayout } from '@/shared/layouts/TwoColumnLayout';
import { SlideContent, SlideTable, ClickHighlight, ClickReveal } from '@/features/presentation/components/elements';

// Slide 9: Worked Example: Isolated Footing Excavation & Base
export const Slide9: React.FC = () => (
  <TwoColumnLayout
    title="Worked Example: Isolated Footing"
    bgVariant="default"
    leftWidth="50%"
    leftContent={
      <SlideContent
        blocks={[
          {
            type: 'paragraph',
            text: <strong>Design Parameters</strong>,
            revealMode: 'none',
          },
          {
            type: 'bullet',
            text: (
              <span>
                <strong>Footing Dimensions:</strong> <strong>1.5 m &times; 1.5 m</strong> base area, with a structural thickness of <strong>400 mm</strong>.
              </span>
            ),
          },
          {
            type: 'bullet',
            text: (
              <span>
                <strong>Foundation Depth:</strong> Excavation depth required from the Natural Ground Level (NGL) is <strong>1.8 m</strong>.
              </span>
            ),
          },
          {
            type: 'bullet',
            text: (
              <span>
                <strong>Base Specifications:</strong> The footing rests on a single layer of Brick Flat Soling (BFS) and a <strong>75 mm</strong> Lean Concrete Cushion (<strong>1:3:6</strong>).
              </span>
            ),
          },
        ]}
      />
    }
    rightContent={
      <SlideContent
        blocks={[
          {
            type: 'paragraph',
            text: <strong>Required Tasks</strong>,
            revealMode: 'none',
          },
          {
            type: 'bullet',
            text: (
              <span>
                <strong>Task 1:</strong> Compute the total volume of earthwork excavation required in the field.
              </span>
            ),
          },
          {
            type: 'bullet',
            text: (
              <span>
                <strong>Task 2:</strong> Compute the total surface area of Brick Flat Soling (BFS) to be laid.
              </span>
            ),
          },
          {
            type: 'bullet',
            text: (
              <span>
                <strong>Task 3:</strong> Compute the raw dry materials required for the <strong>1:3:6</strong> Lean Concrete layer.
              </span>
            ),
          },
        ]}
      />
    }
  />
);

// Slide 10: Bangladesh Field Realities: The Sand Cushion
export const Slide10: React.FC = () => (
  <TwoColumnLayout
    title="Local Sub-Soil Reality: The Sand Cushion"
    bgVariant="default"
    leftWidth="50%"
    leftContent={
      <SlideContent
        blocks={[
          {
            type: 'paragraph',
            text: <strong>Geotechnical Necessity</strong>,
            revealMode: 'none',
          },
          {
            type: 'bullet',
            text: (
              <span>
                <strong>Expansive &amp; Clayey Soils:</strong> In many regions across Bangladesh, expansive or weak subgrade clay layer profiles cannot safely support building foundations directly.
              </span>
            ),
          },
          {
            type: 'bullet',
            text: (
              <span>
                <strong>The Cushion Intervention:</strong> To remedy this, local engineering protocol mandates placing a dynamic 3" to 6" (75 mm to 150 mm){' '}
                <ClickHighlight at={1} variant="paint">sand cushion layer</ClickHighlight> directly over the excavated soil bed.
              </span>
            ),
          },
        ]}
      />
    }
    rightContent={
      <SlideContent
        blocks={[
          {
            type: 'paragraph',
            text: <strong>Sessional Execution Target</strong>,
            revealMode: 'none',
          },
          {
            type: 'bullet',
            text: (
              <span>
                <strong>Positioning in the Envelope:</strong> This sand envelope sits structurally underneath the Brick Flat Soling (BFS) layer.
              </span>
            ),
          },
          {
            type: 'bullet',
            text: (
              <span>
                <strong>Field Measurement Standard:</strong> Measured and logged in cubic units (m³ or cft). Height is restricted to the design depth, while length and breadth extend{' '}
                <ClickHighlight at={2} variant="paint">3" (75 mm) beyond</ClickHighlight> the concrete footing bounds.
              </span>
            ),
          },
          {
            type: 'bullet',
            text: (
              <span className="text-amber-600 dark:text-amber-400">
                <strong>Lab Assignment Warning:</strong> Always carefully review your structural drawings for a sand filling item code; omitting this volume is a critical mistake commonly penalized in upcoming lab assignment reports.
              </span>
            ),
          },
        ]}
      />
    }
  />
);

// Slide 11: Operational Mathematics & Conversions
export const Slide11: React.FC = () => (
  <FullWidthLayout title="Operational Mathematics & Conversions" bgVariant="default">
    <SlideContent
      blocks={[
        {
          type: 'bullet',
          text: (
            <span>
              <strong>1. Earthwork Excavation:</strong> Volume = Length x Width x Depth. Math:{' '}
              <ClickHighlight at={1} variant="paint">1.50 m x 1.50 m x 1.80 m = 4.050 m³</ClickHighlight> (Field conversion: 4.05 x 35.315 = 143.03 cft).
            </span>
          ),
        },
        {
          type: 'bullet',
          text: (
            <span>
              <strong>2. Brick Flat Soling (BFS):</strong> Soling is flat work, measured strictly by surface area. Math:{' '}
              <ClickHighlight at={2} variant="paint">1.50 m x 1.50 m = 2.25 m²</ClickHighlight> (Field conversion: 2.25 x 10.764 = 24.22 sft).
            </span>
          ),
        },
        {
          type: 'bullet',
          text: (
            <span>
              <strong>3. Lean Concrete Wet Volume:</strong> Volume ={' '}
              <ClickHighlight at={3} variant="paint">1.50 m x 1.50 m x 0.075 m = 0.169 m³</ClickHighlight>.
            </span>
          ),
        },
        {
          type: 'bullet',
          text: (
            <span>
              <strong>4. Lean Concrete Dry Material Take-off:</strong> Apply PWD shrinkage factor: 0.169 x {CONCRETE_SHRINKAGE_FACTOR} = {(0.169 * CONCRETE_SHRINKAGE_FACTOR).toFixed(3)} m³ Dry Volume. Sum of parts (1:3:6) = 10. Cement = (1/10) x {(0.169 * CONCRETE_SHRINKAGE_FACTOR).toFixed(3)} = {((0.169 * CONCRETE_SHRINKAGE_FACTOR) / 10).toFixed(4)} m³, converted to standard bags: {((0.169 * CONCRETE_SHRINKAGE_FACTOR) / 10 / 0.0347).toFixed(2)} bags.
            </span>
          ),
        },
      ]}
    />
  </FullWidthLayout>
);

// Slide 12: Mastering the Measurement Book (MB) Entry Ledger
export const Slide12: React.FC = () => (
  <FullWidthLayout title="Mastering the Measurement Book (MB) Entry Ledger" bgVariant="gallery">
    <SlideContent
      blocks={[
        {
          type: 'bullet',
          text: 'The Final Ledger: All calculations must be formally translated into standard non-ambiguous textual descriptions and logged inside the structural MB columns.',
        },
      ]}
    />
    <ClickReveal at={2}>
      <div className="mt-4 overflow-x-auto text-[13px]">
        <SlideTable
          caption="Measurement Book Entry Ledger for Footing F-1"
          headers={[
            { label: 'Item No.', align: 'left' },
            { label: 'Description of Work', align: 'left' },
            { label: 'Nos.', align: 'right' },
            { label: 'Length (L)', align: 'right' },
            { label: 'Breadth (B)', align: 'right' },
            { label: 'Height (H)', align: 'right' },
            { label: 'Quantity', align: 'right' },
            { label: 'Remarks', align: 'left' },
          ]}
          rows={[
            [
              '1.01',
              'Earthwork excavation in trenches for foundation structures, including shoring, leveling, and depositing excavated soil within a lead of 30m, as per drawings.',
              '1',
              '1.50 m',
              '1.50 m',
              '1.80 m',
              <ClickHighlight at={3} variant="paint">4.050 m³</ClickHighlight>,
              'Excavation volume',
            ],
            [
              '1.02',
              'Brick Flat Soling (BFS) in foundation bed with picked jhama bricks, including preparing the bed, packing with sand, and watering complete.',
              '1',
              '1.50 m',
              '1.50 m',
              '—',
              <ClickHighlight at={4} variant="paint">2.250 m²</ClickHighlight>,
              'Footing F-1 base',
            ],
            [
              '1.03',
              'Mass cement concrete (1:3:6) with best quality cement, local sand, and 25mm down graded brick chips including mixing, casting, and curing.',
              '1',
              '1.50 m',
              '1.50 m',
              '0.075 m',
              <ClickHighlight at={5} variant="paint">0.169 m³</ClickHighlight>,
              'Lean layer',
            ],
          ]}
        />
      </div>
    </ClickReveal>
  </FullWidthLayout>
);

// Slide 13: The 2-Decimal Rule & Field Precision
export const Slide13: React.FC = () => (
  <FullWidthLayout title="The 2-Decimal Rule & Field Precision" bgVariant="default">
    <SlideContent
      blocks={[
        {
          type: 'bullet',
          text: (
            <span>
              <strong>Field Dimension Precision:</strong> Under standard PWD billing rules, all linear structural measurements (L, B, H) manually entered into the Measurement Book (MB) must universally be rounded and recorded strictly to{' '}
              <ClickHighlight at={1} variant="paint">two decimal places</ClickHighlight> (e.g., 1.50 m).
            </span>
          ),
        },
        {
          type: 'bullet',
          text: (
            <span>
              <strong>Volumetric and Area Yields:</strong> While inputs are restricted to two decimal places, the final calculated spatial quantities (such as volume items) are structurally tracked and rounded to{' '}
              <ClickHighlight at={2} variant="paint">three decimal places</ClickHighlight> (e.g., 0.169 m³).
            </span>
          ),
        },
        {
          type: 'bullet',
          text: '<strong>Significance of Consistency:</strong> Strict numerical boundaries prevent minor creeping errors from ballooning into large commercial deficits across multi-million BDT public works infrastructure accounts.',
        },
      ]}
    />
  </FullWidthLayout>
);
