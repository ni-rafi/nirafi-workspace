import { ref, readonly, type Ref } from 'vue';
import { getAuth, onAuthStateChanged, signOut as firebaseSignOut } from 'firebase/auth';
import type { IFirebaseService } from '../IFirebaseService';
import {
  normalizeRegistration,
  validateRegistration,
  normalizeSession,
  validateSession
} from '@/cores/user/userValidation';

export interface UserContext {
  uid: Readonly<Ref<string | null>>;
  role: Readonly<Ref<'student' | 'admin' | null>>;
  registration: Readonly<Ref<string | null>>;
  session: Readonly<Ref<string | null>>;
  name: Readonly<Ref<string | null>>;
  isAuthenticated: Readonly<Ref<boolean>>;
  isGatePassed: Readonly<Ref<boolean>>;
  loading: Readonly<Ref<boolean>>;
  updateGateInfo(registration: string, session: string, name: string): Promise<void>;
  signOut(): Promise<void>;
}

export function createUserContext(firebaseService: IFirebaseService) {
  const uid = ref<string | null>(null);
  const role = ref<'student' | 'admin' | null>(null);
  const registration = ref<string | null>(null);
  const session = ref<string | null>(null);
  const name = ref<string | null>(null);
  const isAuthenticated = ref(false);
  const isGatePassed = ref(false);
  const loading = ref(true);

  // Initialize auth state listener
  const auth = getAuth();
  onAuthStateChanged(auth, async (user) => {
    loading.value = true;
    if (user) {
      uid.value = user.uid;
      isAuthenticated.value = true;

      try {
        // 1. Resolve role from Custom Token Claims
        const tokenResult = await user.getIdTokenResult();
        const userRole = tokenResult.claims['role'] as string || (tokenResult.claims['isAdmin'] ? 'admin' : null);

        if (userRole === 'admin') {
          role.value = 'admin';
          name.value = 'Administrator';
          isGatePassed.value = true;
          loading.value = false;
          return;
        }

        // 2. Resolve Student from Firestore document profile
        const profile = await firebaseService.getUserProfile(user.uid);
        if (profile) {
          role.value = 'student';
          registration.value = profile.registration;
          session.value = profile.session;
          name.value = profile.name;
          isGatePassed.value = true;
        } else {
          role.value = 'student';
          registration.value = null;
          session.value = null;
          name.value = null;
          isGatePassed.value = false;
        }
      } catch (error) {
        console.error('[UserContext] Failed to resolve claims or profile:', error);
      }
    } else {
      uid.value = null;
      role.value = null;
      registration.value = null;
      session.value = null;
      name.value = null;
      isAuthenticated.value = false;
      isGatePassed.value = false;

      // Automatically sign in anonymously if not logged in
      try {
        await firebaseService.anonymousSignIn();
      } catch (err) {
        console.error('[UserContext] Automatic anonymous sign in failed:', err);
      }
    }
    loading.value = false;
  });

  const updateGateInfo = async (regInput: string, sessInput: string, nameInput: string) => {
    if (!uid.value) {
      throw new Error('User is not authenticated.');
    }

    const normReg = normalizeRegistration(regInput);
    const normSess = normalizeSession(sessInput);

    if (!validateRegistration(normReg)) {
      throw new Error('Registration number must be exactly 10 digits.');
    }

    if (!validateSession(normSess)) {
      throw new Error('Invalid academic session format (must match YYYY-YY, e.g. 2016-17).');
    }

    if (!nameInput.trim()) {
      throw new Error('Student name is required.');
    }

    const profileData = {
      name: nameInput.trim(),
      registration: normReg,
      session: normSess,
      role: 'student' as const
    };

    // Save profile to users/{uid}
    await firebaseService.setUserProfile(uid.value, profileData);

    // Update local reactive state
    registration.value = normReg;
    session.value = normSess;
    name.value = profileData.name;
    role.value = 'student';
    isGatePassed.value = true;
  };

  const signOut = async () => {
    const authInstance = getAuth();
    await firebaseSignOut(authInstance);
  };

  return {
    uid: readonly(uid),
    role: readonly(role),
    registration: readonly(registration),
    session: readonly(session),
    name: readonly(name),
    isAuthenticated: readonly(isAuthenticated),
    isGatePassed: readonly(isGatePassed),
    loading: readonly(loading),
    updateGateInfo,
    signOut
  };
}
