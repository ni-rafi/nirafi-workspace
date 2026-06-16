import { vi, describe, test, expect, beforeEach } from 'vitest';
import { createUserContext } from '../composables/useUserContext';
import type { IFirebaseService } from '../IFirebaseService';
import type { UserPayload } from '../firebase.schemas';

// Mock Firebase Auth
const mockOnAuthStateChanged = vi.fn();
const mockIdTokenResult = vi.fn().mockResolvedValue({ claims: {} });

vi.mock('firebase/auth', () => ({
  getAuth: vi.fn(() => ({
    currentUser: {
      uid: 'user_123',
      getIdTokenResult: mockIdTokenResult
    }
  })),
  onAuthStateChanged: (_auth: unknown, callback: (user: { uid: string; getIdTokenResult: () => Promise<unknown> } | null) => void) => {
    mockOnAuthStateChanged(callback);
    // Simulate user authenticated initially
    callback({
      uid: 'user_123',
      getIdTokenResult: mockIdTokenResult
    });
    return () => {};
  },
  signOut: vi.fn().mockResolvedValue(undefined)
}));

describe('Central User Context & Composable', () => {
  let mockFirebaseService: IFirebaseService;
  let storedProfile: UserPayload | null = null;

  beforeEach(() => {
    vi.clearAllMocks();
    storedProfile = null;

    mockFirebaseService = {
      initializeFirebase: vi.fn(),
      anonymousSignIn: vi.fn().mockResolvedValue('anonymous_uid'),
      submitQuizResponse: vi.fn(),
      submitFeedback: vi.fn(),
      getUserProfile: vi.fn().mockImplementation(async () => storedProfile),
      setUserProfile: vi.fn().mockImplementation(async (uid, profile) => {
        storedProfile = { id: uid, ...profile };
        return storedProfile;
      })
    };
  });

  test('should initialize and resolve student role with gate false if profile does not exist', async () => {
    storedProfile = null;
    mockIdTokenResult.mockResolvedValue({ claims: { role: 'student' } });

    const context = createUserContext(mockFirebaseService);

    // Give time to resolve microtask queue for callbacks
    await new Promise((resolve) => setTimeout(resolve, 0));

    expect(context.uid.value).toBe('user_123');
    expect(context.role.value).toBe('student');
    expect(context.isGatePassed.value).toBe(false);
    expect(context.registration.value).toBeNull();
  });

  test('should resolve student role with gate true if profile already exists', async () => {
    storedProfile = {
      id: 'user_123',
      name: 'Jane Doe',
      registration: '2016333012',
      session: '2016-17',
      role: 'student'
    };
    mockIdTokenResult.mockResolvedValue({ claims: {} }); // default role resolving falls back to student profile

    const context = createUserContext(mockFirebaseService);
    await new Promise((resolve) => setTimeout(resolve, 0));

    expect(context.role.value).toBe('student');
    expect(context.isGatePassed.value).toBe(true);
    expect(context.registration.value).toBe('2016333012');
    expect(context.session.value).toBe('2016-17');
    expect(context.name.value).toBe('Jane Doe');
  });

  test('should resolve admin role and auto-pass gate if token claim indicates admin', async () => {
    mockIdTokenResult.mockResolvedValue({ claims: { role: 'admin' } });

    const context = createUserContext(mockFirebaseService);
    await new Promise((resolve) => setTimeout(resolve, 0));

    expect(context.role.value).toBe('admin');
    expect(context.isGatePassed.value).toBe(true);
    expect(context.name.value).toBe('Administrator');
  });

  test('should reject invalid inputs on updateGateInfo', async () => {
    storedProfile = null;
    mockIdTokenResult.mockResolvedValue({ claims: {} });

    const context = createUserContext(mockFirebaseService);
    await new Promise((resolve) => setTimeout(resolve, 0));

    // Too short registration
    await expect(context.updateGateInfo('123', '2016-17', 'Test')).rejects.toThrow();

    // Mathematically invalid session
    await expect(context.updateGateInfo('2016333012', '2016-19', 'Test')).rejects.toThrow();
  });

  test('should successfully write and pass gate with normalized valid inputs', async () => {
    storedProfile = null;
    mockIdTokenResult.mockResolvedValue({ claims: {} });

    const context = createUserContext(mockFirebaseService);
    await new Promise((resolve) => setTimeout(resolve, 0));

    // Inputs with weird formatting that should normalize
    await context.updateGateInfo('2016-333-012', '2016/2017', '  Bob Builder ');

    expect(context.registration.value).toBe('2016333012');
    expect(context.session.value).toBe('2016-17');
    expect(context.name.value).toBe('Bob Builder');
    expect(context.isGatePassed.value).toBe(true);
  });
});
