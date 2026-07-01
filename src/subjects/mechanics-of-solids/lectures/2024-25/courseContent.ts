import type { SubjectMetadata } from '@/config/lectures';

export interface CourseContentChapter {
  id: string;
  serial: number;
  title: string;
  description: string;
}

export const subjectMetadata: SubjectMetadata = {
  courseCode: 'CEE 0732 2131',
  courseTitle: 'Mechanics of Solids I',
  yearSemester: '2nd Year / 1st Semester',
  creditHours: '2.0 (Core Theory)',
};

export const outcomes = [
  { id: 1, description: 'Describe the basics of stress and strain, and explain stress-strain diagram for brittle and ductile materials.' },
  { id: 2, description: 'Calculate stresses and strains in a structural component due to axial load and determine the stresses in thin and thick-walled cylinders and spheres.' },
  { id: 3, description: 'Identify different types of Riveted and Welded connections and calculate stresses on connections and plates.' },
  { id: 4, description: 'Determine the shear force and bending moment for determinate beams.' },
  { id: 5, description: 'Determine the shear stress and bending stress of determinate beams of different shapes.' },
];

export const rationale = "This course will introduce students to the fundamentals of stress and strain, as well as their applications. Different types of joints, such as riveted joints and welded joints, and their failure mechanisms will be discussed in this course. It also teaches them how to calculate and draw the axial force, shear force, bending moment, and qualitative deflection diagram, as well as shear and bending stresses, in various shapes of determinate beams. This knowledge is essential to solving structural engineering problems.";

export const COURSE_CONTENT: CourseContentChapter[] = [
  {
    id: 'axially-loaded-stress',
    serial: 1,
    title: 'Stress analysis of axially loaded members',
    description: 'Introduction, Analysis of internal forces, Simple stress, Shearing stress, Bearing stress.',
  },
  {
    id: 'axially-loaded-strain',
    serial: 2,
    title: 'Strain analysis of axially loaded members',
    description: 'Simple strain, Stress-strain diagram, Hooke\'s law, Strain analysis of statically indeterminate members, Poisson\'s ratio: Biaxial and triaxial deformations.',
  },
  {
    id: 'cylinders-spheres',
    serial: 3,
    title: 'Stresses in thin and thick-walled cylinders and spheres',
    description: 'Stresses calculation in thin and thick-walled cylinders and spheres.',
  },
  {
    id: 'connections',
    serial: 4,
    title: 'Riveted and Welded Connections',
    description: 'Rivet, Types of riveted joints, Failure of the riveted joints, Introduction to welded connections.',
  },
  {
    id: 'sfd-bmd',
    serial: 5,
    title: 'Axial force, Shear force, bending moment and qualitative deflection diagrams',
    description: 'Definition, Shear force and bending moment for determinate beams.',
  },
  {
    id: 'bending-shear-stress',
    serial: 6,
    title: 'Bending stress and shear stress in beams',
    description: 'Definition, Shear stress and bending stress for determinate beams of different shapes.',
  },
];

export const references = [
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
