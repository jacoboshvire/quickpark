import { NextResponse } from "next/server";
// import { usePathname } from "next/navigation";

const protectedRoutes = ["/dashboard", "/profile", "/seller"];
const publicRoutes = ["/login", "/signup", "/"];
const homeRoutes = ["/"];

export async function middleware(req) {
  const token = req.cookies.get("token")?.value;
  const path = req.nextUrl.pathname;

  const isProtected = protectedRoutes.includes(path);
  const isPublic = publicRoutes.includes(path);
  const isHome = homeRoutes.includes(path);

  let isValid = false;

  if (token) {
    try {
      const check = await fetch("https://quickpark-backend.vercel.app/api/user/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      isValid = check.ok;
    } catch (e) {
      console.error("Error validating token:", e);
      isValid = false;
    }
  }
  if (isHome) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  if (isProtected && !isValid) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (isPublic && isValid) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard", "/profile", "/seller", "/login", "/signup", "/"],
};
