import { ref, onUnmounted } from 'vue';
import { 
  getFirestore, 
  doc, 
  collection, 
  onSnapshot, 
  query, 
  type QueryConstraint 
} from 'firebase/firestore';
import type { FirestoreDefinition } from '../firestoreService';

/**
 * A Vue 3 Composable that subscribes to a single Firestore document in real-time.
 * Auto-unsubscribes on component unmount and validates data shape via Zod.
 */
export function useRealtimeDocument<T extends { id?: string | undefined }>(
  def: FirestoreDefinition<T>,
  id: string
) {
  const data = ref<T | null>(null);
  const error = ref<Error | null>(null);
  const isLoading = ref(true);

  const db = getFirestore();
  const unsubscribe = onSnapshot(
    doc(db, def.collectionPath, id),
    (docSnap) => {
      isLoading.value = false;
      if (docSnap.exists()) {
        try {
          data.value = def.schema.parse({ id: docSnap.id, ...docSnap.data() });
          error.value = null;
        } catch (err) {
          error.value = err as Error;
        }
      } else {
        data.value = null;
      }
    },
    (err) => {
      isLoading.value = false;
      error.value = err;
    }
  );

  onUnmounted(() => {
    unsubscribe();
  });

  return { data, error, isLoading };
}

/**
 * A Vue 3 Composable that subscribes to a Firestore collection with constraints in real-time.
 * Auto-unsubscribes on component unmount and validates data shape via Zod.
 */
export function useRealtimeCollection<T extends { id?: string | undefined }>(
  def: FirestoreDefinition<T>,
  ...queryConstraints: QueryConstraint[]
) {
  const data = ref<T[]>([]);
  const error = ref<Error | null>(null);
  const isLoading = ref(true);

  const db = getFirestore();
  const collRef = collection(db, def.collectionPath);
  const q = query(collRef, ...queryConstraints);

  const unsubscribe = onSnapshot(
    q,
    (querySnap) => {
      isLoading.value = false;
      const results: T[] = [];
      querySnap.forEach((docSnap) => {
        try {
          results.push(def.schema.parse({ id: docSnap.id, ...docSnap.data() }));
        } catch (err) {
          console.error(`[useRealtimeCollection] Schema parsing failed in ${def.collectionPath}:`, err);
        }
      });
      data.value = results;
      error.value = null;
    },
    (err) => {
      isLoading.value = false;
      error.value = err;
    }
  );

  onUnmounted(() => {
    unsubscribe();
  });

  return { data, error, isLoading };
}
