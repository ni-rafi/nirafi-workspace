import React from 'react';
import { TopicDividerLayout } from '@/shared/layouts/TopicDividerLayout';
import { FullWidthLayout } from '@/shared/layouts/FullWidthLayout';
import { TwoColumnLayout } from '@/shared/layouts/TwoColumnLayout';
import { SlideContent, ClickHighlight, SlideTable } from '@/features/presentation/components/elements';

// Slide 19: Title Page
export const Slide19: React.FC = () => (
  <TopicDividerLayout title="The Bill of Quantities (BoQ)" topicNumber="Part 4" description="Origin, Structure, and Strategic Advantages" />
);

// Slide 20: Origin and Purpose of the BoQ
export const Slide20: React.FC = () => (
  <FullWidthLayout title="Origin and Purpose of the BoQ" bgVariant="default">
    <SlideContent
      blocks={[
        {
          type: 'bullet',
          text: (
            <span>
              <strong>Quantifying the Concept:</strong> Just as a cabinet maker needs exact sizes, materials, and finishes to price a table, a building owner must have detailed quantities before placing an order.
            </span>
          ),
        },
        {
          type: 'bullet',
          text: (
            <span>
              <strong>The Origin:</strong> Historically, competing builders each measured quantities individually, but to save overhead, they eventually hired a{' '}
              <ClickHighlight at={1} variant="paint">single surveyor to prepare one unified document</ClickHighlight> for all tenderers.
            </span>
          ),
        },
        {
          type: 'bullet',
          text: (
            <span>
              <strong>Standardized Ledger:</strong> It provides a unified, standardized pricing ledger of materials, labor, and equipment based on a{' '}
              <ClickHighlight at={2} variant="paint">standard method of measurement</ClickHighlight>.
            </span>
          ),
        },
      ]}
    />
  </FullWidthLayout>
);

// Slide 21: Anatomy & Criteria of a BoQ
export const Slide21: React.FC = () => (
  <TwoColumnLayout
    title="Anatomy & Criteria of a BoQ"
    bgVariant="default"
    leftWidth="50%"
    leftContent={
      <SlideContent
        blocks={[
          { type: 'paragraph', text: <strong>Standard BoQ Columns</strong> },
          { type: 'bullet', text: <span><strong>Item Code / Sl No.:</strong> Hierarchical numbering system.</span> },
          { type: 'bullet', text: <span><strong>Description of Work:</strong> Clear, non-ambiguous description of materials, specifications, and workmanship.</span> },
          { type: 'bullet', text: <span><strong>Quantity &amp; Unit:</strong> Evaluated structural value and standardized metrics (e.g., <strong>m³</strong>, <strong>m²</strong>, <strong>kg</strong>, <strong>Nos</strong>).</span> },
          { type: 'bullet', text: <span><strong>Rate &amp; Total Amount:</strong> Financial units multiplied out for final pricing.</span> }
        ]}
      />
    }
    rightContent={
      <SlideContent
        blocks={[
          { type: 'paragraph', text: <strong>Criteria for Professional Production</strong> },
          { type: 'bullet', text: <span><strong>Construction Literacy:</strong> Accurate drawing interpretation is impossible without an absolute command of building construction sequences.</span> },
          { type: 'bullet', text: <span><strong>Execution Discipline:</strong> Strict accuracy, clean sorting, and formatting neatness are required during spatial dimension entry.</span> },
          { type: 'bullet', text: <span><strong>Concise Summaries:</strong> Mastery of writing highly concise, technical language that <ClickHighlight at={1} variant="paint">translates 2D blueprint lines into words</ClickHighlight>.</span> }
        ]}
      />
    }
  />
);

