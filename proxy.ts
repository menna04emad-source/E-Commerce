import { NextResponse, type NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

const protectedRoutes = ["/cart", "/checkout", "/orders"];

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (!protectedRoutes.some((route) => pathname === route || pathname.startsWith(`${route}/`))) {
    return NextResponse.next();
  }

  const session = await getToken({ req: request, secret: process.env.AUTH_SECRET });
  if (session?.backendToken) return NextResponse.next();

  const loginUrl = new URL("/login", request.url);
  loginUrl.searchParams.set("callbackUrl", `${pathname}${request.nextUrl.search}`);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ["/cart/:path*", "/checkout/:path*", "/orders/:path*"],
};
