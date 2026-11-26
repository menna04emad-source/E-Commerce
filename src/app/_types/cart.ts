import type { Product } from "./product";

export type CartItem = {
  _id?: string;
  count: number;
  price?: number;
  product: Product;
};

export type UserCart = {
  _id: string;
  products: CartItem[];
  totalCartPrice: number;
  totalCartItems?: number;
};
