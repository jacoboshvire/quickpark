"use server";

import { z } from "zod";
import { redirect } from "next/navigation";

/* ------------------ SIGNUP SCHEMA ------------------ */
const signupSchema = z.object({
  fullname: z.string().min(2, "Full name is too short"),
  username: z.string().min(2, "Username is too short").regex(new RegExp(/^\S+$/), "Username cannot contain spaces"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  path: ["confirmPassword"],
  message: "Passwords do not match",
});

/* ------------------ SIGNUP ACTION ------------------ */
export async function signup(prevState: any, formData: FormData) {
  const formValues = Object.fromEntries(formData);

  // Validate with zod
  const result = signupSchema.safeParse(formValues);

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }

  const { fullname, username, email, password, confirmPassword } = result.data;

  try {
    const response = await fetch(
      "https://quickpark-backend.vercel.app/api/user",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullname,
          username,
          email,
          password,
          confirmPassword,
        }),
      }
    );

    const data = await response.json();

    // Backend validation error
    if (!response.ok) {
      return {
        errors: {
          email: [data.message || "Something went wrong"],
        },
      };
    }

    if (response.ok){
      console.log("User registered successfully:", data);
      // SUCCESS → redirect to login
      // redirect("/login")
    }
  ;

  } catch (err: any) {
    return {
      errors: {
        email: [err.message || "Network error"],
      },
    };
  }
}
