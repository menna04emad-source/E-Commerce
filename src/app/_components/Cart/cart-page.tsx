"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState, useTransition } from "react";
import { FaCartShopping, FaTrash, FaMinus, FaPlus, FaTruckFast, FaLock, FaShieldHalved } from "react-icons/fa6";
import Swal from "sweetalert2";
import type { UserCart, CartItem } from "../../_types/cart";
import { clearUserCart, removeFromCart, updateCartQuantity } from "./cart.actions";

function itemUnitPrice(item: CartItem) {
  return item.price ?? item.product.priceAfterDiscount ?? item.product.price;
}

export function CartPage({ initialCart }: { initialCart: UserCart }) {
  const [cart, setCart] = useState(initialCart);
  const [pendingId, setPendingId] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const [promoOpen, setPromoOpen] = useState(false);

  useEffect(() => setCart(initialCart), [initialCart]);

  const itemCount = useMemo(() => cart.products.reduce((sum, item) => sum + item.count, 0), [cart.products]);
  const subtotal = useMemo(() => cart.products.reduce((sum, item) => sum + itemUnitPrice(item) * item.count, 0), [cart.products]);

  function updateQuantity(item: CartItem, count: number) {
    if (count < 1) return;
    setPendingId(item.product._id);
    startTransition(async () => {
      const result = await updateCartQuantity(item.product._id, count);
      if (result.success) {
        setCart((current) => ({
          ...current,
          products: current.products.map((line) => line.product._id === item.product._id ? { ...line, count } : line),
        }));
        window.dispatchEvent(new Event("freshcart:cart-updated"));
      } else {
        await Swal.fire({ icon: "error", title: "Could not update quantity", text: result.message, confirmButtonColor: "#16a34a" });
      }
      setPendingId(null);
    });
  }

  function removeItem(item: CartItem) {
    setPendingId(item.product._id);
    startTransition(async () => {
      const result = await removeFromCart(item.product._id);
      if (result.success) {
        setCart((current) => ({ ...current, products: current.products.filter((line) => line.product._id !== item.product._id) }));
        window.dispatchEvent(new Event("freshcart:cart-updated"));
      } else {
        await Swal.fire({ icon: "error", title: "Could not remove product", text: result.message, confirmButtonColor: "#16a34a" });
      }
      setPendingId(null);
    });
  }

  function emptyCart() {
    startTransition(async () => {
      const confirmation = await Swal.fire({
        icon: "warning",
        title: "Clear your cart?",
        text: "This removes every item in your cart.",
        showCancelButton: true,
        confirmButtonText: "Clear cart",
        confirmButtonColor: "#e11d48",
      });
      if (!confirmation.isConfirmed) return;
      const result = await clearUserCart();
      if (result.success) {
        setCart((current) => ({ ...current, products: [], totalCartPrice: 0, totalCartItems: 0 }));
        window.dispatchEvent(new Event("freshcart:cart-updated"));
      } else {
        await Swal.fire({ icon: "error", title: "Could not clear cart", text: result.message, confirmButtonColor: "#16a34a" });
      }
    });
  }

  return (
    <main className="min-h-[55vh] flex-1 bg-slate-50">
      <div className="mx-auto max-w-[1504px] px-4 py-6 sm:px-6 lg:px-8">
        <p className="text-sm text-slate-500"><Link href="/">Home</Link><span className="mx-2">/</span><span className="text-slate-800">Shopping Cart</span></p>
        <header className="mb-7 mt-4 flex items-center gap-4">
          <span className="grid size-12 place-items-center rounded-xl bg-green-600 text-xl text-white"><FaCartShopping /></span>
          <div>
            <h1 className="text-2xl font-extrabold text-slate-900 sm:text-3xl">Shopping Cart</h1>
            <p className="text-sm text-slate-500">You have <b className="text-green-600">{itemCount} items</b> in your cart</p>
          </div>
        </header>

        {cart.products.length ? (
          <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(340px,1fr)]">
            <section className="space-y-3" aria-label="Cart products">
              {cart.products.map((item) => {
                const price = itemUnitPrice(item);
                const busy = pendingId === item.product._id;
                return (
                  <article key={item.product._id} className="grid gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:grid-cols-[112px_minmax(0,1fr)_auto] sm:items-center sm:p-5">
                    <Link href={`/productdetails/${item.product._id}`} className="relative grid h-28 place-items-center overflow-hidden rounded-xl border border-slate-100 bg-slate-50 p-3 sm:size-32">
                      <Image src={item.product.imageCover} alt={item.product.title} fill unoptimized sizes="128px" className="object-contain p-3" />
                    </Link>
                    <div className="min-w-0">
                      <Link href={`/productdetails/${item.product._id}`} className="font-semibold text-slate-900 hover:text-green-700">{item.product.title}</Link>
                      <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-slate-500">
                        <span className="rounded-full bg-green-50 px-2.5 py-1 text-green-700">{item.product.category?.name ?? "Product"}</span>
                        {item.product.brand?.name && <span>SKU: {item.product._id.slice(-6).toUpperCase()}</span>}
                      </div>
                      <p className="mt-2 font-bold text-green-600">{price.toLocaleString()} EGP <span className="text-xs font-normal text-slate-400">per unit</span></p>
                      <div className="mt-3 inline-flex h-9 items-center gap-2 rounded-lg border border-slate-200 p-1">
                        <button type="button" aria-label="Decrease quantity" disabled={busy || item.count <= 1} onClick={() => updateQuantity(item, item.count - 1)} className="grid size-7 place-items-center rounded text-slate-500 hover:bg-slate-100 disabled:opacity-40"><FaMinus className="text-xs" /></button>
                        <span aria-live="polite" className="min-w-5 text-center text-sm font-semibold">{item.count}</span>
                        <button type="button" aria-label="Increase quantity" disabled={busy} onClick={() => updateQuantity(item, item.count + 1)} className="grid size-7 place-items-center rounded bg-green-600 text-white hover:bg-green-700 disabled:opacity-50"><FaPlus className="text-xs" /></button>
                      </div>
                    </div>
                    <div className="flex items-center justify-between gap-5 border-t border-slate-100 pt-3 sm:flex-col sm:items-end sm:border-0 sm:pt-0">
                      <div className="text-right"><span className="block text-xs text-slate-400">Total</span><b className="text-lg text-slate-900">{(price * item.count).toLocaleString()} <span className="text-xs font-normal text-slate-400">EGP</span></b></div>
                      <button type="button" aria-label={`Remove ${item.product.title}`} disabled={isPending} onClick={() => removeItem(item)} className="grid size-10 place-items-center rounded-xl border border-rose-100 bg-rose-50 text-rose-500 hover:bg-rose-100 disabled:opacity-50"><FaTrash /></button>
                    </div>
                  </article>
                );
              })}
              <div className="flex flex-wrap items-center justify-between gap-4 border-t border-slate-200 pt-4 text-sm">
                <Link href="/shop" className="font-medium text-green-700 hover:text-green-800">← Continue Shopping</Link>
                <button type="button" disabled={isPending} onClick={emptyCart} className="flex items-center gap-2 text-slate-400 hover:text-rose-600 disabled:opacity-50"><FaTrash className="text-xs" /> Clear all items</button>
              </div>
            </section>

            <aside className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm lg:sticky lg:top-28">
              <header className="bg-gradient-to-r from-green-600 to-green-700 px-5 py-4 text-white">
                <h2 className="flex items-center gap-2 font-bold"><FaLock /> Order Summary</h2>
                <p className="mt-1 text-xs text-green-50">{itemCount} items in your cart</p>
              </header>
              <div className="space-y-5 p-5">
                <div className="flex items-center gap-3 rounded-xl bg-green-50 p-4 text-green-700">
                  <span className="grid size-10 place-items-center rounded-full bg-green-100"><FaTruckFast /></span>
                  <span><b className="block text-sm">Free Shipping!</b><small>You qualify for free delivery</small></span>
                </div>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between text-slate-600"><span>Subtotal</span><span>{subtotal.toLocaleString()} EGP</span></div>
                  <div className="flex justify-between text-slate-600"><span>Shipping</span><span className="font-medium text-green-600">FREE</span></div>
                  <div className="flex justify-between border-t border-dashed border-slate-200 pt-4 font-bold text-slate-900"><span>Total</span><span className="text-xl">{subtotal.toLocaleString()} <small className="text-xs font-normal">EGP</small></span></div>
                </div>
                <div>
                  <button type="button" onClick={() => setPromoOpen((open) => !open)} className="w-full rounded-xl border border-dashed border-slate-300 py-3 text-sm text-slate-600 hover:border-green-400 hover:text-green-700">Apply Promo Code</button>
                  {promoOpen && <p className="mt-2 text-xs text-slate-500">Promo codes are not available yet.</p>}
                </div>
                <Link href="/checkout" className="flex h-12 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-green-600 to-green-700 font-semibold text-white shadow-md shadow-green-700/15 hover:from-green-700 hover:to-green-800"><FaLock /> Secure Checkout</Link>
                <div className="flex items-center justify-center gap-4 text-[11px] text-slate-500"><span className="flex items-center gap-1"><FaShieldHalved className="text-green-600" /> Secure Payment</span><span className="h-4 w-px bg-slate-200" /><span className="flex items-center gap-1"><FaTruckFast className="text-blue-500" /> Fast Delivery</span></div>
                <Link href="/shop" className="block pt-1 text-center text-sm font-medium text-green-700 hover:text-green-800">← Continue Shopping</Link>
              </div>
            </aside>
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-5 py-16 text-center">
            <span className="mx-auto grid size-16 place-items-center rounded-full bg-green-50 text-2xl text-green-600"><FaCartShopping /></span>
            <h2 className="mt-4 text-xl font-bold text-slate-800">Your cart is empty</h2>
            <p className="mt-2 text-sm text-slate-500">Find something fresh and add it to your cart.</p>
            <Link href="/shop" className="mt-6 inline-flex h-11 items-center rounded-lg bg-green-600 px-5 font-semibold text-white hover:bg-green-700">Continue Shopping</Link>
          </div>
        )}
      </div>
    </main>
  );
}
