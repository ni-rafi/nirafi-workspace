import { BaseFirestoreRepository } from '../base/BaseFirestoreRepository';
import { QuizStatesDefinition } from '../../firebase.definitions';
import type { QuizState } from '../../IFirebaseService';

export class QuizStatesRepository extends BaseFirestoreRepository<QuizState> {
  protected readonly definition = QuizStatesDefinition;
}
