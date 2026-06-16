import type { InjectionKey } from 'vue';
import type { IFirebaseService } from '@/services/firebase/IFirebaseService';
import type { IQSEngine } from '@/cores/quantity-surveying/IQSEngine';
import type { UserContext } from '@/services/firebase/composables/useUserContext';

export const FirebaseServiceKey: InjectionKey<IFirebaseService> = Symbol('FirebaseService');
export const QSEngineKey: InjectionKey<IQSEngine> = Symbol('QSEngine');
export const UserContextKey: InjectionKey<UserContext> = Symbol('UserContext');
