import { describe, it, expect } from 'vitest';
import { SUBJECTS } from '../lectures';

describe('Academic Registry Integrity', () => {
  it('should verify that all academic sessions have a valid course content configuration', () => {
    expect(SUBJECTS.length).toBeGreaterThan(0);
    SUBJECTS.forEach((subject) => {
      expect(subject.id).toBeDefined();
      expect(subject.courseTitle).toBeDefined();
      expect(subject.courseCode).toBeDefined();

      subject.sessions.forEach((session) => {
        expect(session.courseContent).toBeDefined();
        expect(Array.isArray(session.courseContent)).toBe(true);

        // Verify each chapter structure
        session.courseContent?.forEach((chapter) => {
          expect(chapter.id).toBeDefined();
          expect(chapter.serial).toBeGreaterThan(0);
          expect(chapter.title).toBeDefined();
          expect(chapter.description).toBeDefined();
        });
      });
    });
  });

  it('should verify that all active sessions have valid topic definitions', () => {
    SUBJECTS.forEach((subject) => {
      subject.sessions.forEach((session) => {
        expect(session.id).toBeDefined();
        expect(session.label).toBeDefined();
        
        // If topics are defined, ensure each links to a valid Course Content ID
        if (session.topics) {
          expect(Array.isArray(session.topics)).toBe(true);
          session.topics.forEach((group) => {
            expect(group.topic.id).toBeDefined();
            expect(group.topic.title).toBeDefined();
            expect(Array.isArray(group.lectures)).toBe(true);

            // Skip validation for system topics (overview, general)
            if (group.topic.id !== 'overview' && group.topic.id !== 'general') {
              expect(group.topic.ccId).toBeDefined();
              const matchedCC = session.courseContent?.some((cc) => cc.id === group.topic.ccId);
              expect(matchedCC).toBe(true);
            }
          });
        }
      });
    });
  });

  it('should verify that all registered lectures match defined topics', () => {
    SUBJECTS.forEach((subject) => {
      subject.sessions.forEach((session) => {
        session.lectures.forEach((lecture) => {
          expect(lecture.id).toBeDefined();
          expect(lecture.title).toBeDefined();
          expect(lecture.slideNo).toBeGreaterThan(0);

          // If a lecture has a topicId, it must exist in the session's topic list or course contents
          if (lecture.topicId) {
            const hasMatchingTopic = session.topics?.some((t) => t.topic.id === lecture.topicId);
            const hasMatchingCC = session.courseContent?.some((cc) => cc.id === lecture.topicId);
            expect(hasMatchingTopic || hasMatchingCC).toBe(true);
          }
        });
      });
    });
  });
});
