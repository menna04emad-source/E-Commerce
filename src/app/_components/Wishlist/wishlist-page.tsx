"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { FaHeart, FaTrash, FaArrowLeft } from "react-icons/fa6";
import Swal from "sweetalert2";
import type { Product } from "../../_types/product";
import { removeProductFromWishlist } from "./wishlist.actions";
import { AddToCartButton } from "../Cart/add-to-cart-button";

export function WishlistPage({ products: initialProducts }: { products: Product[] }) {
  const router = useRouter();
  const [products, setProducts] = useState(initialProducts);
  const [pendingId, setPendingId] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function remove(product: Product) {
    setPendingId(product._id);
    startTransition(async () => {
      const result = await removeProductFromWishlist(product._id);
      await Swal.fire({
        icon: result.success ? "success" : "error",
        title: result.success ? "Removed from wishlist" : "Could not remove item",
        text: result.message,
        confirmButtonColor: "#16a34a",
      });
      if (result.success) {
        setProducts((current) => current.filter((item) => item._id !== product._id));
        window.dispatchEvent(new Event("freshcart:wishlist-updated"));
        router.refresh();
      }
      setPendingId(null);
    });
  }

  return (
    <main className="min-h-[55vh] flex-1 bg-slate-50">
      <header className="border-b border-slate-100 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <p className="text-sm text-slate-500"><Link href="/">Home</Link><span className="mx-2">/</span><span className="text-slate-800">Wishlist</span></p>
          <div className="mt-4 flex items-center gap-4">
            <span className="grid size-12 place-items-center rounded-xl bg-rose-50 text-xl text-rose-500"><FaHeart /></span>
            <div>
              <h1 className="text-2xl font-extrabold text-slate-900">My Wishlist</h1>
              <p className="text-sm text-slate-500">{products.length} {products.length === 1 ? "item" : "items"} saved</p>
            </div>
          </div>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {products.length ? (
          <>
            <div className="hidden overflow-hidden rounded-2xl border border-slate-200 bg-white md:block">
              <div className="grid grid-cols-[minmax(0,1fr)_150px_130px_190px] bg-slate-50 px-6 py-4 text-sm font-medium text-slate-500">
                <span>Product</span><span>Price</span><span>Status</span><span className="text-center">Actions</span>
              </div>
              {products.map((product) => {
                const price = product.priceAfterDiscount ?? product.price;
                return (
                  <div key={product._id} className="grid grid-cols-[minmax(0,1fr)_150px_130px_190px] items-center gap-4 border-t border-slate-100 px-6 py-4">
                    <Link href={`/productdetails/${product._id}`} className="flex min-w-0 items-center gap-4">
                      <span className="relative grid size-20 shrink-0 place-items-center overflow-hidden rounded-xl border border-slate-100 bg-slate-50 p-2">
                        <Image src={product.imageCover} alt={product.title} fill unoptimized sizes="80px" className="object-contain p-2" />
                      </span>
                      <span className="min-w-0">
                        <span className="line-clamp-2 font-medium text-slate-800">{product.title}</span>
                        <span className="mt-1 block text-sm text-slate-400">{product.category?.name ?? "Featured"}</span>
                      </span>
                    </Link>
                    <div className="font-semibold text-slate-900">{price.toLocaleString()} EGP{product.priceAfterDiscount && <del className="mt-1 block text-xs font-normal text-slate-400">{product.price.toLocaleString()} EGP</del>}</div>
                    <span className="w-fit rounded-full bg-green-50 px-3 py-1 text-xs font-medium text-green-700">● In Stock</span>
                    <div className="flex items-center justify-center gap-2">
                      <AddToCartButton productId={product._id} compact />
                      <button type="button" aria-label={`Remove ${product.title} from wishlist`} disabled={isPending} onClick={() => remove(product)} className="grid size-10 place-items-center rounded-lg border border-slate-200 text-slate-400 hover:border-rose-200 hover:text-rose-600 disabled:opacity-50"><FaTrash /></button>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="space-y-3 md:hidden">
              {products.map((product) => (
                <article key={product._id} className="flex gap-3 rounded-xl border border-slate-200 bg-white p-3 shadow-sm">
                  <Link href={`/productdetails/${product._id}`} className="relative size-24 shrink-0 overflow-hidden rounded-lg bg-slate-50">
                    <Image src={product.imageCover} alt={product.title} fill unoptimized sizes="96px" className="object-contain p-2" />
                  </Link>
                  <div className="min-w-0 flex-1">
                    <Link href={`/productdetails/${product._id}`} className="line-clamp-2 text-sm font-semibold text-slate-800">{product.title}</Link>
                    <p className="mt-1 text-xs text-slate-400">{product.category?.name ?? "Featured"}</p>
                    <p className="mt-2 font-bold text-slate-900">{(product.priceAfterDiscount ?? product.price).toLocaleString()} EGP</p>
                    <div className="mt-3 flex items-center gap-2">
                      <AddToCartButton productId={product._id} compact />
                      <button type="button" aria-label={`Remove ${product.title} from wishlist`} disabled={isPending} onClick={() => remove(product)} className="grid size-9 place-items-center rounded-lg border border-slate-200 text-slate-400 hover:text-rose-600 disabled:opacity-50"><FaTrash /></button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
            {pendingId && <p className="sr-only" aria-live="polite">Removing item from wishlist</p>}
          </>
        ) : (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-5 py-16 text-center">
            <span className="mx-auto grid size-16 place-items-center rounded-full bg-rose-50 text-2xl text-rose-400"><FaHeart /></span>
            <h2 className="mt-4 text-xl font-bold text-slate-800">Your wishlist is empty</h2>
            <p className="mt-2 text-sm text-slate-500">Save products you love and find them here later.</p>
            <Link href="/shop" className="mt-6 inline-flex h-11 items-center gap-2 rounded-lg bg-green-600 px-5 font-semibold text-white hover:bg-green-700"><FaArrowLeft /> Continue Shopping</Link>
          </div>
        )}
        {products.length > 0 && <Link href="/shop" className="mt-6 inline-flex items-center gap-2 text-sm text-slate-500 hover:text-green-700"><FaArrowLeft /> Continue Shopping</Link>}
      </section>
    </main>
  );
}
