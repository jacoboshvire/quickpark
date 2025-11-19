"use server";

import { z } from "zod";
import { createSession, deleteSession } from "../lib/session";
import { redirect } from "next/navigation";

const testUser = {
  id: "1",
  email: "jacoshevire@gmail.com",
  password: "12345678",
};

const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }).trim(),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" })
    .trim(),
});

export async function login(prevState: any, formData: FormData) {
  const result = loginSchema.safeParse(Object.fromEntries(formData));

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }

  const { email, password } = result.data;

  //checking if the email/password valid 
  if (email !== testUser.email) {
    return {
      errors: {
        email: ["Invalid email"],
      },
    };
  } else if (password !== testUser.password){
    return {
        errors: {
            password: ["invalid password"]
        }
    }
  }

  await createSession(testUser.id);

  redirect("/");
}

export async function logout() {
  await deleteSession();
  redirect("/login");
}