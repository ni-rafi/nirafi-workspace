import React from 'react';
import { TopicDividerLayout } from '@/shared/layouts/TopicDividerLayout';
import { FullWidthLayout } from '@/shared/layouts/FullWidthLayout';
import { TwoColumnLayout } from '@/shared/layouts/TwoColumnLayout';
import { SlideContent, ClickHighlight } from '@/features/presentation/components/elements';

// Slide 14: Title Page
export const Slide14: React.FC = () => (
  <TopicDividerLayout
    title="Fundamentals of Estimating & Project Documents"
    topicNumber="Part 3"
    description="Definitions, Estimate Types, Drawings, and Specifications"
  />
);

// Slide 15: Definition and Objectives of Estimating
export const Slide15: React.FC = () => (
  <FullWidthLayout title="Definition & Objectives of Estimating" bgVariant="default">
    <SlideContent
      blocks={[
        {
          type: 'bullet',
          text: (
            <span>
              <strong>Core Definition:</strong> An estimate is the anticipated or probable computation of quantities and likely expenditures required for a project before construction begins.
            </span>
          ),
        },
        {
          type: 'bullet',
          text: (
            <span>
              <strong>Financial Baseline:</strong> It serves as the fundamental baseline for predicting total project expenditure, transforming physical designs into material breakdowns, procurement schedules, and{' '}
              <ClickHighlight at={1} variant="paint">financial budgets</ClickHighlight>.
            </span>
          ),
        },
        {
          type: 'bullet',
          text: (
            <span>
              <strong>Primary Objective:</strong> To enable the client and project managers to{' '}
              <ClickHighlight at={2} variant="paint">know the cost beforehand</ClickHighlight>, ensuring the project is financially viable.
            </span>
          ),
        },
      ]}
    />
  </FullWidthLayout>
);

// Slide 16: Types of Estimates
export const Slide16: React.FC = () => (
  <TwoColumnLayout
    title="Types of Estimates"
    bgVariant="default"
    leftWidth="50%"
    leftContent={
      <SlideContent
        blocks={[
          {
            type: 'paragraph',
            text: <strong>Approximate / Preliminary Estimates</strong>,
          },
          {
            type: 'bullet',
            text: 'Used primarily for conceptual and administrative approval stages.',
          },
          {
            type: 'bullet',
            text: (
              <span>
                Based on generic rates and frameworks such as the{' '}
                <ClickHighlight at={1} variant="paint">Plinth Area Method, Cubical Content Method</ClickHighlight>, or Unit Base Rate Method.
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
            text: <strong>Detailed / Item Rate Estimates</strong>,
          },
          {
            type: 'bullet',
            text: 'Highly accurate computations executed using the final working drawings.',
          },
          {
            type: 'bullet',
            text: (
              <span>
                Serves as the rigorous baseline for{' '}
                <ClickHighlight at={2} variant="paint">actual competitive tendering</ClickHighlight>, contract agreements, and detailed budget control.
              </span>
            ),
          },
        ]}
      />
    }
  />
);

// Slide 17: Study of Drawings: The Surveyor's Protocol
export const Slide17: React.FC = () => (
  <FullWidthLayout title="Study of Drawings: The Surveyor's Protocol" bgVariant="default">
    <SlideContent
      blocks={[
        {
          type: 'bullet',
          text: (
            <span>
              <strong>Visualization Phase:</strong> It is dangerously premature to start taking off dimensions immediately; a holistic study of all plan views, elevations, and section cuts is required first.
            </span>
          ),
        },
        {
          type: 'bullet',
          text: (
            <span>
              <strong>Cross-Checking:</strong> The surveyor must verify that overall dimensions agree with individual room measurements and{' '}
              <ClickHighlight at={1} variant="paint">reconcile discrepancies</ClickHighlight> before quantifying.
            </span>
          ),
        },
        {
          type: 'bullet',
          text: (
            <span>
              <strong>Missing Data Rule:</strong> If a dimension is missing, work it out logically from other related structural lines;{' '}
              <ClickHighlight at={2} variant="paint">scaling directly from the paper drawing is strictly a last resort</ClickHighlight>.
            </span>
          ),
        },
      ]}
    />
  </FullWidthLayout>
);

// Slide 18: The Role of Technical Specifications
export const Slide18: React.FC = () => (
  <FullWidthLayout title="The Role of Technical Specifications" bgVariant="default">
    <SlideContent
      blocks={[
        {
          type: 'bullet',
          text: (
            <span>
              <strong>Beyond the Blueprint:</strong> An engineering specification is an explicit, highly specialized document detailing requirements that{' '}
              <ClickHighlight at={1} variant="paint">cannot be conveyed by blueprint lines alone</ClickHighlight>.
            </span>
          ),
        },
        {
          type: 'bullet',
          text: (
            <span>
              <strong>Quality and Cost:</strong> It outlines material grades, mixing ratios (e.g., 1:1.5:3 concrete), and workmanship execution tolerances.
            </span>
          ),
        },
        {
          type: 'bullet',
          text: (
            <span>
              <strong>Pricing Baseline:</strong> Since the quality of materials and workmanship directly governs the unit cost, accurate rate analysis is{' '}
              <ClickHighlight at={2} variant="paint">impossible without strict adherence to the specifications</ClickHighlight>.
            </span>
          ),
        },
      ]}
    />
  </FullWidthLayout>
);
