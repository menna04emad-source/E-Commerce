"use server";

import { getApiUrl } from "@/lib/api-url";
import { getFreshCartSessionToken } from "../../_lib/auth-token";
import {
  changePasswordSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
  updateProfileSchema,
  verifyResetCodeSchema,
} from "./password-recovery.logic";

type ActionResult = { success: true; message: string } | { success: false; message: string };
type ApiResult = { message?: string; token?: string; [key: string]: unknown };

async function postJson(path: string, body: object, token?: string, method = "POST") {
  return fetch(getApiUrl(`v1/${path.replace(/^\/+/, "")}`), {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { token } : {}),
    },
    body: JSON.stringify(body),
    cache: "no-store",
  });
}

async function getApiResult(response: Response): Promise<ApiResult> {
  try {
    return (await response.json()) as ApiResult;
  } catch {
    return {};
  }
}

function invalidInput(message?: string): ActionResult {
  return { success: false, message: message ?? "Please check the information and try again." };
}

function apiFailure(data: ApiResult, fallback: string): ActionResult {
  return { success: false, message: data.message ?? fallback };
}

export async function requestPasswordReset(values: unknown): Promise<ActionResult> {
  const validation = forgotPasswordSchema.safeParse(values);
  if (!validation.success) return invalidInput(validation.error.issues[0]?.message);

  try {
    const response = await postJson("/auth/forgotPasswords", validation.data);
    const data = await getApiResult(response);
    if (!response.ok) return apiFailure(data, "We could not send a reset code. Try again.");
    return { success: true, message: data.message ?? "A reset code was sent to your email." };
  } catch {
    return invalidInput("Unable to reach the server. Please try again.");
  }
}

export async function verifyPasswordResetCode(values: unknown): Promise<ActionResult> {
  const validation = verifyResetCodeSchema.safeParse(values);
  if (!validation.success) return invalidInput(validation.error.issues[0]?.message);

  try {
    const response = await postJson("/auth/verifyResetCode", validation.data);
    const data = await getApiResult(response);
    if (!response.ok) return apiFailure(data, "That code could not be verified. Check it and try again.");
    return { success: true, message: data.message ?? "Your reset code has been verified." };
  } catch {
    return invalidInput("Unable to reach the server. Please try again.");
  }
}

export async function resetAccountPassword(values: unknown): Promise<ActionResult> {
  const validation = resetPasswordSchema.safeParse(values);
  if (!validation.success) return invalidInput(validation.error.issues[0]?.message);

  const { email, newPassword } = validation.data;
  try {
    const response = await postJson("/auth/resetPassword", { email, newPassword });
    const data = await getApiResult(response);
    if (!response.ok) return apiFailure(data, "We could not reset your password. Try again.");
    return { success: true, message: data.message ?? "Your password has been reset." };
  } catch {
    return invalidInput("Unable to reach the server. Please try again.");
  }
}

async function getAuthToken() {
  return (await getFreshCartSessionToken())?.backendToken;
}

export async function changeAccountPassword(values: unknown): Promise<ActionResult> {
  const validation = changePasswordSchema.safeParse(values);
  if (!validation.success) return invalidInput(validation.error.issues[0]?.message);
  const token = await getAuthToken();
  if (!token) return invalidInput("Sign in to change your password.");

  try {
    const response = await postJson("/users/changeMyPassword", validation.data, token, "PUT");
    const data = await getApiResult(response);
    if (!response.ok) return apiFailure(data, "We could not update your password. Try again.");
    return { success: true, message: data.message ?? "Your password has been updated." };
  } catch {
    return invalidInput("Unable to reach the server. Please try again.");
  }
}

export async function updateAccountInfo(values: unknown): Promise<ActionResult> {
  const validation = updateProfileSchema.safeParse(values);
  if (!validation.success) return invalidInput(validation.error.issues[0]?.message);
  const token = await getAuthToken();
  if (!token) return invalidInput("Sign in to update your account information.");

  try {
    const response = await fetch(getApiUrl("v1/users/updateMe/"), {
      method: "PUT",
      headers: { "Content-Type": "application/json", token },
      body: JSON.stringify(validation.data),
      cache: "no-store",
    });
    const data = await getApiResult(response);
    if (!response.ok) return apiFailure(data, "We could not update your account information.");
    return { success: true, message: data.message ?? "Your account information has been updated." };
  } catch {
    return invalidInput("Unable to reach the server. Please try again.");
  }
}
