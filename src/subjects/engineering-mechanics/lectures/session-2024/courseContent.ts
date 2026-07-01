import type { SubjectMetadata } from '@/config/lectures';

export interface CourseContentChapter {
  id: string;
  serial: number;
  title: string;
  description: string;
}

export const subjectMetadata: SubjectMetadata = {
  courseCode: 'CEE 0541 1233',
  courseTitle: 'Engineering Mechanics II',
  yearSemester: '1st Year / 2nd Semester',
  creditHours: '2.0 (Core Theory)',
};

export const outcomes = [
  { id: 1, description: 'Explain basic friction concepts and solve problems on wedges, belts, and bearings using these concepts.' },
  { id: 2, description: 'Interpret parabolic cable and catenary and calculate force on a cable support system.' },
  { id: 3, description: 'Identify basic concepts of kinematics and calculate displacement, velocity and acceleration of a particle and rigid body in motion.' },
  { id: 4, description: 'Apply different principles of kinetics to solve related problems.' },
];

export const rationale = "This course introduces the relevant physical properties and fundamental laws governing materials and structures' behavior, and students will learn how to solve various problems of interest to civil and environmental engineers. In this course, the emphasis is on the physical understanding of why a material or structure behaves the way it does in the engineering design of materials and structures.";

export const COURSE_CONTENT: CourseContentChapter[] = [
  {
    id: 'friction',
    serial: 1,
    title: 'Fundamentals of Friction',
    description: 'This chapter presents frictional force, limiting frictional force, coefficient of kinetic friction, laws of friction, angle of friction, belt friction, and pivot friction.',
  },
  {
    id: 'flexible-cord',
    serial: 2,
    title: 'Flexible Cord',
    description: 'This chapter presents the parabolic chord, the length of the parabolic curve, the catenary.',
  },
  {
    id: 'plane-motion',
    serial: 3,
    title: 'Plane Motion',
    description: 'Review of Displacement, Velocity, Acceleration, Constant Acceleration-Rectilinear Motion, Variable Acceleration, Angular Velocity, Relation Between Angular And Linear Speeds, Angular Acceleration, Constant Angular Acceleration, Curvilinear Motion, Tangential And Normal Accelerations.',
  },
  {
    id: 'relative-motion',
    serial: 4,
    title: 'Fundamentals of Relative Motion',
    description: 'This chapter presents relative displacement, relative velocity, and relative motion of points in a rigid body.',
  },
  {
    id: 'rectilinear-force',
    serial: 5,
    title: 'Force System for Rectilinear Motion',
    description: 'Introduction, Newton’s Laws of Motion, Component Forces and Accelerations, Motion on an Inclined Planes, Motion of Connected Bodies, Motion of Center of Gravity of a Rigid Body, Location of the Resultant – Body in Rectilinear Translation, Inertia Force, Methods of Solving Problems.',
  },
  {
    id: 'work-energy',
    serial: 6,
    title: 'Work, Kinetic Energy and Power',
    description: 'Work, Work of a System of Forces Acting on a Rigid Body, Principle of Work and Kinetic Energy, Kinetic Energy of a Rigid Body in Translation, Potential Energy, Work of a Couple, Kinetic Energy of a Rotating Body, Bodies in Plane Motion, Frictional Force in Plane Rolling, Power, Efficiency.',
  },
  {
    id: 'impulse-momentum',
    serial: 7,
    title: 'Fundamentals of Impulse and Momentum',
    description: 'This chapter presents impulse and momentum, principle of impulse and momentum, angular impulse and angular momentum, linear momentum and conservation of linear momentum.',
  },
];

export const references = [
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
