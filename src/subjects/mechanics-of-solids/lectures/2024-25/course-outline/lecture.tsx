import React from 'react';
import { SlideSchema } from '@/features/presentation/types/schema';
import { SlideSchemaEngine } from '@/features/presentation/components/slides/SlideSchemaEngine';
import { SlideProps } from '@/features/presentation/components/slides/SlideRenderer';
import presenterData from '@/config/presenter.json';
import strategyData from '@/config/cee-tl-assessment-strategy-v1.json';

const { tlLegends, assessmentLegends } = strategyData;

const metadata = {
  courseCode: 'CEE 0732 2131',
  courseTitle: 'Mechanics of Solids I',
  credit: '02',
  category: 'Core',
  courseType: 'Theory',
  yearSemester: '2nd Year / 1st Semester',
  teacher: presenterData,
  session: '2024-25',
  usn: '2026-1',
};

const outcomes = [
  { id: 1, description: 'Describe the basics of stress and strain, and explain stress-strain diagram for brittle and ductile materials.' },
  { id: 2, description: 'Calculate stresses and strains in a structural component due to axial load and determine the stresses in thin and thick-walled cylinders and spheres.' },
  { id: 3, description: 'Identify different types of Riveted and Welded connections and calculate stresses on connections and plates.' },
  { id: 4, description: 'Determine the shear force and bending moment for determinate beams.' },
  { id: 5, description: 'Determine the shear stress and bending stress of determinate beams of different shapes.' },
];

const rationale = "This course will introduce students to the fundamentals of stress and strain, as well as their applications. Different types of joints, such as riveted joints and welded joints, and their failure mechanisms will be discussed in this course. It also teaches them how to calculate and draw the axial force, shear force, bending moment, and qualitative deflection diagram, as well as shear and bending stresses, in various shapes of determinate beams. This knowledge is essential to solving structural engineering problems.";

const contents = [
  { id: 1, title: 'Stress analysis of axially loaded members', description: 'Introduction, Analysis of internal forces, Simple stress, Shearing stress, Bearing stress.' },
  { id: 2, title: 'Strain analysis of axially loaded members', description: 'Simple strain, Stress-strain diagram, Hooke\'s law, Strain analysis of statically indeterminate members, Poisson\'s ratio: Biaxial and triaxial deformations.' },
  { id: 3, title: 'Stresses in thin and thick-walled cylinders and spheres', description: 'Stresses calculation in thin and thick-walled cylinders and spheres.' },
  { id: 4, title: 'Riveted and Welded Connections', description: 'Rivet, Types of riveted joints, Failure of the riveted joints, Introduction to welded connections.' },
  { id: 5, title: 'Axial force, Shear force, bending moment and qualitative deflection diagrams', description: 'Definition, Shear force and bending moment for determinate beams.' },
  { id: 6, title: 'Bending stress and shear stress in beams', description: 'Definition, Shear stress and bending stress for determinate beams of different shapes.' },
];

const references = [
  {
    id: 1,
    title: 'Strength of Materials',
    author: 'Ferdinand L. Singer & Andrew Pytel',
    edition: '4th Edition',
    publisher: 'Harper & Row / UBS Publishers',
  },
  {
    id: 2,
    title: 'Mechanics of Materials',
    author: 'R.C. Hibbeler',
    edition: '10th Edition',
    publisher: 'Pearson',
  },
];

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
    id: 3,
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
    id: 4,
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
    id: 5,
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
    id: 6,
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
    id: 7,
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
    id: 8,
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
