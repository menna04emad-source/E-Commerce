"use server";

import { signupSchema } from "./signup.logic";
import { getApiUrl } from "@/lib/api-url";

type SignupActionResult =
  | { success: true; message: string }
  | { success: false; message: string };

export async function createAccount(values: unknown): Promise<SignupActionResult> {
  const validation = signupSchema.safeParse(values);
  if (!validation.success) {
    return {
      success: false,
      message: validation.error.issues[0]?.message ?? "Check the form fields.",
    };
  }

  const { confirmPassword, terms: _terms, ...account } = validation.data;

  try {
    const response = await fetch(getApiUrl("v1/auth/signup"), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...account, rePassword: confirmPassword }),
      cache: "no-store",
    });
    const data: { message?: string; errors?: Record<string, { msg?: string }> } =
      await response.json();

    if (!response.ok) {
      const details = Object.values(data.errors ?? {})[0]?.msg;
      return {
        success: false,
        message:
          data.message ??
          details ??
          "We could not create your account. Please try again.",
      };
    }

    return { success: true, message: data.message ?? "Your FreshCart account is ready." };
  } catch {
    return { success: false, message: "Unable to reach the server. Please try again." };
  }
}
