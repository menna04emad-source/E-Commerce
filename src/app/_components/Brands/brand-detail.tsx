import Image from "next/image";
import Link from "next/link";
import type { Brand } from "../../_types/brand";
import type { Product } from "../../_types/product";
import { ProductGrid } from "../Product/product-grid";

export function BrandDetail({ brand, products }: { brand: Brand; products: Product[] }) {
  return (
    <main className="min-h-[60vh] bg-slate-50">
      <section className="bg-gradient-to-r from-violet-600 via-purple-500 to-purple-400 text-white">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <p className="text-sm text-white/75"><Link href="/">Home</Link><span className="mx-2">/</span><Link href="/brands">Brands</Link><span className="mx-2">/</span>{brand.name}</p>
          <div className="mt-5 flex flex-wrap items-center gap-5">
            <div className="grid size-24 place-items-center rounded-2xl bg-white p-3 shadow-lg sm:size-28">
              {brand.image && <Image src={brand.image} alt={`${brand.name} logo`} width={180} height={100} unoptimized className="h-full w-full object-contain" />}
            </div>
            <div>
              <h1 className="text-3xl font-extrabold sm:text-4xl">{brand.name}</h1>
              <p className="mt-1 text-white/85">Products from {brand.name}</p>
            </div>
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
        <h2 className="mb-6 text-xl font-bold text-slate-800">Shop {brand.name}</h2>
        {products.length ? <ProductGrid products={products} /> : <p className="rounded-xl border border-dashed border-slate-300 bg-white py-16 text-center text-slate-500">No products from this brand are available right now.</p>}
      </section>
    </main>
  );
}
