export interface Lecture {
  id: string; // matches subfolder name
  title: string;
  description: string;
  slideNo: number;
  durationMins: number;
  components?: string[]; // e.g. ["interactive-charts", "quiz-wizards", "rebar-calculators"]
  lectureNumber?: number | string; // dynamically set per topic
  topicId?: string; // Links this lecture to a topic / course content chapter
  locked?: boolean;
  hidden?: boolean;
  tags?: string[];
  quizzes?: Record<string, string>;
}

export interface CourseContentChapter {
  id: string;
  serial: number;
  title: string;
  description: string;
}

export interface SessionTopic {
  id: string;
  title: string;
  ccId: string;          // References CourseContentChapter.id
  teacherId?: string;    // References presenter key
}

export interface TopicGroup {
  topic: SessionTopic;
  lectures: Lecture[];
}

export interface Session {
  id: string;
  label: string;        // e.g. "Session 2026–27"
  lectures: Lecture[];
  topics?: TopicGroup[];
  usnCode?: string;
  session?: string;
  courseContent?: CourseContentChapter[];
}

export interface Course {
  id: string;
  courseTitle: string;
  courseCode: string;
  description: string;
  iconEmoji: string;
  color: string;        // tailwind-compatible hex or gradient string
  sessions: Session[];
  yearSemester?: string;
  creditHours?: string;
}

export type Subject = Course;

export interface SubjectMetadata {
  courseCode: string;
  courseTitle: string;
  yearSemester: string;
  creditHours: string;
}

export interface SessionMetadata {
  usnCode: string;
  session: string;
  topics?: SessionTopic[];
}

// Eagerly import all session-specific course contents
const courseContentModules = import.meta.glob<{
  subjectMetadata: SubjectMetadata;
  COURSE_CONTENT: CourseContentChapter[];
}>(
  '/src/subjects/*/lectures/*/courseContent.ts',
  { eager: true }
);

// Eagerly import all session metadata
const sessionMetadataModules = import.meta.glob<{ sessionMetadata: SessionMetadata }>(
  '/src/subjects/*/lectures/*/sessionMetadata.ts',
  { eager: true }
);

// Eagerly import all lecture metadata configs across the workspace
const metadataModules = import.meta.glob<{ metadata: Lecture }>(
  '/src/subjects/*/lectures/*/*/metadata.ts',
  { eager: true }
);

// Decorative details mapping for subject categories
const SUBJECT_DECORATIONS: Record<string, { description: string; iconEmoji: string; color: string }> = {
  'quantity-surveying': {
    description: 'Quantity take-off, Bill of Quantities (BoQ), material and resource scheduling, and budget management for civil engineering works.',
    iconEmoji: '🏗️',
    color: '#f59e0b',
  },
  'engineering-mechanics': {
    description: 'Dynamics, relative motion, cables, friction analysis, impulses, and mechanical work systems.',
    iconEmoji: '⚙️',
    color: '#ea580c',
  },
  'mechanics-of-solids': {
    description: 'Analysis of stress, strain, deformation, shear force, bending moments, bending and shear stresses in structural elements.',
    iconEmoji: '🧱',
    color: '#6366f1',
  },
};

const COURSE_SHELLS: Record<string, Course> = {};

// Helper maps to store syllabus data per subject and session
const sessionCourseContents: Record<string, Record<string, CourseContentChapter[]>> = {};

// 1. Initialize COURSE_SHELLS using SUBJECT_DECORATIONS
Object.entries(SUBJECT_DECORATIONS).forEach(([subjectId, decorations]) => {
  COURSE_SHELLS[subjectId] = {
    id: subjectId,
    courseTitle: '',
    courseCode: '',
    description: decorations.description,
    iconEmoji: decorations.iconEmoji,
    color: decorations.color,
    sessions: [],
  };
});

// Populate metadata from courseContent files
Object.entries(courseContentModules).forEach(([path, module]) => {
  const match = path.match(/\/subjects\/([^/]+)\/lectures\/([^/]+)\/courseContent\.ts$/);
  if (!match) return;
  const subjectId = match[1];
  const sessionId = match[2];
  if (!subjectId || !sessionId) return;

  const metadata = module.subjectMetadata;
  const courseContent = module.COURSE_CONTENT;

  if (!sessionCourseContents[subjectId]) {
    sessionCourseContents[subjectId] = {};
  }
  sessionCourseContents[subjectId][sessionId] = courseContent;

  const shell = COURSE_SHELLS[subjectId];
  if (shell) {
    shell.courseTitle = metadata.courseTitle;
    shell.courseCode = metadata.courseCode;
    shell.yearSemester = metadata.yearSemester;
    shell.creditHours = metadata.creditHours;
  }
});

// Helper to find session metadata
const findSessionMetadata = (subjectId: string, sessionId: string): SessionMetadata | null => {
  const targetPath = `/src/subjects/${subjectId}/lectures/${sessionId}/sessionMetadata.ts`;
  const module = sessionMetadataModules[targetPath];
  return module ? module.sessionMetadata : null;
};

