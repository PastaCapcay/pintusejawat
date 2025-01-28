import NextAuth from "next-auth"

declare module "next-auth" {
  interface User {
    id: string
    email: string
    name: string
    role: string
    grade?: string
  }

  interface Session {
    user: User & {
      role: string
      grade?: string
    }
  }
} 