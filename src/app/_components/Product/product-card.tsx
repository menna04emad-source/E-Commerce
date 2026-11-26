import Image from "next/image";
import { FaEye, FaRotate } from "react-icons/fa6";
import type { Product } from "../../_types/product";
import { formatRating } from "../Home/home-data.logic";
import { getProductCardData } from "./product-card.logic";
import Link from "next/link";
import { WishlistToggle } from "../Wishlist/wishlist-toggle";
import { AddToCartButton } from "../Cart/add-to-cart-button";

export function ProductCard({ product }: { product: Product }) {
  const { price, originalPrice, discount } = getProductCardData(product);
  return (
    <article className="group overflow-hidden rounded-xl border border-slate-200 bg-white transition hover:-translate-y-1 hover:shadow-xl">
      <div className="relative flex h-52 items-center justify-center p-4">
        <Link href={`/productdetails/${product._id}`} className="flex h-full w-full items-center justify-center" aria-label={`View ${product.title}`}>
        <Image
          src={product.imageCover}
          alt={product.title}
          width={500}
          height={500}
          unoptimized
          className="h-full w-full object-contain"
        />
        </Link>
        {discount > 0 && (
          <span className="absolute top-3 left-3 rounded bg-rose-500 px-2 py-1 text-xs font-bold text-white">
            -{discount}%
          </span>
        )}
        <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-100 transition sm:opacity-0 sm:group-hover:opacity-100">
          <WishlistToggle productId={product._id} />
          {[FaRotate, FaEye].map((Icon, i) => (
            <button
              key={i}
              type="button"
              aria-label={i === 0 ? "Compare" : "Quick view"}
              className="grid size-8 place-items-center rounded-full border border-slate-100 bg-white text-slate-500 shadow-sm hover:text-green-600"
            >
              <Icon />
            </button>
          ))}
        </div>
      </div>
      <div className="p-3">
        <Link href={`/productdetails/${product._id}`}>
        <p className="text-[11px] text-slate-400">
          {product.category?.name ?? "Featured"}
        </p>
        <h3 className="mt-1 line-clamp-2 min-h-10 text-sm text-slate-700">
          {product.title}
        </h3>
        <div className="mt-1 flex items-center gap-2">
          <span className="text-amber-400">★★★★★</span>
          <small className="text-[10px] text-slate-500">
            {formatRating(product)}
          </small>
        </div>
        </Link>
        <div className="mt-2 flex items-center gap-2">
          <b className={discount ? "text-green-600" : "text-slate-800"}>
            {price} EGP
          </b>
          {originalPrice && (
            <del className="text-xs text-slate-400">{originalPrice} EGP</del>
          )}
          <AddToCartButton productId={product._id} />
        </div>
      </div>
    </article>
  );
}
