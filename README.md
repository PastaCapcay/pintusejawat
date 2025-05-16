# Next.js Admin Dashboard

A modern admin dashboard built with Next.js 15 and Shadcn UI.

## Overview

This is a starter template using the following stack:

- Framework - [Next.js 15](https://nextjs.org/13)
- Language - [TypeScript](https://www.typescriptlang.org)
- Styling - [Tailwind CSS v4](https://tailwindcss.com)
- Components - [Shadcn-ui](https://ui.shadcn.com)
- Schema Validations - [Zod](https://zod.dev)
- State Management - [Zustand](https://zustand-demo.pmnd.rs)
- Search params state manager - [Nuqs](https://nuqs.47ng.com/)
- Auth - [Supabase](https://supabase.com)
- Tables - [Tanstack Data Tables](https://ui.shadcn.com/docs/components/data-table) • [Dice UI](https://www.diceui.com/docs/components/data-table)
- Forms - [React Hook Form](https://ui.shadcn.com/docs/components/form)
- Command+k interface - [kbar](https://kbar.vercel.app/)
- Linting - [ESLint](https://eslint.org)
- Pre-commit Hooks - [Husky](https://typicode.github.io/husky/)
- Formatting - [Prettier](https://prettier.io)

## Pages

| Pages          | Specifications                                                                                                                                                                                                                                                          |
| :------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Signup/Signin  | Authentication with **Supabase** provides secure authentication and user management with multiple sign-in options including email/password authentication and social logins - all designed to enhance security while delivering a seamless user experience. |
| Dashboard      | Cards with recharts graphs for analytics. Parallel routes in the overview sections with independent loading, error handling, and isolated component rendering.                                                                                                          |
| Product        | Tanstack tables with server side searching, filter, pagination by Nuqs which is a Type-safe search params state manager in nextjs                                                                                                                                       |
| Product/new    | A Product Form with shadcn form (react-hook-form + zod).                                                                                                                                                                                                                |
| Profile        | User profile management interface that allows users to manage their profile and security settings                                                                                                                                                             |
| Kanban Board   | A Drag n Drop task management board with dnd-kit and zustand to persist state locally.                                                                                                                                                                                  |
| Not Found      | Not Found Page Added in the root level                                                                                                                                                                                                                                  |

## Feature based organization

```plaintext
src/
├── app/ # Next.js App Router directory
│ ├── (auth)/ # Auth route group
│ │ ├── (signin)/
│ ├── (dashboard)/ # Dashboard route group
│ │ ├── layout.tsx
│ │ ├── loading.tsx
│ │ └── page.tsx
│ └── api/ # API routes
│
├── components/ # Shared components
│ ├── ui/ # UI components (buttons, inputs, etc.)
│ └── layout/ # Layout components (header, sidebar, etc.)
│
├── features/ # Feature-based modules
│ ├── feature/
│ │ ├── components/ # Feature-specific components
│ │ ├── actions/ # Server actions
│ │ ├── schemas/ # Form validation schemas
│ │ └── utils/ # Feature-specific utilities
│ │
├── lib/ # Core utilities and configurations
│ ├── auth/ # Auth configuration
│ ├── db/ # Database utilities
│ └── utils/ # Shared utilities
│
├── hooks/ # Custom hooks
│ └── use-debounce.ts
│
├── stores/ # Zustand stores
│ └── dashboard-store.ts
│
└── types/ # TypeScript types
└── index.ts
```

## Getting Started

> [!NOTE]  
> We are using **Next 15** with **React 19**, follow these steps:

1. Clone the repository
2. Run `pnpm install` (we have legacy-peer-deps=true added in the .npmrc)
3. Create a `.env.local` file by copying the example environment file: `cp env.example.txt .env.local`
4. Add the required environment variables to the `.env.local` file
5. Run `pnpm run dev`

You should now be able to access the application at http://localhost:3000.

> [!WARNING]
> After cloning or forking the repository, be cautious when pulling or syncing with the latest changes, as this may result in breaking conflicts.
