import { where } from 'firebase/firestore';
import { useRealtimeCollection } from '@/services/firebase/composables/useFirestore';
import { SubmissionsDefinition } from '@/services/firebase/firebase.definitions';
import type { QuizResponsePayload } from '@/services/firebase/IFirebaseService';

/**
 * A domain-specific Vue 3 composable that listens to real-time submissions for a specific quiz ID.
 * Hides Firestore query implementation details from the UI components.
 */
export function useQuizSubmissions(quizId: string) {
  return useRealtimeCollection<QuizResponsePayload>(
    SubmissionsDefinition,
    where('quizId', '==', quizId)
  );
}
