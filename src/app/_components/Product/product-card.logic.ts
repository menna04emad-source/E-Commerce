import { getDiscount, getProductPrice } from "../Home/home-data.logic";
import type { Product } from "../../_types/product";

export function getProductCardData(product: Product) {
  const discount = getDiscount(product);
  return { price: getProductPrice(product), originalPrice: discount ? product.price : null, discount };
}
