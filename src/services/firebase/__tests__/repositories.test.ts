import { vi, describe, test, expect, beforeEach } from 'vitest';
import { SubmissionsRepository } from '../repositories/submissions/SubmissionsRepository';
import { FeedbackRepository } from '../repositories/feedback/FeedbackRepository';

// Mock Firebase Auth
vi.mock('firebase/auth', () => ({
  getAuth: vi.fn(() => ({
    currentUser: {
      uid: 'student_123',
      getIdTokenResult: vi.fn().mockResolvedValue({
        claims: { role: 'student' }
      })
    }
  }))
}));

// Mock Firebase Firestore
vi.mock('firebase/firestore', () => ({
  getFirestore: vi.fn(() => ({})),
  collection: vi.fn(),
  addDoc: vi.fn().mockResolvedValue({ id: 'new_doc_id' }),
  doc: vi.fn(),
  getDoc: vi.fn(),
  getDocs: vi.fn(),
  updateDoc: vi.fn(),
  deleteDoc: vi.fn()
}));

describe('Concrete Repositories', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('SubmissionsRepository should successfully save a quiz response', async () => {
    const repo = new SubmissionsRepository();
    const payload = {
      studentUid: 'student_123',
      studentName: 'John Doe',
      studentRegistration: '2016333012',
      quizId: 'quiz_1',
      questionText: 'What is 1+1?',
      selectedOptionIndex: 1,
      isCorrect: true,
      timestamp: Date.now()
    };

    const doc = await repo.create(payload);
    expect(doc.id).toBe('new_doc_id');
    expect(doc.studentName).toBe('John Doe');
  });

  test('FeedbackRepository should successfully save user feedback', async () => {
    const repo = new FeedbackRepository();
    const payload = {
      studentUid: 'student_123',
      studentName: 'John Doe',
      studentRegistration: '2016333012',
      lectureId: 'lecture_2',
      rating: 5,
      comments: 'Excellent presentation!',
      timestamp: Date.now()
    };

    const doc = await repo.create(payload);
    expect(doc.id).toBe('new_doc_id');
    expect(doc.rating).toBe(5);
  });
});
