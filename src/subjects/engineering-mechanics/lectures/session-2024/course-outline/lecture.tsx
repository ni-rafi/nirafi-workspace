import React from 'react';
import { SlideSchema } from '@/features/presentation/types/schema';
import { SlideSchemaEngine } from '@/features/presentation/components/slides/SlideSchemaEngine';
import { SlideProps } from '@/features/presentation/components/slides/SlideRenderer';
import presenterData from '@/config/presenter.json';
import strategyData from '@/config/cee-tl-assessment-strategy-v1.json';

const metadata = {
  courseCode: 'CEE 0541 1233',
  courseTitle: 'Engineering Mechanics II',
  credit: '02',
  category: 'Core',
  courseType: 'Theory',
  yearSemester: '1st Year / 2nd Semester',
  teacher: presenterData,
  session: '2024-25',
  usn: '2024-2',
};

const outcomes = [
  { id: 1, description: 'Explain basic friction concepts and solve problems on wedges, belts, and bearings using these concepts.' },
  { id: 2, description: 'Interpret parabolic cable and catenary and calculate force on a cable support system.' },
  { id: 3, description: 'Identify basic concepts of kinematics and calculate displacement, velocity and acceleration of a particle and rigid body in motion.' },
  { id: 4, description: 'Apply different principles of kinetics to solve related problems.' },
];

const rationale = "This course introduces the relevant physical properties and fundamental laws governing materials and structures' behavior, and students will learn how to solve various problems of interest to civil and environmental engineers. In this course, the emphasis is on the physical understanding of why a material or structure behaves the way it does in the engineering design of materials and structures.";

const contents = [
  { id: 1, title: 'Fundamentals of Friction', description: 'This chapter presents frictional force, limiting frictional force, coefficient of kinetic friction, laws of friction, angle of friction, belt friction, and pivot friction.' },
  { id: 2, title: 'Flexible Cord', description: 'This chapter presents the parabolic chord, the length of the parabolic curve, the catenary.' },
  { id: 3, title: 'Plane Motion', description: 'Review of Displacement, Velocity, Acceleration, Constant Acceleration-Rectilinear Motion, Variable Acceleration, Angular Velocity, Relation Between Angular And Linear Speeds, Angular Acceleration, Constant Angular Acceleration, Curvilinear Motion, Tangential And Normal Accelerations.' },
  { id: 4, title: 'Fundamentals of Relative Motion', description: 'This chapter presents relative displacement, relative velocity, and relative motion of points in a rigid body.' },
  { id: 5, title: 'Force System for Rectilinear Motion', description: 'Introduction, Newton’s Laws of Motion, Component Forces and Accelerations, Motion on an Inclined Planes, Motion of Connected Bodies, Motion of Center of Gravity of a Rigid Body, Location of the Resultant – Body in Rectilinear Translation, Inertia Force, Methods of Solving Problems.' },
  { id: 6, title: 'Work, Kinetic Energy and Power', description: 'Work, Work of a System of Forces Acting on a Rigid Body, Principle of Work and Kinetic Energy, Kinetic Energy of a Rigid Body in Translation, Potential Energy, Work of a Couple, Kinetic Energy of a Rotating Body, Bodies in Plane Motion, Frictional Force in Plane Rolling, Power, Efficiency.' },
  { id: 7, title: 'Fundamentals of Impulse and Momentum', description: 'This chapter presents impulse and momentum, principle of impulse and momentum, angular impulse and angular momentum, linear momentum and conservation of linear momentum.' },
];

const { tlLegends, assessmentLegends } = strategyData;

const references = [
  {
    id: 1,
    title: 'Vector Mechanics for Engineers: Statics and Dynamics',
    author: 'Ferdinand P. Beer, E. Russell Johnston Jr., Phillip J. Cornwell, David F. Mazurek',
    edition: '12th Edition',
    publisher: 'McGraw-Hill Education',
  },
  {
    id: 2,
    title: 'Engineering Mechanics: Statics & Dynamics',
    author: 'Russell C. Hibbeler',
    edition: '14th Edition',
    publisher: 'Pearson',
  },
  {
    id: 3,
    title: 'Engineering Mechanics: Dynamics',
    author: 'J. L. Meriam, L. G. Kraige, J. N. Bolton',
    edition: '8th Edition',
    publisher: 'Wiley',
  },
];

