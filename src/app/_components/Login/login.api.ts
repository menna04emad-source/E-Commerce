import { getApiUrl } from "@/lib/api-url";

type SignInResponse = {
  token?: string;
  message?: string;
  user?: { _id?: string; id?: string; name?: string; email?: string };
};

export type FreshCartAuthUser = {
  id: string;
  userId: string;
  name: string;
  email: string;
  backendToken: string;
};

function getUserIdFromToken(token: string): string | undefined {
  try {
    const payload = token.split(".")[1];
    if (!payload) return undefined;
    const claims = JSON.parse(Buffer.from(payload, "base64url").toString("utf8")) as {
      id?: unknown;
      userId?: unknown;
      sub?: unknown;
    };
    const id = claims.id ?? claims.userId ?? claims.sub;
    return typeof id === "string" && id.length > 0 ? id : undefined;
  } catch {
    return undefined;
  }
}

export async function authenticateFreshCartUser(email: string, password: string) {
  const response = await fetch(getApiUrl("v1/auth/signin"), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
    cache: "no-store",
  });

  const result = (await response.json().catch(() => ({}))) as SignInResponse;
  if (!response.ok || !result.token) return null;
  // The Route API may omit the user ID in `user`, while including it in the JWT `id` claim.
  const userId = result.user?._id ?? result.user?.id ?? getUserIdFromToken(result.token);
  if (!userId) return null;

  return {
    id: userId,
    userId,
    name: result.user?.name ?? email,
    email: result.user?.email ?? email,
    backendToken: result.token,
  } satisfies FreshCartAuthUser;
}
