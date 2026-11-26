"use server";

import { getApiUrl } from "@/lib/api-url";
import { revalidatePath } from "next/cache";
import { getFreshCartSessionToken } from "../../_lib/auth-token";
import { normalizeWishlistProducts } from "./wishlist.logic";

type WishlistActionResult = { success: true; message: string } | { success: false; message: string };
type WishlistToggleResult = WishlistActionResult & { saved?: boolean };
const API = getApiUrl("v1/wishlist");

async function getToken() {
  return (await getFreshCartSessionToken())?.backendToken;
}

export async function getWishlistCount(): Promise<number> {
  const token = await getToken();
  if (!token) return 0;
  try {
    const response = await fetch(API, { headers: { token }, cache: "no-store" });
    if (!response.ok) return 0;
    const result = (await response.json()) as { data?: { data?: unknown[] } | unknown[] };
    const payload = result.data;
    const items = Array.isArray(payload)
      ? payload
      : payload && typeof payload === "object" && "data" in payload
        ? payload.data
        : [];
    return normalizeWishlistProducts(items).length;
  } catch {
    return 0;
  }
}

async function readMessage(response: Response) {
  try {
    const data = (await response.json()) as { message?: string };
    return data.message;
  } catch {
    return undefined;
  }
}

export async function addProductToWishlist(productId: string): Promise<WishlistActionResult> {
  if (!productId) return { success: false, message: "Select a product first." };
  const token = await getToken();
  if (!token) return { success: false, message: "Sign in to save items to your wishlist." };

  try {
    const response = await fetch(API, {
      method: "POST",
      headers: { "Content-Type": "application/json", token },
      body: JSON.stringify({ productId }),
      cache: "no-store",
    });
    const message = await readMessage(response);
    if (response.ok) revalidatePath("/wishlist");
    return response.ok
      ? { success: true, message: message ?? "Product added to your wishlist." }
      : { success: false, message: message ?? "Could not add this product to your wishlist." };
  } catch {
    return { success: false, message: "Unable to reach the server. Please try again." };
  }
}

export async function removeProductFromWishlist(productId: string): Promise<WishlistActionResult> {
  if (!productId) return { success: false, message: "Select a product first." };
  const token = await getToken();
  if (!token) return { success: false, message: "Sign in to manage your wishlist." };

  try {
    const response = await fetch(`${API}/${encodeURIComponent(productId)}`, {
      method: "DELETE",
      headers: { token },
      cache: "no-store",
    });
    const message = await readMessage(response);
    if (response.ok) revalidatePath("/wishlist");
    return response.ok
      ? { success: true, message: message ?? "Product removed from your wishlist." }
      : { success: false, message: message ?? "Could not remove this product." };
  } catch {
    return { success: false, message: "Unable to reach the server. Please try again." };
  }
}

export async function toggleProductInWishlist(productId: string): Promise<WishlistToggleResult> {
  if (!productId) return { success: false, message: "Select a product first." };
  const token = await getToken();
  if (!token) return { success: false, message: "Sign in to save items to your wishlist." };

  try {
    const wishlistResponse = await fetch(API, { headers: { token }, cache: "no-store" });
    if (!wishlistResponse.ok) {
      return { success: false, message: "Could not load your wishlist. Please try again." };
    }
    const wishlistData = (await wishlistResponse.json()) as { data?: { data?: unknown[] } | unknown[] };
    const payload = wishlistData.data;
    const items = Array.isArray(payload)
      ? payload
      : payload && typeof payload === "object" && "data" in payload
        ? payload.data
        : [];
    const exists = normalizeWishlistProducts(items).some((product) => product._id === productId);

    const response = exists
      ? await fetch(`${API}/${encodeURIComponent(productId)}`, {
          method: "DELETE",
          headers: { token },
          cache: "no-store",
        })
      : await fetch(API, {
          method: "POST",
          headers: { "Content-Type": "application/json", token },
          body: JSON.stringify({ productId }),
          cache: "no-store",
        });
    const message = await readMessage(response);
    if (response.ok) revalidatePath("/wishlist");
    return response.ok
      ? { success: true, saved: !exists, message: message ?? (exists ? "Product removed from your wishlist." : "Product added to your wishlist.") }
      : { success: false, saved: exists, message: message ?? "Could not update your wishlist." };
  } catch {
    return { success: false, message: "Unable to reach the server. Please try again." };
  }
}
