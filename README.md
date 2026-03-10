# 🌊 TaskFlow

**TaskFlow** is a modern project and task management platform designed for efficiency and collaboration. Built with a focus on performance, security, and a seamless user experience.

![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?style=flat-square&logo=tailwind-css)
![Firebase](https://img.shields.io/badge/Firebase-Auth%20%7C%20Firestore%20%7C%20Storage-FFCA28?style=flat-square&logo=firebase)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript)

---

## ✨ Key Features

- 🔐 **Robust Authentication:** Email/Password and Google Login support. Server-side route protection implemented via Next.js Middleware.
- 📁 **Project Management:** Create and organize multiple projects with real-time synchronization and offline persistence.
- ✅ **Task Management:** Complete task system with image attachment support, completion states, and automatic cloud resource cleanup upon deletion.
- 🎨 **Modern Interface:** Responsive design with dynamic light/dark mode, built using Shadcn/UI and Tailwind CSS v4.
- 🛡️ **Advanced Security:** Hardened Firestore and Storage rules to ensure user data privacy and prevent unauthorized access.
- ⚡ **Data Validation:** Centralized validation system ensuring data integrity across every interaction (length limits, file types, etc.).

---

## 🛠️ Tech Stack

- **Framework:** [Next.js 16 (App Router)](https://nextjs.org/)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
- **Database & Auth:** [Firebase](https://firebase.google.com/) (Firestore, Auth, Storage)
- **UI Components:** [Shadcn/UI](https://ui.shadcn.com/) & [Radix UI](https://www.radix-ui.com/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Notifications:** [Sonner](https://sonner.emilkowal.ski/)

---

## 🏗️ Architecture: Screaming Architecture

The project follows **Screaming Architecture** principles, where the folder structure reveals the system's intent rather than the underlying framework:

```text
src/
├── app/              # Next.js routes and layouts
├── components/       # Global UI components and shared layouts
├── features/         # Business logic organized by domain
│   ├── auth/         # Authentication (services, components, hooks)
│   ├── projects/     # Project management logic
│   ├── tasks/        # Task management logic
│   └── settings/     # User profile and account settings
├── lib/              # Third-party configurations (Firebase) and shared utilities
└── middleware.ts     # Route protection and session management
```

*All business logic resides within `src/features/[feature]/services`.*

---

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/your-username/taskflow.git
cd taskflow
```

### 2. Install dependencies
This project strictly uses `pnpm` for package management to ensure consistent dependency resolution across all environments.

```bash
pnpm install
```

### 3. Configure environment variables
Create a `.env.local` file based on `.env.example` with your Firebase credentials:
```bash
cp .env.example .env.local
```

### 4. Local Development with Firebase Emulators
The project is configured to use the **Firebase Local Emulator Suite** for a safe development environment:

| Emulator  | Port  | Description |
|-----------|-------|-------------|
| **Auth**  | 9099  | Simulates Firebase Authentication |
| **Firestore** | 8080 | Simulates Cloud Firestore database |
| **Storage** | 9199 | Simulates Cloud Storage for images |
| **UI**    | 4000* | Web-based dashboard for emulators |

*\*The UI port may vary; check your terminal output when starting.*

To start the emulators and the Next.js dev server:
```bash
# In one terminal, start the emulators
firebase emulators:start

# In another terminal, start the Next.js app
pnpm dev
```

---

## 📜 Available Scripts

- `pnpm dev`: Starts the development server.
- `pnpm build`: Creates an optimized production build.
- `pnpm start`: Starts the production server.
- `pnpm lint`: Runs the linter to ensure code quality.

---

## 🔒 Security & Performance

The project implements multiple layers of security and optimization:
1. **Firestore Rules:** Granular restrictions where users can only read/write their own documents.
2. **Storage Rules:** Validation of file types, maximum sizes (5MB), and project ownership checks via Firestore lookups.
3. **Middleware:** Server-side session verification to prevent unauthorized access to dashboard routes.
4. **Validation:** Centralized `validators.ts` to sanitize and validate inputs before they reach the backend.

---

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
