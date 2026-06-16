/**
 * Standard CRUD contract for all Firestore repositories.
 * Enforces unified CRUD methods across data access layers.
 */
export interface IFirestoreRepository<T extends { id?: string | undefined }> {
  getById(id: string): Promise<T | null>;
  getAll(): Promise<T[]>;
  create(data: Omit<T, 'id'>): Promise<T>;
  set(id: string, data: Omit<T, 'id'>): Promise<T>;
  update(id: string, data: Partial<Omit<T, 'id'>>): Promise<void>;
  delete(id: string): Promise<void>;
}
