import Image from "next/image";
import Link from "next/link";
import type { Category } from "../../_types/category";
import type { Product } from "../../_types/product";
import { ProductGrid } from "../Product/product-grid";

export function CategoryDetail({ category, products }: { category: Category; products: Product[] }) {
  return (
    <main className="min-h-[60vh] bg-slate-50">
      <section className="bg-gradient-to-r from-green-600 via-green-500 to-emerald-400 text-white">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <p className="text-sm text-white/75"><Link href="/">Home</Link><span className="mx-2">/</span><Link href="/categories">Categories</Link><span className="mx-2">/</span>{category.name}</p>
          <div className="mt-5 flex flex-wrap items-center gap-5">
            {category.image && <div className="relative size-24 overflow-hidden rounded-2xl bg-white shadow-lg sm:size-28"><Image src={category.image} alt={category.name} fill unoptimized sizes="112px" className="object-cover" /></div>}
            <div>
              <h1 className="text-3xl font-extrabold sm:text-4xl">{category.name}</h1>
              <p className="mt-1 text-white/85">Browse products in {category.name}</p>
            </div>
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
        <h2 className="mb-6 text-xl font-bold text-slate-800">{category.name} Products</h2>
        {products.length ? <ProductGrid products={products} /> : <p className="rounded-xl border border-dashed border-slate-300 bg-white py-16 text-center text-slate-500">No products in this category are available right now.</p>}
      </section>
    </main>
  );
}
