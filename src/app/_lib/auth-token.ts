import { headers } from "next/headers";
import { getToken } from "next-auth/jwt";

export type FreshCartSessionToken = {
  backendToken: string;
  userId: string;
};

export async function getFreshCartSessionToken(): Promise<FreshCartSessionToken | null> {
  const requestHeaders = await headers();
  const session = await getToken({
    req: { headers: requestHeaders },
    secret: process.env.AUTH_SECRET,
  });

  if (typeof session?.backendToken !== "string" || !session.backendToken) return null;
  const userId = typeof session.userId === "string" ? session.userId : session.sub;
  if (!userId) return null;

  return { backendToken: session.backendToken, userId };
}
