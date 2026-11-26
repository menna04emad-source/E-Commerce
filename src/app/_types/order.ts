import type { Product } from "./product";

export type ShippingAddress = {
  details: string;
  phone: string;
  city: string;
  postalCode?: string;
};

export type OrderItem = {
  _id?: string;
  count: number;
  price: number;
  product: Product;
};

export type CustomerOrder = {
  _id: string;
  id?: number | string;
  createdAt: string;
  isPaid: boolean;
  isDelivered: boolean;
  paymentMethodType?: string;
  totalOrderPrice: number;
  cartItems?: OrderItem[];
  shippingAddress?: ShippingAddress;
};
