---
name: taskflow-project-rules
description: Core architecture, language conventions, coding best practices, and Firebase optimization rules for the TaskFlow project. Must be followed for all code generation, modifications, and UI development.
---

# Project Rules: TaskFlow

## 🌍 Language Conventions
- **Codebase:** All code must be written strictly in **English**. This includes variable names, function names, file names, inline comments, and commit messages.
- **User Interface:** All user-facing content must be written in **Spanish**. This includes views, HTML text, UI components, placeholders, and user notifications/toasts.

## 🏗️ Architecture and Stack
- **Main Stack:** Next.js (App Router), TypeScript, Tailwind CSS, Firebase (Auth, Firestore, Storage).
- **Package Manager:** Strictly use `pnpm`.
- **Architecture:** Screaming Architecture. Business logic and database calls must be exclusively isolated in `src/features/[feature]/services`.
- **UI and Styles:** Use Shadcn/UI components (located in `src/components/ui`).

## 💡 Code Best Practices
- **Design Principles:** Apply the DRY (Don't Repeat Yourself) principle. Avoid code duplication by abstracting utilities into `src/lib/utils.ts` and creating custom hooks when necessary.
- **Strict Typing:** Take full advantage of TypeScript. Always validate the data structure (e.g., using schemas in `src/lib/validators.ts`) before sending it to the database.
- **Commits:** Strictly follow the Conventional Commits convention for the Git history.

## 🔥 Firebase Optimization (Cost Prevention)
- **Single Instance:** Always use the already configured instance in `src/lib/firebase.ts`.
- **Reads:**
  - Minimize unnecessary requests by implementing local caching or global state management for data that does not require real-time synchronization.
  - Never download entire collections. Always use pagination (`limit`, `startAfter`) and highly precise queries using the indexes defined in `firestore.indexes.json`.
  - When listening to subcollections or documents in real-time with `onSnapshot`, it is mandatory to **unsubscribe** the listener during the component's cleanup phase (`useEffect` return function) to avoid memory leaks and continuous background reads.
- **Writes & Deletes:**
  - Use *Batched Writes* when you need to create, update, or delete multiple related documents simultaneously. This ensures data integrity and groups the operations.
  - Avoid fragmented creation flows: structure the data (e.g., tasks with their metadata) into a single payload to perform a single write, instead of creating the document and updating it immediately afterward.