// Slide 22: Studio Practice: HBL Bangladesh Country Office BoQ
export const Slide22: React.FC = () => (
  <TwoColumnLayout
    title="Worked Example: BoQ &amp; Schedule of Items"
    bgVariant="gallery"
    leftWidth="40%"
    leftContent={
      <div className="select-text">
        <SlideTable
          dense="tight"
          caption="Summary of Schedule of Items"
          headers={[
            { label: 'Ref', align: 'left', width: '30px' },
            { label: 'Work Section Description', align: 'left' },
            { label: 'Amount (BDT)', align: 'right', width: '90px' }
          ]}
          rows={[
            ['A', 'Civil Works', <ClickHighlight at={1} variant="paint">291,175</ClickHighlight>],
            ['B', 'Paint Works', '75,000'],
            ['C', 'Feature Panel Work', '120,000'],
            ['D', 'Partition Work', '180,000'],
            ['E', 'Floor Finishing Work', '150,000'],
            ['F', 'Ceiling Work', '95,000'],
            ['G', 'Door Work', '85,000'],
            ['H', 'Plumbing & Sanitary Work', '45,000'],
            ['I', 'Electrical Works', '140,000'],
            ['J', 'Miscellaneous Work', '35,000'],
            ['K', 'Furniture Work', '320,000'],
            [<strong>Total</strong>, <strong>Est. Fit-out Cost</strong>, <strong>1,536,175</strong>]
          ]}
        />
      </div>
    }
    rightContent={
      <div className="select-text">
        <SlideTable
          dense="relaxed"
          caption="Section A: Detailed Civil Works"
          headers={[
            { label: 'SL', align: 'left', width: '30px' },
            { label: 'Description of Work Item', align: 'left', width: '220px' },
            { label: 'QTY', align: 'right', width: '50px' },
            { label: 'Unit', align: 'left', width: '50px' },
            { label: 'Rate (BDT)', align: 'right', width: '70px' },
            { label: 'Amount (BDT)', align: 'right', width: '95px' }
          ]}
          rows={[
            [
              '1',
              <span><strong>250mm BRICK WORK:</strong> First Class Brick in cement-sand (F.M. 1.2) mortar (1:6) including racking joints, curing, and scaffolding complete.</span>,
              '880',
              'Sft',
              '140',
              <ClickHighlight at={2} variant="paint">123,200</ClickHighlight>
            ],
            [
              '2',
              <span><strong>125mm BRICK WORK:</strong> First Class Brick partition walls in cement-sand mortar (1:6) complete as per Bank standard.</span>,
              '920',
              'Sft',
              '85',
              <ClickHighlight at={3} variant="paint">78,200</ClickHighlight>
            ],
            [
              '3',
              <span><strong>PLASTER WORK:</strong> Minimum 12mm thick plaster (1:4) on walls and 6mm thick on ceiling surfaces using cement-sand mortar.</span>,
              '1,995',
              'Sft',
              '45',
              <ClickHighlight at={4} variant="paint">89,775</ClickHighlight>
            ],
            [
              '...',
              <span className="text-muted-foreground/60 italic">Remaining civil work items (damp-proof course, concrete repairs, etc.) continue...</span>,
              '...',
              '...',
              '...',
              '...'
            ]
          ]}
        />
      </div>
    }
  />
);

// Slide 23: Strategic Advantages of the BoQ
export const Slide23: React.FC = () => (
  <FullWidthLayout title="Strategic Advantages of the BoQ" bgVariant="default">
    <SlideContent
      blocks={[
        {
          type: 'bullet',
          text: (
            <span>
              <strong>Competitive Tendering Baseline:</strong> Establishes a transparent, common baseline for competitive tendering, ensuring fair market rates and that all contractors bid on the{' '}
              <ClickHighlight at={1} variant="paint">exact same information</ClickHighlight>.
            </span>
          ),
        },
        {
          type: 'bullet',
          text: (
            <span>
              <strong>Change Management:</strong> Acts as the official legal basis of rates for measured work, which is utilized to value{' '}
              <ClickHighlight at={2} variant="paint">post-contract field variations</ClickHighlight> and finalize accounts.
            </span>
          ),
        },
        {
          type: 'bullet',
          text: (
            <span>
              <strong>Cash Flow Control:</strong> Serves as the primary operational document for compiling contractor progress billing and executing{' '}
              <ClickHighlight at={3} variant="paint">monthly interim payments</ClickHighlight>.
            </span>
          ),
        },
      ]}
    />
  </FullWidthLayout>
);
