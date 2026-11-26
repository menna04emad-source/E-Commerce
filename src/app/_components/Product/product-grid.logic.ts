import type { Product } from "../../_types/product";

export function getVisibleProducts(products: Product[], limit?: number) {
  return typeof limit === "number" ? products.slice(0, limit) : products;
}