const schedule = [
  { week: 1, topic: 'Introduction to CEE 0541 1233', contentCode: '---', coCovered: '---', tlStrategy: ['TL 01'], assessmentStrategy: ['---'] },
  { week: 2, topic: 'Fundamentals of friction', contentCode: '1', coCovered: '1', tlStrategy: ['TL 01', 'TL 02'], assessmentStrategy: ['CA 01', 'SA 01'] },
  { week: 3, topic: 'Friction Problem Solving / Applications of Friction', contentCode: '1', coCovered: '1', tlStrategy: ['TL 01', 'TL 02', 'TL 07'], assessmentStrategy: ['CA 01', 'CA 03', 'SA 01'] },
  { week: 4, topic: 'Wedge Mechanics & Problem Solving / Wedge Problems', contentCode: '1', coCovered: '1', tlStrategy: ['TL 01', 'TL 02', 'TL 07'], assessmentStrategy: ['CA 01', 'CA 03', 'SA 01'] },
  { week: 5, topic: 'Belt Friction: Concepts & Problems / Analysis and Applications of Belt Friction', contentCode: '1', coCovered: '1', tlStrategy: ['TL 01', 'TL 02', 'TL 07'], assessmentStrategy: ['CA 01', 'SA 01'] },
  { week: 6, topic: 'Plane Motion: Fundamental Concepts & Problems', contentCode: '2', coCovered: '3', tlStrategy: ['TL 01', 'TL 02', 'TL 07'], assessmentStrategy: ['SA 01'] },
  { week: 7, topic: 'Mid-Term Examination. Covers all material from Weeks 2 through 5.', contentCode: '---', coCovered: '---', tlStrategy: ['---'], assessmentStrategy: ['---'] },
  { week: 8, topic: 'Erratic Motion & Graphical Method', contentCode: '2', coCovered: '3', tlStrategy: ['TL 01', 'TL 02', 'TL 07'], assessmentStrategy: ['SA 01'] },
  { week: 9, topic: 'Curvilinear Motion: Concepts & Problems', contentCode: '2', coCovered: '3', tlStrategy: ['TL 01', 'TL 02', 'TL 07'], assessmentStrategy: ['CA 03', 'SA 01'] },
  { week: 10, topic: 'Relative Motion: Theory & Problems', contentCode: '3', coCovered: '3', tlStrategy: ['TL 01', 'TL 02', 'TL 07'], assessmentStrategy: ['CA 03', 'SA 01'] },
  { week: 11, topic: 'Parabolic Cords: Analysis & Problems', contentCode: '4', coCovered: '2', tlStrategy: ['TL 01', 'TL 02', 'TL 07'], assessmentStrategy: ['SA 01'] },
  { week: 12, topic: 'Catenary Cords: Analysis & Problems', contentCode: '4', coCovered: '2', tlStrategy: ['TL 01', 'TL 02', 'TL 07'], assessmentStrategy: ['SA 01'] },
  { week: 13, topic: 'Problem solving related to cords.', contentCode: '4', coCovered: '2', tlStrategy: ['TL 01', 'TL 02', 'TL 07'], assessmentStrategy: ['SA 01'] },
  { week: 14, topic: 'Review Session', contentCode: '---', coCovered: '---', tlStrategy: ['---'], assessmentStrategy: ['---'] },
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
      creditHours: `${metadata.credit} (Core Theory)`,
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
          fragments: [
            rationale,
          ],
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
            "These outcomes guide our learning journey, aligning specific engineering principles with practical problem-solving skillsets."
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
        badge: `CC ${c.id}`,
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
      title: 'Weekly Outline',
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
      title: 'Weekly Outline',
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
