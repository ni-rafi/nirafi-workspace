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
  credit: '1.0',
  category: 'Sessional',
  courseType: 'Practice/Lab',
  yearSemester: subjectMetadata.yearSemester,
  teacher: presenterData,
  session: '2023-24',
  usn: '2025-2',
};

const contents = COURSE_CONTENT.map((cc) => ({
  id: cc.serial,
  title: cc.title,
  description: cc.description,
}));


const schedule = [
  { week: 1, topic: 'Fundamentals of Quantity Surveying', contentCode: '1', coCovered: '1, 2', tlStrategy: ['TL 01', 'TL 06'], assessmentStrategy: ['CA 03', 'CA 04', 'SA 01', 'SA 02'] },
  { week: 2, topic: 'Estimation of Building Structure: Substructure', contentCode: '2', coCovered: '2', tlStrategy: ['TL 01', 'TL 03', 'TL 06'], assessmentStrategy: ['CA 03', 'CA 04', 'SA 01', 'SA 02'] },
  { week: 3, topic: 'Estimation of Building Structure: Superstructure', contentCode: '2', coCovered: '2', tlStrategy: ['TL 01', 'TL 03', 'TL 06'], assessmentStrategy: ['CA 03', 'CA 04', 'SA 01', 'SA 02'] },
  { week: 4, topic: 'Estimation of Steel & RCC Elements', contentCode: '2', coCovered: '2', tlStrategy: ['TL 01', 'TL 03', 'TL 06'], assessmentStrategy: ['CA 03', 'CA 04', 'SA 01', 'SA 02'] },
  { week: 5, topic: 'Detail Estimation of Steel Structure', contentCode: '2', coCovered: '2', tlStrategy: ['TL 01', 'TL 03', 'TL 06'], assessmentStrategy: ['CA 03', 'CA 04', 'SA 01', 'SA 02'] },
  { week: 6, topic: 'Estimation of Plumbing and Drainage System', contentCode: '2', coCovered: '2', tlStrategy: ['TL 01', 'TL 03', 'TL 06'], assessmentStrategy: ['CA 03', 'CA 04', 'SA 01', 'SA 02'] },
  { week: 7, topic: 'Mid-Semester Portfolio Check', contentCode: '---', coCovered: '---', tlStrategy: ['---'], assessmentStrategy: ['CA 01'] },
  { week: 8, topic: 'Estimation of Water Reservoir and Septic Tank', contentCode: '2', coCovered: '2', tlStrategy: ['TL 01', 'TL 03', 'TL 06'], assessmentStrategy: ['CA 03', 'CA 04', 'SA 01', 'SA 02'] },
  { week: 9, topic: 'Estimation of Roadway: Earthwork', contentCode: '3', coCovered: '2', tlStrategy: ['TL 01', 'TL 03', 'TL 06'], assessmentStrategy: ['CA 03', 'CA 04', 'SA 01', 'SA 02'] },
  { week: 10, topic: 'Estimation of Roadway: Pavements, Retaining Wall & Culvert', contentCode: '3, 4', coCovered: '2', tlStrategy: ['TL 01', 'TL 03', 'TL 06'], assessmentStrategy: ['CA 03', 'CA 04', 'SA 01', 'SA 02'] },
  { week: 11, topic: 'Contractor Progress Payments & Project Budgeting', contentCode: '2', coCovered: '1, 3', tlStrategy: ['TL 01', 'TL 03', 'TL 06'], assessmentStrategy: ['CA 03', 'CA 04', 'SA 01', 'SA 02'] },
  { week: 12, topic: 'Final Review & Viva', contentCode: '---', coCovered: '---', tlStrategy: ['---'], assessmentStrategy: ['SA 02'] },
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
      creditHours: `${metadata.credit} (${metadata.category})`,
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
          fragments: [
            rationale,
          ],
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
      title: 'Course Outcomes (COs)',
      leftWidth: '60%',
      leftElement: {
        type: 'highlightable-list',
        data: { outcomes, coCoveredIds: [1, 2, 3], listTitle: 'By the end of this course, students will be able to:', highlightLabel: 'Active Goals' },
      },
      rightElement: {
        type: 'rich-paragraph',
        data: {
          fragments: [
            "These outcomes guide our learning journey, aligning specific estimating tasks with practical industry skillsets."
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
      dense: true,
      items: contents.map((c) => ({
        title: c.title,
        description: `Chapter ${c.id} outline and objectives.`,
        badge: `CC ${c.id}`,
        badgeColor: 'border-primary/30 text-primary bg-primary/5',
        rightContent: c.description,
      })),
    },
  },
  {
    id: 6,
    section: 'Weekly Outline',
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
    section: 'Weekly Outline',
    metadata: { title: 'Schedule Weeks 8-12', type: 'Weekly Outline' },
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
    metadata: { title: 'Teaching & Assessment', type: 'Strategies index' },
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
