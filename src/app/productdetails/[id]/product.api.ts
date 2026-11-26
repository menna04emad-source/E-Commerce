import type { Product } from "../../_types/product";
import { getApiUrl } from "@/lib/api-url";

type ProductResponse = { data: Product };

export async function getProductById(id: string): Promise<Product> {
  const response = await fetch(
    getApiUrl(`v1/products/${encodeURIComponent(id)}`),
    { next: { revalidate: 300 } },
  );

  if (!response.ok) {
    throw new Error("Failed to fetch product");
  }

  const result = (await response.json()) as ProductResponse;
  return result.data;
}
