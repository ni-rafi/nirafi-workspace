import { vi, describe, test, expect, beforeEach } from 'vitest';
import { firestoreService, type FirestoreDefinition } from '../firestoreService';
import { addDoc } from 'firebase/firestore';
import type { ZodType } from 'zod';

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

describe('firestoreService Generic CRUD & Guard checks', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('should successfully write data after Zod schema validation', async () => {
    const mockDef: FirestoreDefinition<{ id?: string; name: string }> = {
      collectionPath: 'test_collection',
      schema: {
        parse: (data: unknown) => data
      } as unknown as ZodType<{ id?: string; name: string }>
    };

    const payload = {
      name: 'Mock Test'
    };

    const result = await firestoreService.create(mockDef, payload);
    expect(result.id).toBe('new_doc_id');
    expect(addDoc).toHaveBeenCalled();
  });

  test('should fail write if custom role guard rejects user claims', async () => {
    const mockDef: FirestoreDefinition<{ id?: string; name: string }> = {
      collectionPath: 'secure_collection',
      schema: {
        parse: (data: unknown) => data
      } as unknown as ZodType<{ id?: string; name: string }>,
      roles: {
        write: ['admin'] // Only admin allowed
      }
    };

    // Current user mock has claims.role = 'student', so this must throw
    await expect(firestoreService.create(mockDef, { name: 'admin data' })).rejects.toThrow(
      'Access Denied: Role "student" is not authorized for this action.'
    );
  });
});
