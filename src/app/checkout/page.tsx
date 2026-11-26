import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { CheckoutForm } from "../_components/Checkout/checkout-form";
import { getUserCart } from "../_components/Cart/cart.api";

export const metadata: Metadata = { title: "Checkout | FreshCart", description: "Review your cart and complete your FreshCart order." };

async function CheckoutContent() {
  const cart = await getUserCart();
  if (!cart?.products.length) redirect("/cart");
  return <main className="min-h-[60vh] bg-slate-50 px-4 py-8 sm:px-6 lg:px-8"><div className="mx-auto max-w-7xl"><nav className="mb-5 text-sm text-slate-500"><a href="/">Home</a><span className="mx-2">/</span><a href="/cart">Cart</a><span className="mx-2">/</span><span className="text-slate-800">Checkout</span></nav><div className="mb-7 flex flex-wrap items-end justify-between gap-4"><div><h1 className="text-3xl font-bold tracking-tight text-slate-900">Complete Your Order</h1><p className="mt-2 text-slate-500">Review your items and complete your purchase</p></div><a href="/cart" className="text-sm font-medium text-green-700 hover:text-green-800">← Back to Cart</a></div><CheckoutForm cart={cart} /></div></main>;
}

export default function CheckoutPage() {
  return <Suspense fallback={<div className="grid min-h-[55vh] place-items-center text-sm text-slate-500">Loading checkout…</div>}><CheckoutContent /></Suspense>;
}
