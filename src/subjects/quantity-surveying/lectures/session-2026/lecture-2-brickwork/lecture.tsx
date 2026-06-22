import React from 'react';
import { LectureCover } from '@/shared/layouts/LectureCover';
import { TwoColumnLayout } from '@/shared/layouts/TwoColumnLayout';
import { FullWidthLayout } from '@/shared/layouts/FullWidthLayout';
import { LectureThankYou } from '@/shared/layouts/LectureThankYou';
import { SlideContent, SlideTable, ClickHighlight, LatexFormula, InteractiveCard } from '@/features/presentation/components/elements';

import { BrickworkCalculator } from '../../../features';
import { QuizCardOrchestrator } from '@/features/quiz';
import { SlideProps } from '@/features/presentation/components/slides/SlideRenderer';

// Slide 1: Cover Slide
const Slide1: React.FC<SlideProps> = (props) => (
  <LectureCover {...props} />
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
              text: (
                <span>
                  Brickwork estimation determines the{' '}
                  <ClickHighlight at={1} variant="marker">number of raw bricks</ClickHighlight>{' '}
                  and the{' '}
                  <ClickHighlight at={2} variant="rect">volume of wet mortar joint filling</ClickHighlight> needed.
                </span>
              ),
            },
            {
              type: 'paragraph',
              variant: 'plain',
              revealAt: 3,
              text: (
                <InteractiveCard variant="plain" title="Volumetric Mortar Equation">
                  <div className="flex items-center gap-1.5 justify-center py-2 select-text">
                    <LatexFormula math="\text{Mortar Vol} = \text{Wall Vol} -" />
                    <ClickHighlight at={4} variant="text">
                      <LatexFormula math="(\text{Bricks} \times \text{Brick Vol})" />
                    </ClickHighlight>
                  </div>
                </InteractiveCard>
              ),
            },
          ]}
        />
      }
      rightContent={
        <SlideContent
          blocks={[
            {
              type: 'list',
              listTitle: 'Standard Brick Dimensions',
              description: 'Typical sizes used in masonry work calculations:',
              items: [
                {
                  text: (
                    <span>
                      Length:{' '}
                      <ClickHighlight at={5} variant="paint">0.240m (240mm)</ClickHighlight>
                    </span>
                  ),
                },
                {
                  text: (
                    <span>
                      Width:{' '}
                      <ClickHighlight at={6} variant="rect">0.115m (115mm)</ClickHighlight>
                    </span>
                  ),
                },
                {
                  text: (
                    <span>
                      Height:{' '}
                      <ClickHighlight at={7} variant="paint">0.070m (70mm)</ClickHighlight>
                    </span>
                  ),
                },
                {
                  text: (
                    <span>
                      Standard mortar joint width:{' '}
                      <ClickHighlight at={8} variant="text">0.010m (10mm)</ClickHighlight>
                    </span>
                  ),
                },
              ],
            },
          ]}
        />
      }
    />
  );
};

// Slide 3: Live Masonry Calculator
const Slide3: React.FC = () => {
  return (
    <BrickworkCalculator inputMode="card" />
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
            <ClickHighlight at={1} variant="paint">15.000</ClickHighlight>,
            'm³',
            '$150.00',
            <ClickHighlight at={1} variant="rect"><span className="text-foreground font-semibold">$2,250.00</span></ClickHighlight>
          ],
        ]}
      />
    </FullWidthLayout>
  );
};

// Slide 5: Quiz Slide
const Slide5: React.FC = () => (
  <FullWidthLayout title="Masonry Quantity Quiz" bgVariant="gallery">
    <QuizCardOrchestrator
      quizId="qs_2026_lec2_quiz1"
      questionText="Calculate brick count for wall area = 20m², thickness = 0.24m (wastage = 5%, brick size = 240x115x70mm with 10mm joints)."
      quizType="numeric-input"
    />
  </FullWidthLayout>
);

// Slide 6: Thank You Slide
const Slide6: React.FC<SlideProps> = (props) => (
  <LectureThankYou {...props} />
);

export const slides: Record<number, React.ComponentType<SlideProps>> = {
  1: Slide1,
  2: Slide2,
  3: Slide3,
  4: Slide4,
  5: Slide5,
  6: Slide6,
};

export const slideMetadata: Record<number, import('@/features/presentation/components/slides/SlideRenderer').SlideMetadata> = {
  1: { title: 'Brickwork Cover', type: 'Cover Slide', section: 'Introduction' },
  2: { title: 'Masonry Principles', type: 'Theory Overview', section: 'Introduction' },
  3: { title: 'Masonry Calculator', type: 'Live Sandbox', section: 'Calculations' },
  4: { title: 'Masonry BoQ', type: 'Spreadsheet View', section: 'BoQ Summary' },
  5: { title: 'Masonry Quiz', type: 'Quiz Slide', section: 'Quiz', quizId: 'qs_2026_lec2_quiz1', quizVisibilityMode: 'placeholder' },
  6: { title: 'Conclusion', type: 'Thank You Slide', section: 'Conclusion' },
};
