import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token
    const path = req.nextUrl.pathname

    // Jika user belum login dan mencoba mengakses halaman yang membutuhkan auth
    if (!token) {
      return NextResponse.redirect(new URL("/login", req.url))
    }

    // Redirect berdasarkan role
    if (token.role === "ADMIN" && !path.startsWith("/admin")) {
      return NextResponse.redirect(new URL("/admin", req.url))
    }

    if (token.role === "USER" && !path.startsWith("/dashboard")) {
      return NextResponse.redirect(new URL("/dashboard", req.url))
    }

    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token
    }
  }
)

export const config = {
  matcher: ["/admin/:path*", "/dashboard/:path*"]
} 