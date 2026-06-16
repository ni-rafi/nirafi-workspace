import { BaseFirestoreRepository } from '../base/BaseFirestoreRepository';
import { SubmissionsDefinition } from '../../firebase.definitions';
import type { QuizResponsePayload } from '../../IFirebaseService';

export class SubmissionsRepository extends BaseFirestoreRepository<QuizResponsePayload> {
  protected readonly definition = SubmissionsDefinition;
}
