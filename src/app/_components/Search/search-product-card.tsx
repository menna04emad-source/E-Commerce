"use client";

import Image from "next/image";
import Link from "next/link";
import { FaEye, FaRotate } from "react-icons/fa6";
import type { Product } from "../../_types/product";
import { WishlistToggle } from "../Wishlist/wishlist-toggle";
import { AddToCartButton } from "../Cart/add-to-cart-button";

export function SearchProductCard({ product }: { product: Product }) {
  const discounted = Boolean(product.priceAfterDiscount && product.priceAfterDiscount < product.price);
  const price = discounted ? product.priceAfterDiscount! : product.price;
  const rating = `${(product.ratingsAverage ?? 0).toFixed(1)} (${product.ratingsQuantity ?? 0})`;

  return (
    <article className="group overflow-hidden rounded-xl border border-slate-200 bg-white transition hover:-translate-y-1 hover:shadow-xl">
      <div className="relative flex h-52 items-center justify-center p-4">
        <Link href={`/productdetails/${product._id}`} className="flex h-full w-full items-center justify-center" aria-label={`View ${product.title}`}>
          <Image src={product.imageCover} alt={product.title} width={500} height={500} unoptimized className="h-full w-full object-contain" />
        </Link>
        {discounted && <span className="absolute top-3 left-3 rounded bg-rose-500 px-2 py-1 text-xs font-bold text-white">-{Math.round((1 - price / product.price) * 100)}%</span>}
        <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-100 transition sm:opacity-0 sm:group-hover:opacity-100">
          <WishlistToggle productId={product._id} />
          <button type="button" aria-label="Compare" className="grid size-8 place-items-center rounded-full border border-slate-100 bg-white text-slate-500 shadow-sm hover:text-green-600"><FaRotate /></button>
          <Link href={`/productdetails/${product._id}`} aria-label="View product" className="grid size-8 place-items-center rounded-full border border-slate-100 bg-white text-slate-500 shadow-sm hover:text-green-600"><FaEye /></Link>
        </div>
      </div>
      <div className="p-3">
        <Link href={`/productdetails/${product._id}`}>
          <p className="text-[11px] text-slate-400">{product.category?.name ?? "Featured"}</p>
          <h3 className="mt-1 line-clamp-2 min-h-10 text-sm text-slate-700">{product.title}</h3>
          <div className="mt-1 flex items-center gap-2"><span className="text-amber-400">★★★★★</span><small className="text-[10px] text-slate-500">{rating}</small></div>
        </Link>
        <div className="mt-2 flex items-center gap-2">
          <b className={discounted ? "text-green-600" : "text-slate-800"}>{price.toLocaleString()} EGP</b>
          {discounted && <del className="text-xs text-slate-400">{product.price.toLocaleString()} EGP</del>}
          <AddToCartButton productId={product._id} />
        </div>
      </div>
    </article>
  );
}
