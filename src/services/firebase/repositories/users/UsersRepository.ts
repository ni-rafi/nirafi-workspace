import { BaseFirestoreRepository } from '../base/BaseFirestoreRepository';
import { UsersDefinition } from '../../firebase.definitions';
import type { UserPayload } from '../../firebase.schemas';

export class UsersRepository extends BaseFirestoreRepository<UserPayload> {
  protected readonly definition = UsersDefinition;
}
