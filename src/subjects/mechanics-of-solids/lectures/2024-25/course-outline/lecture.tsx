import React from 'react';
import { SlideSchema } from '@/features/presentation/types/schema';
import { SlideSchemaEngine } from '@/features/presentation/components/slides/SlideSchemaEngine';
import { SlideProps } from '@/features/presentation/components/slides/SlideRenderer';
import presenterData from '@/config/presenter.json';
import strategyData from '@/config/cee-tl-assessment-strategy-v1.json';
import { subjectMetadata, outcomes, rationale, COURSE_CONTENT, references } from '../courseContent';

const { tlLegends, assessmentLegends } = strategyData;

const metadata = {
  courseCode: subjectMetadata.courseCode,
  courseTitle: subjectMetadata.courseTitle,
  credit: '02',
  category: 'Core',
  courseType: 'Theory',
  yearSemester: subjectMetadata.yearSemester,
  teacher: presenterData,
  session: '2024-25',
  usn: '2026-1',
};

const contents = COURSE_CONTENT.map((cc) => ({
  id: cc.serial,
  title: cc.title,
  description: cc.description,
}));


const schedule = [
  { week: 1, topic: 'Introduction, Review of Statics (FBDs, Equilibrium, Reactions, Centroid, Moment of Inertia)', contentCode: '---', coCovered: '---', tlStrategy: ['TL 01'], assessmentStrategy: ['---'] },
  { week: 2, topic: 'Internal Shear (V) & Moment (M): Definitions, Sign Conventions, Differential Relations, FBDs', contentCode: '5', coCovered: '4', tlStrategy: ['TL 01'], assessmentStrategy: ['CA 01', 'SA 01'] },
  { week: 3, topic: 'Method of Sections: Deriving V(x) & M(x) for Point Loads and UDLs', contentCode: '5', coCovered: '4', tlStrategy: ['TL 01', 'TL 07'], assessmentStrategy: ['CA 01', 'CA 03', 'SA 01'] },
  { week: 4, topic: 'TUTORIAL: Equation Method for Complex Beams, Absolute Maximum Bending Moment', contentCode: '5', coCovered: '4', tlStrategy: ['TL 02', 'TL 06', 'TL 07'], assessmentStrategy: ['---'] },
  { week: 5, topic: 'Method of Integration & Area Method: SFD/BMD Curve Slopes and Critical Points', contentCode: '5', coCovered: '4', tlStrategy: ['TL 01', 'TL 07'], assessmentStrategy: ['CA 01', 'CA 03', 'SA 01'] },
  { week: 6, topic: 'TUTORIAL: Problem-solving using the Graphical Method for SFD/BMD', contentCode: '5', coCovered: '4', tlStrategy: ['TL 02', 'TL 06', 'TL 07'], assessmentStrategy: ['---'] },
  { week: 7, topic: 'Mid-semester Examination (Covers Weeks 1-6)', contentCode: '---', coCovered: '---', tlStrategy: ['---'], assessmentStrategy: ['CA 01'] },
  { week: 8, topic: 'Theory of Pure Bending: Neutral Axis and Flexure Formula Derivation', contentCode: '6', coCovered: '5', tlStrategy: ['TL 01', 'TL 07'], assessmentStrategy: ['---'] },
  { week: 9, topic: 'Application of Flexure Formula: Calculating Maximum Bending Stress', contentCode: '6', coCovered: '5', tlStrategy: ['TL 01', 'TL 07'], assessmentStrategy: ['CA 03', 'CA 04', 'SA 01'] },
  { week: 10, topic: 'TUTORIAL: Symmetric/Non-symmetric Cross-sections, Allowable Stress Limits', contentCode: '6', coCovered: '5', tlStrategy: ['TL 02', 'TL 06', 'TL 07'], assessmentStrategy: ['---'] },
  { week: 11, topic: 'Transverse Shear Stress: Shear Formula Derivation and First Moment of Area (Q)', contentCode: '6', coCovered: '5', tlStrategy: ['TL 01', 'TL 07'], assessmentStrategy: ['CA 03', 'CA 04', 'SA 01'] },
  { week: 12, topic: 'Shear Stress Distribution: Rectangular and Circular Sections, Identifying maximum shear stress', contentCode: '6', coCovered: '5', tlStrategy: ['TL 01', 'TL 07'], assessmentStrategy: ['SA 01'] },
  { week: 13, topic: 'TUTORIAL: Advanced Shear Stress Distribution & Introduction to Shear Flow', contentCode: '6', coCovered: '5', tlStrategy: ['TL 02', 'TL 06', 'TL 07'], assessmentStrategy: ['---'] },
  { week: 14, topic: 'Final Course Review', contentCode: '---', coCovered: '---', tlStrategy: ['---'], assessmentStrategy: ['---'] },
];

