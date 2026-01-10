"use server";

import { z } from "zod";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const loginSchema = z.object({
  email: z.string().email().trim(),
  password: z.string().min(8).trim(),
});

export async function login(prevState: any, formData: FormData) {
  const result = loginSchema.safeParse(Object.fromEntries(formData));

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }

  const { email, password } = result.data;

  const res = await fetch(
    "https://quickpark-backend.vercel.app/api/user/login",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    }
  );

  // ✅ ALWAYS READ AS TEXT FIRST
  const raw = await res.text();

  let data;
  try {
    data = JSON.parse(raw);
  } catch {
    console.error("❌ Non-JSON login response:", raw);
    return {
      errors: {
        email: ["Server error. Please try again later."],
      },
    };
  }

  // ❌ LOGIN FAILED
  if (!res.ok) {
    return {
      errors: {
        email: [data.message || "Invalid login"],
      },
    };
  }

  // ✅ STORE JWT TOKEN (SECURE)
  (await cookies()).set("token", data.token, {
    httpOnly: false, // MUST be true
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 7 * 24 * 60 * 60,
  });

  redirect("/dashboard");
}

export async function logout() {
  (await cookies()).delete("token");
  redirect("/login");
}
