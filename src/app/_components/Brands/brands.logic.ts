import type { Product } from "../../_types/product";

export function filterProductsByBrand(products: Product[], brandId: string) {
  return products.filter((product) => product.brand?._id === brandId);
}
