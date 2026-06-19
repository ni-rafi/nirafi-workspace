---
name: firebase-rules
description: Guides managing Firestore collection schemas, repository logic, database definitions, and local security rules.
---

# Skill: Firebase Rules and Schema Topology

This skill guides adding or modifying Firestore database schemas, repositories, service layers, and syncing security rules.

## 1. Directory Conventions

- **Schemas**: Defined in `src/services/firebase/firebase.schemas.ts` using Zod (`z.object`). Export the schema and infer the type using `z.infer`.
- **Definitions**: Registered in `src/services/firebase/firebase.definitions.ts` using `FirestoreDefinition<T>` where we configure `collectionPath`, `schema`, and client-side claims roles (`read`, `write`).
- **Repositories**: Place inside `src/services/firebase/repositories/` extending `BaseFirestoreRepository<T>`.
- **Service Layer Facade**: The unified API is declared in `src/services/firebase/IFirebaseService.ts` and delegated through sub-services initialized in `src/services/firebase/firebaseService.ts`.
- **Security Rules**: Saved locally in the root `firestore.rules`.

## 2. Syncing Security Rules

Whenever a new collection is added to `firebase.definitions.ts` or when collection roles are modified, you MUST update the local `firestore.rules` file to synchronize security boundaries:

1. **Owner-Only Collections** (e.g. `users/{uid}`, `/quiz_submissions/.../{uid}`):
   Verify the rule checks if `request.auth.uid == uid` or user has admin claims.
2. **Admin-Only Collections** (e.g. `submissions`, `feedback`):
   Verify the read operation is restricted to `isAdmin()` helper.
3. **Admin Write, Public Read** (e.g. `lecture_status`, `quiz_states`, `playgrounds`):
   Ensure `write` requires `isAdmin()` and `read` is allowed for authenticated users.

## 3. Writing Client Guards

All repositories routing requests through `firestoreService` automatically trigger `checkGuard` which performs client-side validation against custom claims:
- Verify that definitions include appropriate `roles.read` and `roles.write` values.
- Never bypass the repository layout to make direct Firestore calls without proper guards.
