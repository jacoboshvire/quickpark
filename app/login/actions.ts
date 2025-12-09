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

  // 1️⃣ CALL BACKEND LOGIN API
  const res = await fetch(
    "https://quickpark-backend.vercel.app/api/user/login",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    }
  );

  const data = await res.json();

  // 2️⃣ SHOW ERRORS IN UI
  if (!res.ok) {
    return {
      errors: {
        email: [data.message || "Invalid login"],
      },
    };
  }

  // 3️⃣ STORE JWT TOKEN IN COOKIE
  (await cookies()).set("token", data.token, {
    httpOnly: false,
    secure: false,
    sameSite: "strict",
    path: "/",
    maxAge: 7 * 24 * 60 * 60,
  });

  // 4️⃣ REDIRECT AFTER LOGIN
  redirect("/dashboard");
}

export async function logout() {
  (await cookies()).delete("token");
  redirect("/login");
}
