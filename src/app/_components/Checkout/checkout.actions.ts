"use server";

import { revalidatePath } from "next/cache";
import { getApiUrl, getAppUrl } from "@/lib/api-url";
import { getFreshCartSessionToken } from "../../_lib/auth-token";
import { checkoutAddressSchema } from "./checkout.logic";

type CheckoutResult =
  | { success: true; message: string; redirectUrl?: string }
  | { success: false; message: string };

async function submitOrder(path: string, address: unknown, method: "POST" = "POST"): Promise<CheckoutResult> {
  const validation = checkoutAddressSchema.safeParse(address);
  if (!validation.success) return { success: false, message: validation.error.issues[0]?.message ?? "Check your shipping address." };
  const session = await getFreshCartSessionToken();
  if (!session) return { success: false, message: "Sign in to place an order." };

  try {
    const response = await fetch(getApiUrl(path), {
      method,
      headers: {
        "Content-Type": "application/json",
        token: session.backendToken,
        Authorization: `Bearer ${session.backendToken}`,
      },
      body: JSON.stringify({ shippingAddress: validation.data }),
      cache: "no-store",
    });
    const data = (await response.json().catch(() => ({}))) as {
      message?: string;
      session?: { url?: string };
      url?: string;
    };
    if (!response.ok) return { success: false, message: data.message ?? "The order could not be completed." };
    revalidatePath("/cart");
    revalidatePath("/checkout");
    revalidatePath("/orders");
    return { success: true, message: data.message ?? "Your order was placed successfully.", redirectUrl: data.session?.url ?? data.url };
  } catch {
    return { success: false, message: "Unable to reach the order service. Please try again." };
  }
}

export async function createCashOrder(cartId: string, address: unknown): Promise<CheckoutResult> {
  if (!cartId) return { success: false, message: "Your cart is empty." };
  return submitOrder(`v2/orders/${encodeURIComponent(cartId)}`, address);
}

export async function createCheckoutSession(cartId: string, address: unknown): Promise<CheckoutResult> {
  if (!cartId) return { success: false, message: "Your cart is empty." };
  const appUrl = getAppUrl();
  const path = `v1/orders/checkout-session/${encodeURIComponent(cartId)}?url=${encodeURIComponent(appUrl)}`;
  return submitOrder(path, address);
}
