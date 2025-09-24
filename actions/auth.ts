"use server";

import { z } from "zod";
import { signInSchema, type SignInFormData } from "@/lib/schemas";

export type AuthResult = {
  success: boolean;
  message: string;
  user?: {
    id: string;
    username: string;
    email: string;
    avatar?: string | null;
  };
};

export async function signInAction({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_CONNECTION_URL}/login`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      }
    );

    if (!res.ok) {
      return { success: false, message: (await res.json()).errors };
    }

    const data = await res.json();

    return { success: true, data: data };
  } catch (error) {
    console.error("Sign in error:", error);

    if (error instanceof z.ZodError) {
      return {
        success: false,
        message: error.errors[0]?.message || "Validation error",
      };
    }

    return {
      success: false,
      message: "An unexpected error occurred. Please try again.",
    };
  }
}

export async function signUpAction(formData: FormData) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_CONNECTION_URL}/register`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
        body: formData,
      }
    );

    if (!res.ok) {
      return { success: false, message: (await res.json()).errors };
    }

    const data = await res.json();

    return { success: true, data: data };
  } catch (error) {
    console.error("Sign up error:", error);

    if (error instanceof z.ZodError) {
      return {
        success: false,
        message: error.errors[0]?.message || "Validation error",
      };
    }

    return {
      success: false,
      message: "An unexpected error occurred. Please try again.",
    };
  }
}
