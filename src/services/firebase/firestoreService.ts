import { 
  getFirestore, 
  collection, 
  addDoc, 
  doc, 
  getDoc, 
  getDocs, 
  updateDoc,
  deleteDoc,
  setDoc,
  onSnapshot,
  type Firestore,
  type DocumentData
} from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { ZodError, type ZodType, type ZodIssue } from 'zod';
import { logger } from '@/cores/logger/logger';

export interface FirestoreDefinition<T> {
  collectionPath: string;
  schema: ZodType<T>;
  roles?: {
    read?: string[];
    write?: string[];
  };
}

export function formatZodError(error: ZodError): string {
  return error.issues
    .map((err: ZodIssue) => {
      const pathStr = err.path.join('.');
      let expectedStr = '';
      if ('expected' in err && 'received' in err) {
        const issue = err as Record<string, unknown>;
        expectedStr = ` (expected: ${String(issue['expected'])}, received: ${String(issue['received'])})`;
      }
      return `  - [${pathStr}]: ${err.message}${expectedStr}`;
    })
    .join('\n');
}

export const firestoreService = {
  getDb(): Firestore {
    const db = getFirestore();
    if (!db) throw new Error('[FirestoreService] Firebase Firestore is not initialized.');
    return db;
  },

  async checkGuard<T>(def: FirestoreDefinition<T>, operation: 'read' | 'write'): Promise<void> {
    if (!def.roles) return;
    const requiredRoles = def.roles[operation];
    if (!requiredRoles || requiredRoles.length === 0) return;
    const auth = getAuth();
    const currentUser = auth.currentUser;
    if (!currentUser) throw new Error('[FirestoreService] Access Denied: User is not authenticated.');
    const tokenResult = await currentUser.getIdTokenResult(true);
    const userRole = tokenResult.claims['role'] as string || (tokenResult.claims['isAdmin'] ? 'admin' : 'student');
    if (!requiredRoles.includes(userRole)) {
      throw new Error(`[FirestoreService] Access Denied: Role "${userRole}" is not authorized for this action.`);
    }
  },

  async create<T extends { id?: string | undefined }>(
    def: FirestoreDefinition<T>,
    data: Omit<T, 'id'>,
    collectionPathOverride?: string
  ): Promise<T> {
    await this.checkGuard(def, 'write');
    const path = collectionPathOverride || def.collectionPath;
    let validatedData: DocumentData;
    try {
      validatedData = def.schema.parse({ ...data, id: 'temp_id' }) as DocumentData;
    } catch (err) {
      if (err instanceof ZodError) logger.error(`[FirestoreService] Zod validation failed for create on "${path}":\n${formatZodError(err)}`);
      throw err;
    }
    delete validatedData['id'];
    const db = this.getDb();
    logger.info('[FirestoreService] create', { path, data });
    const docRef = await addDoc(collection(db, path), validatedData);
    return { id: docRef.id, ...validatedData } as unknown as T;
  },

  async set<T extends { id?: string | undefined }>(
    def: FirestoreDefinition<T>,
    id: string,
    data: Omit<T, 'id'>,
    collectionPathOverride?: string
  ): Promise<T> {
    await this.checkGuard(def, 'write');
    const path = collectionPathOverride || def.collectionPath;
    let validatedData: DocumentData;
    try {
      validatedData = def.schema.parse({ ...data, id }) as DocumentData;
    } catch (err) {
      if (err instanceof ZodError) logger.error(`[FirestoreService] Zod validation failed for set on "${path}" (ID: ${id}):\n${formatZodError(err)}`);
      throw err;
    }
    delete validatedData['id'];
    const db = this.getDb();
    logger.info('[FirestoreService] set', { path, id, data });
    await setDoc(doc(db, path, id), validatedData);
    return { id, ...validatedData } as unknown as T;
  },

  async getById<T extends { id?: string | undefined }>(
    def: FirestoreDefinition<T>,
    id: string,
    collectionPathOverride?: string
  ): Promise<T | null> {
    await this.checkGuard(def, 'read');
    const db = this.getDb();
    const path = collectionPathOverride || def.collectionPath;
    logger.info('[FirestoreService] getById', { path, id });
    const docSnap = await getDoc(doc(db, path, id));
    if (!docSnap.exists()) return null;
    const rawData = { id: docSnap.id, ...docSnap.data() };
    try {
      return def.schema.parse(rawData);
    } catch (err) {
      if (err instanceof ZodError) logger.error(`[FirestoreService] Zod validation failed for getById on "${path}" (ID: ${id}):\n${formatZodError(err)}`);
      throw err;
    }
  },

  async getAll<T extends { id?: string | undefined }>(
    def: FirestoreDefinition<T>,
    collectionPathOverride?: string
  ): Promise<T[]> {
    await this.checkGuard(def, 'read');
    const db = this.getDb();
    const path = collectionPathOverride || def.collectionPath;
    logger.info('[FirestoreService] getAll', { path });
    const querySnapshot = await getDocs(collection(db, path));
    const results: T[] = [];
    querySnapshot.forEach((docSnap) => {
      const rawData = { id: docSnap.id, ...docSnap.data() };
      try {
        results.push(def.schema.parse(rawData));
      } catch (err) {
        if (err instanceof ZodError) {
          logger.error(`[FirestoreService] Zod validation failed for getAll on "${path}" (ID: ${docSnap.id}):\n${formatZodError(err)}`);
        } else {
          logger.warn(`[FirestoreService] Failed to parse document ${docSnap.id}:`, { error: String(err) });
        }
      }
    });
    return results;
  },

  async update<T>(
    def: FirestoreDefinition<T>,
    id: string,
    data: Partial<Omit<T, 'id'>>,
    collectionPathOverride?: string
  ): Promise<void> {
    await this.checkGuard(def, 'write');
    const db = this.getDb();
    const path = collectionPathOverride || def.collectionPath;
    logger.info('[FirestoreService] update', { path, id, data });
    await updateDoc(doc(db, path, id), data as DocumentData);
  },

  async delete<T>(
    def: FirestoreDefinition<T>,
    id: string,
    collectionPathOverride?: string
  ): Promise<void> {
    await this.checkGuard(def, 'write');
    const db = this.getDb();
    const path = collectionPathOverride || def.collectionPath;
    logger.info('[FirestoreService] delete', { path, id });
    await deleteDoc(doc(db, path, id));
  },

  subscribe<T extends { id?: string | undefined }>(
    def: FirestoreDefinition<T>,
    callback: (items: T[]) => void,
    collectionPathOverride?: string
  ): () => void {
    this.checkGuard(def, 'read').catch((err: unknown) => {
      logger.error('[FirestoreService] Subscription unauthorized:', { error: String(err) });
    });
    const db = this.getDb();
    const path = collectionPathOverride || def.collectionPath;
    logger.info('[FirestoreService] subscribe', { path });
    return onSnapshot(collection(db, path), (querySnapshot) => {
      const results: T[] = [];
      querySnapshot.forEach((docSnap) => {
        const rawData = { id: docSnap.id, ...docSnap.data() };
        try {
          results.push(def.schema.parse(rawData));
        } catch (err) {
          if (err instanceof ZodError) {
            logger.error(`[FirestoreService] Zod validation failed for subscribe on "${path}" (ID: ${docSnap.id}):\n${formatZodError(err)}`);
          } else {
            logger.warn(`[FirestoreService] Failed to parse document ${docSnap.id}:`, { error: String(err) });
          }
        }
      });
      callback(results);
    }, (error: unknown) => {
      logger.warn(`[FirestoreService] Real-time subscription failed for ${path}:`, { error: String(error) });
    });
  }
};

