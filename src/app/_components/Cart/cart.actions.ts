"use server";

import { revalidatePath } from "next/cache";
import { getApiUrl } from "@/lib/api-url";
import { getFreshCartSessionToken } from "../../_lib/auth-token";
import { getUserCart } from "./cart.api";

type ActionResult = { success: true; message: string; count?: number } | { success: false; message: string };

async function requestCart(path: string, method: string, body?: object) {
  const session = await getFreshCartSessionToken();
  if (!session) return { response: null, message: "Sign in before adding or changing cart items." };

  try {
    const response = await fetch(getApiUrl(path), {
      method,
      headers: {
        token: session.backendToken,
        Authorization: `Bearer ${session.backendToken}`,
        ...(body ? { "Content-Type": "application/json" } : {}),
      },
      ...(body ? { body: JSON.stringify(body) } : {}),
      cache: "no-store",
    });
    const data = (await response.json().catch(() => ({}))) as { message?: string };
    return { response, message: data.message };
  } catch {
    return { response: null, message: "Unable to reach the cart service. Please try again." };
  }
}

function finishCartAction(response: Response | null, message: string | undefined, fallback: string): ActionResult {
  if (!response) return { success: false, message: message ?? fallback };
  if (!response.ok) return { success: false, message: message ?? fallback };
  revalidatePath("/cart");
  revalidatePath("/checkout");
  revalidatePath("/orders");
  return { success: true, message: message ?? fallback };
}

export async function addToCart(productId: string): Promise<ActionResult> {
  if (!productId) return { success: false, message: "Choose a product first." };
  const { response, message } = await requestCart("v2/cart", "POST", { productId });
  return finishCartAction(response, message, "Product added to your cart.");
}

export async function updateCartQuantity(productId: string, count: number): Promise<ActionResult> {
  if (!productId || !Number.isInteger(count) || count < 1) {
    return { success: false, message: "Choose a quantity of at least one." };
  }
  const { response, message } = await requestCart(`v2/cart/${encodeURIComponent(productId)}`, "PUT", { count });
  return finishCartAction(response, message, "Cart quantity updated.");
}

export async function removeFromCart(productId: string): Promise<ActionResult> {
  if (!productId) return { success: false, message: "Choose a product to remove." };
  const { response, message } = await requestCart(`v2/cart/${encodeURIComponent(productId)}`, "DELETE");
  return finishCartAction(response, message, "Product removed from your cart.");
}

export async function clearUserCart(): Promise<ActionResult> {
  const { response, message } = await requestCart("v2/cart", "DELETE");
  return finishCartAction(response, message, "Your cart is now empty.");
}

export async function getCartQuantity(): Promise<number> {
  const cart = await getUserCart();
  return cart?.totalCartItems ?? cart?.products.reduce((sum, item) => sum + item.count, 0) ?? 0;
}
