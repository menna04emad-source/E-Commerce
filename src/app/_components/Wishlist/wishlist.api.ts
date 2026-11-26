import { getApiUrl } from "@/lib/api-url";
import type { Product } from "../../_types/product";
import { getFreshCartSessionToken } from "../../_lib/auth-token";
import { normalizeWishlistProducts } from "./wishlist.logic";

export async function getWishlist(): Promise<Product[]> {
  const session = await getFreshCartSessionToken();
  if (!session) return [];

  try {
    const response = await fetch(getApiUrl("v1/wishlist"), {
      headers: { token: session.backendToken, Authorization: `Bearer ${session.backendToken}` },
      cache: "no-store",
    });
    if (!response.ok) return [];
    const result = (await response.json()) as {
      data?: { data?: unknown[] } | unknown[];
    };
    const payload = result.data;
    const items = Array.isArray(payload)
      ? payload
      : payload && typeof payload === "object" && "data" in payload
        ? payload.data
        : [];
    return normalizeWishlistProducts(items);
  } catch {
    return [];
  }
}
