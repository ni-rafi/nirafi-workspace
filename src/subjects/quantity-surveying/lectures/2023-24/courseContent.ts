import type { SubjectMetadata } from '@/config/lectures';

export interface CourseContentChapter {
  id: string;
  serial: number;
  title: string;
  description: string;
}

export const subjectMetadata: SubjectMetadata = {
  courseCode: 'CEE 0731 2224',
  courseTitle: 'Quantity Surveying',
  yearSemester: '2nd Year / 2nd Semester',
  creditHours: '1.0 (Practice/Lab)',
};

export const outcomes = [
  { id: 1, description: 'Demonstrate skills for the budget preparation of a project' },
  { id: 2, description: 'Prepare the bill of quantity for different work packages of a project' },
  { id: 3, description: 'Evaluate the contractor’s progress payment.' },
];

export const rationale = "This course will familiarize the students with the quantity take-off or bill of quantity (BoQ) of different materials, equipment, and resources for a civil engineering project. This knowledge is essential for the budget preparation, material/resource scheduling, and time and cost management of any civil structure and infrastructure projects.";

export const COURSE_CONTENT: CourseContentChapter[] = [
  {
    id: 'fundamentals',
    serial: 1,
    title: 'Fundamentals of Quantity Surveying',
    description: 'Basic theories and concepts of quantity surveying, different tools and techniques of estimation, and introduction of the relevant documents required to prepare estimation for a project.',
  },
  {
    id: 'building-estimation',
    serial: 2,
    title: 'Estimation of the building structure',
    description: 'Measurement of materials and works, types of estimates, conceptual and detail estimates of a two-storied building. Estimation of quantities of steel & RCC elements of a multi-storied residential building. Estimation of plumbing and drainage (pipes, fittings, and fixtures) system of a building, water reservoir, and septic tank. Detail estimation of a one-story steel structure.',
  },
  {
    id: 'roadway',
    serial: 3,
    title: 'Estimation of roadway',
    description: 'Computation of earth cutting and filling using various methods, basic estimation of materials required for the rigid and flexible pavements.',
  },
  {
    id: 'retaining-wall-culvert',
    serial: 4,
    title: 'Estimation of a retaining wall and a culvert',
    description: 'Introduction to various types of retaining walls and culverts. Estimation of materials required to construct a retaining wall and a culvert.',
  },
];

export const references = [
  {
    id: 1,
    title: 'Estimating and Costing in Civil Engineering: Theory and Practice',
    author: 'B.N. Dutta',
    edition: '28th Edition',
    publisher: 'UBS Publishers Distributors',
  },
  {
    id: 2,
    title: 'Quantity Surveying: For Building and Civil Engineering Works',
    author: 'P.L. Bhasin',
    edition: '3rd Edition',
    publisher: 'S. Chand & Company',
  },
];
