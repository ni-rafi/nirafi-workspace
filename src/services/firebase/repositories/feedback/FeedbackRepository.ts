import { BaseFirestoreRepository } from '../base/BaseFirestoreRepository';
import { FeedbackDefinition } from '../../firebase.definitions';
import type { FeedbackPayload } from '../../IFirebaseService';

export class FeedbackRepository extends BaseFirestoreRepository<FeedbackPayload> {
  protected readonly definition = FeedbackDefinition;
}
