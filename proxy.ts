import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { decrypt } from "./app/lib/session";

const protectedRoutes = ["/", "/profile", "/seller", "/dashboard"];
const publicRoutes = ["/login", "/signin"];
const homeRoutes = ["/"]

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.includes(path);
  const isPublicRoute = publicRoutes.includes(path);
  const isHomeRoute = homeRoutes.includes(path)

  const cookie = (await cookies()).get("session")?.value;
  const session = await decrypt(cookie);

  if (isProtectedRoute && !session?.userId) {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }

  if (isPublicRoute && session?.userId) {
    return NextResponse.redirect(new URL("/", req.nextUrl));
  }

  if (isHomeRoute){
    return NextResponse.redirect(new URL("/dashboard", req.nextUrl))
  }

  return NextResponse.next();
}