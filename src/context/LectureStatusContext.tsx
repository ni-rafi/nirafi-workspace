import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useFirebase } from './FirebaseContext';
import { useUserContext } from './useUserContext';
import { SUBJECTS } from '@/config/lectures';
import { verifyLectureStatusHash, generateLectureStatusHash } from '@/services/firebase/hash';
import type { SessionStatusPayload } from '@/services/firebase/IFirebaseService';

interface LectureStatusContextType {
  isLectureLocked: (subjectId: string, sessionId: string, lectureId: string) => boolean;
  isLectureHidden: (subjectId: string, sessionId: string, lectureId: string) => boolean;
  setLectureStatus: (
    subjectId: string,
    sessionId: string,
    lectureId: string,
    updates: { locked?: boolean; hidden?: boolean }
  ) => Promise<void>;
  isLoading: boolean;
}

const LectureStatusContext = createContext<LectureStatusContextType | null>(null);

export const useLectureStatus = (): LectureStatusContextType => {
  const context = useContext(LectureStatusContext);
  if (!context) {
    throw new Error('useLectureStatus must be used within a LectureStatusProvider');
  }
  return context;
};

interface LectureStatusProviderProps {
  children: React.ReactNode;
}

export const LectureStatusProvider: React.FC<LectureStatusProviderProps> = ({ children }) => {
  const firebaseService = useFirebase();
  const { userProfile } = useUserContext();
  const [sessionStatuses, setSessionStatuses] = useState<Record<string, SessionStatusPayload>>({});
  const [verifiedLocks, setVerifiedLocks] = useState<Record<string, boolean>>({});
  const [verifiedHiddens, setVerifiedHiddens] = useState<Record<string, boolean>>({});
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const salt = import.meta.env['VITE_ADMIN_HASH_SALT'] || 'mock-admin-salt-12345';

  // Listen to Firestore real-time session status updates
  useEffect(() => {
    setIsLoading(true);
    const unsubscribe = firebaseService.subscribeSessionStatuses((statusesList) => {
      const statusesMap: Record<string, SessionStatusPayload> = {};
      statusesList.forEach((status) => {
        if (status.id) {
          statusesMap[status.id] = status;
        }
      });
      setSessionStatuses(statusesMap);
      setIsLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, [firebaseService]);

  // Performs cryptographic validation of lock and hidden states asynchronously when sessionStatuses changes
  useEffect(() => {
    let active = true;
    const validateAllLocks = async () => {
      const locksMap: Record<string, boolean> = {};
      const hiddensMap: Record<string, boolean> = {};

      for (const subject of SUBJECTS) {
        for (const session of subject.sessions) {
          const docId = `${subject.id}_${session.id}`;
          const docStatus = sessionStatuses[docId];

          for (const lecture of session.lectures) {
            const lockKey = `${subject.id}_${session.id}_${lecture.id}`;
            const liveStatus = docStatus?.lectures?.[lecture.id];

            if (liveStatus) {
              // Perform async cryptographic validation of the signature hash
              const isValid = await verifyLectureStatusHash(
                subject.id,
                session.id,
                lecture.id,
                liveStatus.locked,
                liveStatus.hidden || false,
                liveStatus.hash,
                salt
              );

              if (isValid) {
                locksMap[lockKey] = liveStatus.locked;
                hiddensMap[lockKey] = liveStatus.hidden || false;
              } else {
                // Cryptographic validation failed -> Force Locked & Hidden for safety
                console.error(`[LectureStatusProvider] Cryptographic signature validation FAILED for ${lockKey}. Defaulting to locked and hidden.`);
                locksMap[lockKey] = true;
                hiddensMap[lockKey] = true;
              }
            } else {
              // Fallback to locked and hidden by default if no database override exists
              locksMap[lockKey] = true;
              hiddensMap[lockKey] = true;
            }
          }
        }
      }

      if (active) {
        setVerifiedLocks(locksMap);
        setVerifiedHiddens(hiddensMap);
      }
    };

    validateAllLocks();
    return () => {
      active = false;
    };
  }, [sessionStatuses, salt]);

  const isLectureLocked = useCallback(
    (subjectId: string, sessionId: string, lectureId: string): boolean => {
      const lockKey = `${subjectId}_${sessionId}_${lectureId}`;
      if (verifiedLocks[lockKey] !== undefined) {
        return verifiedLocks[lockKey];
      }
      return true; // Safe fallback: locked by default while loading
    },
    [verifiedLocks]
  );

  const isLectureHidden = useCallback(
    (subjectId: string, sessionId: string, lectureId: string): boolean => {
      const lockKey = `${subjectId}_${sessionId}_${lectureId}`;
      if (verifiedHiddens[lockKey] !== undefined) {
        return verifiedHiddens[lockKey];
      }
      return true; // Safe fallback: hidden by default while loading
    },
    [verifiedHiddens]
  );

  const setLectureStatus = useCallback(
    async (
      subjectId: string,
      sessionId: string,
      lectureId: string,
      updates: { locked?: boolean; hidden?: boolean }
    ): Promise<void> => {
      const isAdmin = userProfile?.role === 'admin';
      if (!isAdmin) {
        throw new Error('Access Denied: Only administrators can modify lecture statuses.');
      }

      const docId = `${subjectId}_${sessionId}`;
      const currentDoc = sessionStatuses[docId];
      const currentLecture = currentDoc?.lectures?.[lectureId];

      const locked = updates.locked !== undefined ? updates.locked : (currentLecture?.locked ?? false);
      const hidden = updates.hidden !== undefined ? updates.hidden : (currentLecture?.hidden ?? false);

      const hash = await generateLectureStatusHash(subjectId, sessionId, lectureId, locked, hidden, salt);

      const updatedLectures = {
        ...(currentDoc?.lectures || {}),
        [lectureId]: {
          locked,
          hidden,
          updatedAt: Date.now(),
          hash,
        },
      };

      await firebaseService.setSessionStatus(docId, {
        lectures: updatedLectures,
      });
    },
    [sessionStatuses, firebaseService, userProfile, salt]
  );

  const contextValue = React.useMemo(
    () => ({
      isLectureLocked,
      isLectureHidden,
      setLectureStatus,
      isLoading,
    }),
    [isLectureLocked, isLectureHidden, setLectureStatus, isLoading]
  );

  return <LectureStatusContext.Provider value={contextValue}>{children}</LectureStatusContext.Provider>;
};
