import { vi, describe, test, expect, beforeEach } from 'vitest';
import { FirebaseService } from '../firebaseService';
import { signInAnonymously } from 'firebase/auth';

// Mock Firebase Auth
vi.mock('firebase/auth', () => ({
  getAuth: vi.fn(() => ({
    currentUser: {
      uid: 'student_123'
    }
  })),
  signInAnonymously: vi.fn().mockResolvedValue({
    user: { uid: 'mock_anonymous_uid' }
  })
}));

vi.mock('firebase/app', () => ({
  initializeApp: vi.fn(() => ({}))
}));

describe('FirebaseService Core Auth', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('should authenticate user anonymously and return uid', async () => {
    import.meta.env['VITE_FIREBASE_API_KEY'] = 'test-api-key';
    const authService = new FirebaseService();
    authService.initializeFirebase();
    const uid = await authService.anonymousSignIn();

    expect(uid).toBe('mock_anonymous_uid');
    expect(signInAnonymously).toHaveBeenCalled();
    import.meta.env['VITE_FIREBASE_API_KEY'] = 'MOCK_API_KEY';
  });
});
