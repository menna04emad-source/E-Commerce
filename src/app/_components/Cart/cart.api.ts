import { getApiUrl } from "@/lib/api-url";
import { getFreshCartSessionToken } from "../../_lib/auth-token";
import type { CartItem, UserCart } from "../../_types/cart";

type ApiCart = {
  _id?: string;
  id?: string;
  products?: CartItem[];
  totalCartPrice?: number;
  totalCartItems?: number;
};

export async function getUserCart(): Promise<UserCart | null> {
  const session = await getFreshCartSessionToken();
  if (!session) return null;

  try {
    const response = await fetch(getApiUrl("v2/cart"), {
      headers: { token: session.backendToken, Authorization: `Bearer ${session.backendToken}` },
      cache: "no-store",
    });
    if (!response.ok) return null;
    const body = (await response.json()) as { data?: ApiCart };
    const cart = body.data;
    if (!cart || !Array.isArray(cart.products)) return null;

    return {
      _id: cart._id ?? cart.id ?? "",
      products: cart.products,
      totalCartPrice: cart.totalCartPrice ?? cart.products.reduce((sum, item) => sum + (item.price ?? item.product.price) * item.count, 0),
      totalCartItems: cart.totalCartItems ?? cart.products.reduce((sum, item) => sum + item.count, 0),
    };
  } catch {
    return null;
  }
}
