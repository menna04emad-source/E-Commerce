
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { CartPage } from "../_components/Cart/cart-page";
import { getUserCart } from "../_components/Cart/cart.api";

export const metadata: Metadata = {
  title: "Shopping Cart | FreshCart",
  description: "Review the products in your FreshCart shopping cart.",
};

async function CartContent() {
  const cart = await getUserCart();
  if (!cart) redirect("/login?callbackUrl=%2Fcart");
  return <CartPage initialCart={cart} />;
}

export default function CartRoute() {
  return <Suspense fallback={<div className="min-h-[55vh] flex-1 animate-pulse bg-slate-50" />}><CartContent /></Suspense>;
}