export const courseOutlineData: SlideSchema[] = [
  {
    id: 1,
    section: 'Overview',
    metadata: { title: 'Cover Page', type: 'Course Metadata' },
    layout: 'title-v2',
    props: {
      courseCode: metadata.courseCode,
      courseTitle: metadata.courseTitle,
      yearSemester: metadata.yearSemester,
      creditHours: `${metadata.credit} (${metadata.category} ${metadata.courseType})`,
      usnCode: metadata.usn,
      session: metadata.session,
    },
  },
  {
    id: 2,
    section: 'References',
    metadata: { title: 'Reference Books', type: 'Course Materials' },
    layout: 'fullwidth',
    props: {
      title: 'Reference Books & Course Materials',
      element: {
        type: 'reference-books-list',
        data: { references },
      },
    },
  },
  {
    id: 3,
    section: 'Rationale',
    metadata: { title: 'Course Rationale', type: 'Syllabus Overview' },
    layout: 'fullwidth',
    props: {
      title: 'Course Rationale',
      element: {
        type: 'rich-paragraph',
        data: {
          fragments: [rationale],
        },
      },
    },
  },
  {
    id: 4,
    section: 'Course Outcomes',
    metadata: { title: 'Course Outcomes', type: 'Syllabus Breakdown' },
    layout: 'twocolumn',
    props: {
      title: 'Course Learning Outcomes (COs)',
      leftWidth: '60%',
      leftElement: {
        type: 'highlightable-list',
        data: {
          outcomes,
          coCoveredIds: [4, 5],
          listTitle: 'By the end of this course, students will be able to:',
          highlightLabel: 'Active Goals',
        },
      },
      rightElement: {
        type: 'rich-paragraph',
        data: {
          fragments: [
            "These outcomes guide the course progression, ensuring that theoretical derivations directly translate to structural analysis capabilities."
          ],
        },
      },
    },
  },
  {
    id: 5,
    section: 'Course Contents',
    metadata: { title: 'Course Content Structure', type: 'Syllabus Breakdown' },
    layout: 'click-synced-tabs',
    props: {
      title: 'Course Content Structure',
      leftTitle: 'Syllabus Chapters (CCs)',
      rightTitle: 'Chapter Detailed Overview',
      leftWidth: '42%',
      items: contents.map((c) => ({
        title: c.title,
        description: `Chapter ${c.id} outline and objectives.`,
        badge: `CC 0${c.id}`,
        badgeColor: 'border-primary/30 text-primary bg-primary/5',
        rightContent: c.description,
      })),
    },
  },
  {
    id: 6,
    section: 'Schedule Part 1',
    metadata: { title: 'Schedule Weeks 1-7', type: 'Weekly Outline' },
    layout: 'fullwidth',
    props: {
      title: 'Weekly Outline (Part 1)',
      element: {
        type: 'interactive-schedule-table',
        config: { part: 1 },
        data: { schedule, tlLegends, assessmentLegends, outcomes, contents },
      },
    },
  },
  {
    id: 7,
    section: 'Schedule Part 2',
    metadata: { title: 'Schedule Weeks 8-14', type: 'Weekly Outline' },
    layout: 'fullwidth',
    props: {
      title: 'Weekly Outline (Part 2)',
      element: {
        type: 'interactive-schedule-table',
        config: { part: 2 },
        data: { schedule, tlLegends, assessmentLegends, outcomes, contents },
      },
    },
  },
  {
    id: 8,
    section: 'Legends',
    metadata: { title: 'Teaching & Assessment', type: 'Strategies Index' },
    layout: 'fullwidth',
    props: {
      title: 'Teaching & Assessment Strategies',
      element: {
        type: 'reference-legends',
        data: { leftLegends: tlLegends, rightLegends: assessmentLegends },
      },
    },
  },
  {
    id: 9,
    section: 'Wrap Up',
    metadata: { title: 'Conclusion', type: 'Thank You Slide' },
    layout: 'thankyou',
    props: {
      title: 'Thank You',
      subtitle: 'Questions on Course Syllabus & Assessment Scheme?',
    },
  },
];

export const slides: Record<number, React.ComponentType<SlideProps>> = courseOutlineData.reduce((acc, curr) => {
  acc[curr.id] = (props) => <SlideSchemaEngine {...props} slideNo={curr.id} deck={courseOutlineData} />;
  return acc;
}, {} as Record<number, React.ComponentType<SlideProps>>);

export const slideMetadata = courseOutlineData.reduce((acc, curr) => {
  acc[curr.id] = {
    title: curr.metadata.title,
    type: curr.metadata.type,
    section: curr.section,
  };
  return acc;
}, {} as Record<number, { title: string; type: string; section: string }>);
