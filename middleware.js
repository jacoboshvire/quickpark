import { NextResponse } from "next/server";

const protectedRoutes = ["/dashboard", "/profile", "/seller"];
const adminRoutes = ["/admin/adminpage"];
const publicRoutes = ["/login", "/signup", "/admin/auth"];

export async function middleware(req) {
  const token = req.cookies.get("token")?.value;
  const url = req.nextUrl.clone();
  const path = url.pathname;

  let user = null;
  let isValid = false;

  // 🔁 ALWAYS redirect "/" → "/login"
  if (path === "/") {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // 🔐 Validate token
  if (token) {
    try {
      const res = await fetch(
        "https://quickpark-backend.vercel.app/api/user/me",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (res.ok) {
        user = await res.json();
        isValid = true;
      }
    } catch {
      isValid = false;
    }
  }

  /* ---------- ADMIN ROUTES ---------- */
  if (adminRoutes.includes(path)) {
    if (!isValid) {
      return NextResponse.redirect(new URL("/admin/auth", req.url));
    }

    if (user?.role !== "ADMIN") {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }

    return NextResponse.next();
  }

  /* ---------- PROTECTED ROUTES ---------- */
  if (protectedRoutes.includes(path) && !isValid) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  /* ---------- PUBLIC ROUTES ---------- */
  if (publicRoutes.includes(path) && isValid) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/dashboard",
    "/profile",
    "/seller",
    "/login",
    "/signup",
    "/admin/:path*",
  ],
};
