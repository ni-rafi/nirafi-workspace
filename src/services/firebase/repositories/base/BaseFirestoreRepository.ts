import type { IFirestoreRepository } from './IFirestoreRepository';
import { firestoreService, type FirestoreDefinition } from '../../firestoreService';

export abstract class BaseFirestoreRepository<T extends { id?: string | undefined }>
  implements IFirestoreRepository<T> {
  
  protected abstract readonly definition: FirestoreDefinition<T>;

  public async getById(id: string): Promise<T | null> {
    return firestoreService.getById(this.definition, id);
  }

  public async getAll(): Promise<T[]> {
    return firestoreService.getAll(this.definition);
  }

  public async create(data: Omit<T, 'id'>): Promise<T> {
    return firestoreService.create(this.definition, data);
  }

  public async set(id: string, data: Omit<T, 'id'>): Promise<T> {
    return firestoreService.set(this.definition, id, data);
  }

  public async update(id: string, data: Partial<Omit<T, 'id'>>): Promise<void> {
    return firestoreService.update(this.definition, id, data);
  }

  public async delete(id: string): Promise<void> {
    return firestoreService.delete(this.definition, id);
  }
}
