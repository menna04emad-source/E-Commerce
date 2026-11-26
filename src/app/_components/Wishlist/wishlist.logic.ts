import type { Product } from "../../_types/product";

type WishlistProduct = Product | { product: Product };

export function normalizeWishlistProducts(value: unknown): Product[] {
  if (!Array.isArray(value)) return [];
  return (value as WishlistProduct[])
    .map((item) => ("product" in item ? item.product : item))
    .filter((product): product is Product => Boolean(product?._id && product.title));
}