// 2. Process modules to populate the COURSE_SHELLS with sessions and lectures
Object.entries(metadataModules).forEach(([path, module]) => {
  const match = path.match(/\/subjects\/([^/]+)\/lectures\/((?:session-)?\d{4}(?:-\d{2,4})?)\//);
  if (!match) return;

  const subjectId = match[1];
  const sessionId = match[2];
  if (!subjectId || !sessionId) return;

  const course = COURSE_SHELLS[subjectId];
  if (!course) return;

  // Find or create session
  let session = course.sessions.find((s) => s.id === sessionId);
  if (!session) {
    const sessionMeta = findSessionMetadata(subjectId, sessionId);
    const courseContent = sessionCourseContents[subjectId]?.[sessionId] || [];

    session = {
      id: sessionId,
      label: sessionMeta ? sessionMeta.session : `Session ${sessionId}`,
      usnCode: sessionMeta?.usnCode,
      session: sessionMeta?.session,
      lectures: [],
      courseContent: courseContent,
    };
    course.sessions.push(session);
  }

  // Clone module metadata config to prevent shared mutations
  const lectureConfig = { ...module.metadata };
  session.lectures.push(lectureConfig);
});

// 3. Post-process sessions to group lectures by topic and sequential index
Object.values(COURSE_SHELLS).forEach((course) => {
  course.sessions.forEach((session) => {
    const sessionMeta = findSessionMetadata(course.id, session.id);
    const sessionTopics = sessionMeta?.topics || [];

    const groups: Record<string, Lecture[]> = {};
    const overviewLectures: Lecture[] = [];
    const fallbackLectures: Lecture[] = [];

    session.lectures.forEach((lecture) => {
      if (lecture.lectureNumber === 'Outline' || lecture.id === 'course-outline') {
        overviewLectures.push(lecture);
      } else if (lecture.topicId) {
        const tId = lecture.topicId;
        let grp = groups[tId];
        if (!grp) {
          grp = [];
          groups[tId] = grp;
        }
        grp.push(lecture);
      } else {
        fallbackLectures.push(lecture);
      }
    });

    // Sort helper for lectures
    const sortLectures = (list: Lecture[]) => {
      list.sort((a, b) => {
        const getSortValue = (lecture: Lecture): number => {
          const num = lecture.lectureNumber;
          if (num === undefined || num === null) return Infinity;
          if (typeof num === 'number') return num;
          if (typeof num === 'string') {
            const parsed = parseFloat(num);
            return isNaN(parsed) ? Infinity : parsed;
          }
          return Infinity;
        };
        const valA = getSortValue(a);
        const valB = getSortValue(b);
        if (valA !== valB) return valA - valB;
        return a.slideNo - b.slideNo;
      });
    };

    // Sort overview lectures (Outline)
    overviewLectures.sort((a, b) => a.slideNo - b.slideNo);

    // Number lectures sequentially starting from 1 inside each topic group
    Object.keys(groups).forEach((topicId) => {
      const list = groups[topicId];
      if (list) {
        sortLectures(list);
        list.forEach((lecture, idx) => {
          lecture.lectureNumber = idx + 1; // 1-based sequential number per topic!
        });
      }
    });

    // Sort fallback lectures if any
    if (fallbackLectures.length > 0) {
      sortLectures(fallbackLectures);
      fallbackLectures.forEach((lecture, idx) => {
        if (typeof lecture.lectureNumber !== 'number') {
          lecture.lectureNumber = idx + 1;
        }
      });
    }

    const topicGroups: TopicGroup[] = [];

    // 1. Overview topic (Syllabus outline)
    if (overviewLectures.length > 0) {
      topicGroups.push({
        topic: {
          id: 'overview',
          title: 'Course Overview & Syllabus',
          ccId: '',
        },
        lectures: overviewLectures,
      });
    }

    // 2. Session defined topics in sequence
    sessionTopics.forEach((sTopic) => {
      const lectures = groups[sTopic.id] || [];
      topicGroups.push({
        topic: sTopic,
        lectures: lectures,
      });
    });

    // 3. Other topic groups defined in lectures but not listed in sessionMetadata
    Object.keys(groups).forEach((topicId) => {
      if (!sessionTopics.some((t) => t.id === topicId)) {
        const matchedCC = session.courseContent?.find((cc) => cc.id === topicId);
        topicGroups.push({
          topic: {
            id: topicId,
            title: matchedCC ? matchedCC.title : `Topic: ${topicId}`,
            ccId: matchedCC ? matchedCC.id : '',
          },
          lectures: groups[topicId] || [],
        });
      }
    });

    // 4. Fallback / unclassified general lectures
    if (fallbackLectures.length > 0) {
      topicGroups.push({
        topic: {
          id: 'general',
          title: 'General Lectures',
          ccId: '',
        },
        lectures: fallbackLectures,
      });
    }

    session.topics = topicGroups;

    // Flatten back into sorted lectures array so other slide navigations continue to work
    const sortedLectures: Lecture[] = [];
    topicGroups.forEach((group) => {
      sortedLectures.push(...group.lectures);
    });
    session.lectures = sortedLectures;
  });
});

// Export aggregated subjects list
export const SUBJECTS: Course[] = Object.values(COURSE_SHELLS).filter(
  (course) => course.sessions.length > 0
);
