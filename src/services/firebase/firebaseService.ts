import { initializeApp, type FirebaseApp } from 'firebase/app';
import { getAuth, signInAnonymously, type Auth } from 'firebase/auth';
import type { IFirebaseService, QuizResponsePayload, FeedbackPayload, UserPayload } from './IFirebaseService';
import { SubmissionsRepository } from './repositories/submissions/SubmissionsRepository';
import { FeedbackRepository } from './repositories/feedback/FeedbackRepository';
import { UsersRepository } from './repositories/users/UsersRepository';

export class FirebaseService implements IFirebaseService {
  private app: FirebaseApp | null = null;
  private auth: Auth | null = null;
  
  private submissionsRepository: SubmissionsRepository | null = null;
  private feedbackRepository: FeedbackRepository | null = null;
  private usersRepository: UsersRepository | null = null;

  public initializeFirebase(): void {
    // Retrieve configuration from env variables, or default to mock fields if empty.
    const firebaseConfig = {
      apiKey: import.meta.env['VITE_FIREBASE_API_KEY'] || 'MOCK_API_KEY',
      authDomain: import.meta.env['VITE_FIREBASE_AUTH_DOMAIN'] || 'mock-app.firebaseapp.com',
      projectId: import.meta.env['VITE_FIREBASE_PROJECT_ID'] || 'mock-app',
      storageBucket: import.meta.env['VITE_FIREBASE_STORAGE_BUCKET'] || 'mock-app.appspot.com',
      messagingSenderId: import.meta.env['VITE_FIREBASE_MESSAGING_SENDER_ID'] || '000000000000',
      appId: import.meta.env['VITE_FIREBASE_APP_ID'] || '1:0000:web:mock'
    };

    try {
      this.app = initializeApp(firebaseConfig);
      this.auth = getAuth(this.app);
      
      // Initialize Repositories
      this.submissionsRepository = new SubmissionsRepository();
      this.feedbackRepository = new FeedbackRepository();
      this.usersRepository = new UsersRepository();
    } catch (e) {
      console.warn('Firebase failed to initialize. Running in mock/offline mode:', e);
    }
  }

  public async anonymousSignIn(): Promise<string> {
    if (!this.auth) {
      console.warn('Firebase Auth is uninitialized. Returning offline mock UID.');
      return 'offline_mock_uid';
    }
    try {
      const userCredential = await signInAnonymously(this.auth);
      return userCredential.user?.uid || 'anonymous_uid';
    } catch (error) {
      console.error('Anonymous auth failed:', error);
      throw error;
    }
  }

  public async submitQuizResponse(payload: QuizResponsePayload): Promise<void> {
    if (!this.submissionsRepository) {
      console.warn('SubmissionsRepository is uninitialized. Simulation logging submission:', payload);
      return;
    }
    try {
      // Delegate to the decoupled repository layer
      await this.submissionsRepository.create(payload);
    } catch (error) {
      console.error('Failed to submit quiz response to repository:', error);
      throw error;
    }
  }

  public async submitFeedback(payload: FeedbackPayload): Promise<void> {
    if (!this.feedbackRepository) {
      console.warn('FeedbackRepository is uninitialized. Simulation logging feedback:', payload);
      return;
    }
    try {
      // Delegate to the decoupled repository layer
      await this.feedbackRepository.create(payload);
    } catch (error) {
      console.error('Failed to submit feedback to repository:', error);
      throw error;
    }
  }

  public async getUserProfile(uid: string): Promise<UserPayload | null> {
    if (!this.usersRepository) {
      console.warn('UsersRepository is uninitialized. Running in offline mock mode.');
      return null;
    }
    return this.usersRepository.getById(uid);
  }

  public async setUserProfile(uid: string, profile: Omit<UserPayload, 'id'>): Promise<UserPayload> {
    if (!this.usersRepository) {
      console.warn('UsersRepository is uninitialized. Simulation logging user profile:', profile);
      return { id: uid, ...profile };
    }
    return this.usersRepository.set(uid, profile);
  }
}
