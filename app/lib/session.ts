"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

/* ------------------ TYPES ------------------ */

export interface BackendUser {
  _id: string;
  fullname: string;
  email: string;
}

export interface BackendMeResponse extends BackendUser {}

/* ------------------ STORE BACKEND JWT ------------------ */

export async function createSession(token: string): Promise<void> {
  (await cookies()).set("token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    path: "/",
    maxAge: 7 * 24 * 60 * 60, // 7 days
  });
}

/* ------------------ DELETE SESSION ------------------ */

export async function deleteSession(): Promise<void> {
  (await cookies()).delete("token");
}

/* ------------------ GET RAW TOKEN ------------------ */

export async function getToken(): Promise<string | null> {
  return (await cookies()).get("token")?.value ?? null;
}

/* ------------------ FETCH CURRENT USER FROM BACKEND ------------------ */

export async function getCurrentUser(): Promise<BackendMeResponse | null> {
  const token = await getToken();
  if (!token) return null;

  const res = await fetch(
    "https://quickpark-backend.vercel.app/api/user/me",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    }
  );

  if (!res.ok) return null;

  return (await res.json()) as BackendMeResponse;
}

/* ------------------ PROTECT ROUTES ------------------ */

export async function requireAuth(): Promise<BackendMeResponse> {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  return user;
}

export async function getCurrentUsers(): Promise<BackendUser | null> {
  const token = (await cookies()).get("token")?.value;

  if (!token) return null;

  try {
    const res = await fetch("https://quickpark-backend.vercel.app/api/user/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    });

    if (!res.ok) return null;

    return res.json() as Promise<BackendUser>;
  } catch (error) {
    console.error("Error fetching /me:", error);
    return null;
  }
}
