import { defineAppSetup } from '@slidev/types';
import { FirebaseService } from '@/services/firebase/firebaseService';
import { QSEngine } from '@/cores/quantity-surveying/qsService';
import { FirebaseServiceKey, QSEngineKey, UserContextKey } from '@/services/di/keys';
import { createUserContext } from '@/services/firebase/composables/useUserContext';

export default defineAppSetup(({ app, router }) => {
  // Initialize Singletons
  const firebaseService = new FirebaseService();
  const qsEngine = new QSEngine();

  // Bootstrap Firebase Client
  firebaseService.initializeFirebase();

  // Create global central user context
  const userContext = createUserContext(firebaseService);

  // Register Dependency Injectors
  app.provide(FirebaseServiceKey, firebaseService);
  app.provide(QSEngineKey, qsEngine);
  app.provide(UserContextKey, userContext);

  // Router Gating: Standardizing scroll view (/all) as default route
  router.beforeEach((to, _from, next) => {
    if (to.path === '/' || to.path === '') {
      next('/all');
    } else {
      next();
    }
  });
});
