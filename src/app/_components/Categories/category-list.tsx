import Image from "next/image";
import Link from "next/link";
import { FaLayerGroup } from "react-icons/fa6";
import type { Category } from "../../_types/category";

export function CategoryList({ categories }: { categories: Category[] }) {
  return (
    <>
      <section className="bg-gradient-to-r from-green-600 via-green-500 to-emerald-400 text-white">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-14 lg:px-8">
          <p className="text-sm text-white/75"><Link href="/">Home</Link><span className="mx-2">/</span>Categories</p>
          <div className="mt-5 flex items-center gap-4">
            <span className="grid size-14 place-items-center rounded-2xl bg-white/20 text-2xl shadow-lg"><FaLayerGroup /></span>
            <div>
              <h1 className="text-3xl font-extrabold sm:text-4xl">All Categories</h1>
              <p className="mt-1 text-white/85">Browse our wide range of product categories</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto min-h-[50vh] max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
        {categories.length ? (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {categories.map((category) => (
              <Link key={category._id} href={`/categories/${category._id}`} className="group rounded-2xl border border-slate-200 bg-white p-3 shadow-sm transition hover:-translate-y-1 hover:border-green-300 hover:shadow-lg sm:p-4">
                <div className="relative aspect-square overflow-hidden rounded-xl bg-slate-100">
                  {category.image && <Image src={category.image} alt={category.name} fill unoptimized sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 220px" className="object-cover transition duration-300 group-hover:scale-105" />}
                  <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/55 to-transparent px-3 pb-3 pt-10 text-center text-sm font-bold text-white">{category.name}</span>
                </div>
                <p className="mt-3 text-center font-semibold text-slate-800 group-hover:text-green-700">{category.name}</p>
                <p className="mt-1 text-center text-xs text-slate-500">Browse products <span aria-hidden="true">→</span></p>
              </Link>
            ))}
          </div>
        ) : (
          <p className="rounded-xl border border-dashed border-slate-300 py-16 text-center text-slate-500">Categories are temporarily unavailable.</p>
        )}
      </section>
    </>
  );
}
