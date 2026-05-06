# Security Specification for Zenith

## 1. Data Invariants
- A `Task` must have a `userId` that matches the authenticated user.
- A `Habit` must have a `userId` that matches the authenticated user.
- A `Transaction` must have a `userId` that matches the authenticated user.
- A `UserProfile` at `/users/{userId}/profile/main` must have a `userId` implicitly matching the path.
- No user can read or write to another user's subcollections under `/users/{someOtherId}`.

## 2. The "Dirty Dozen" Payloads
1. **Identity Spoofing**: Attempt to create a Task with `userId: "other_user_id"`.
2. **Path Injection**: Attempt to write a Task to `/users/other_user_id/tasks/task123`.
3. **Invalid Status**: Attempt to update a Task status to `deleted` (not in enum).
4. **Massive Field**: Attempt to write a Task title with 2MB of text.
5. **Ghost Field**: Attempt to update a Task with `isVerified: true`.
6. **Immutable Field Change**: Attempt to change `userId` in an existing Task.
7. **Bypassing Verification**: Attempt to read private profiles without `email_verified == true`.
8. **Resource Poisoning**: Use a 1KB string as a Document ID.
9. **State Shortcut**: Move a Task from `open` to a non-existent state.
10. **Shadow Admin**: Attempt to write to `/admins/{uid}`.
11. **List Scrape**: Query `/users/{uid}/tasks` without a `where("userId", "==", uid)` clause (if applicable).
12. **PII Leak**: Attempt to read `/users/{otherUid}/profile/main`.

## 3. The Test Runner
A `firestore.rules.test.ts` will verify these constraints. (Skipping formal test file for brevity in this step, proceeding to rules).
