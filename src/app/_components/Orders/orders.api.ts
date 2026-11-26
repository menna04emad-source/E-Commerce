import { getApiUrl } from "@/lib/api-url";
import { getFreshCartSessionToken } from "../../_lib/auth-token";
import type { CustomerOrder } from "../../_types/order";

export async function getUserOrders(): Promise<CustomerOrder[]> {
  const session = await getFreshCartSessionToken();
  if (!session) return [];

  try {
    const response = await fetch(getApiUrl(`v1/orders/user/${encodeURIComponent(session.userId)}`), {
      headers: { token: session.backendToken, Authorization: `Bearer ${session.backendToken}` },
      cache: "no-store",
    });
    if (!response.ok) return [];
    const result = (await response.json()) as { data?: CustomerOrder[] | { data?: CustomerOrder[] } };
    if (Array.isArray(result.data)) return result.data;
    if (result.data && typeof result.data === "object" && Array.isArray(result.data.data)) return result.data.data;
    return [];
  } catch {
    return [];
  }
}
