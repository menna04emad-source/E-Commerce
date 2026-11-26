"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { FaFilter, FaGrip, FaList, FaMagnifyingGlass, FaXmark } from "react-icons/fa6";
import type { Brand } from "../../_types/brand";
import type { Category } from "../../_types/category";
import type { Product } from "../../_types/product";
import { WishlistToggle } from "../Wishlist/wishlist-toggle";
import { SearchProductCard } from "./search-product-card";
import { filterProducts, searchFilterCounts, type ProductSort } from "./search.logic";

type SearchResultsProps = {
  products: Product[];
  categories: Category[];
  brands: Brand[];
  initialQuery: string;
};

const pageSize = 12;

export function SearchResults({ products, categories, brands, initialQuery }: SearchResultsProps) {
  const [query, setQuery] = useState(initialQuery);
  const [categoryIds, setCategoryIds] = useState<string[]>([]);
  const [brandIds, setBrandIds] = useState<string[]>([]);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [sort, setSort] = useState<ProductSort>("relevance");
  const [view, setView] = useState<"grid" | "list">("grid");
  const [page, setPage] = useState(1);

  const filteredProducts = useMemo(() => filterProducts(products, {
    query,
    categoryIds,
    brandIds,
    minPrice: minPrice === "" ? null : Number(minPrice),
    maxPrice: maxPrice === "" ? null : Number(maxPrice),
    sort,
  }), [products, query, categoryIds, brandIds, minPrice, maxPrice, sort]);
  const counts = useMemo(() => searchFilterCounts(products, categories, brands), [products, categories, brands]);
  const pageCount = Math.max(1, Math.ceil(filteredProducts.length / pageSize));
  const currentPage = Math.min(page, pageCount);
  const visibleProducts = filteredProducts.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  function toggleValue(values: string[], value: string, setter: (next: string[]) => void) {
    setter(values.includes(value) ? values.filter((item) => item !== value) : [...values, value]);
    setPage(1);
  }

  function clearFilters() {
    setCategoryIds([]);
    setBrandIds([]);
    setMinPrice("");
    setMaxPrice("");
    setPage(1);
  }

  function applyQuickPrice(max: number) {
    setMinPrice("");
    setMaxPrice(String(max));
    setPage(1);
  }

  const activeFilterCount = categoryIds.length + brandIds.length + (minPrice ? 1 : 0) + (maxPrice ? 1 : 0);

  return (
    <main className="flex-1 bg-slate-50">
      <section className="border-b border-slate-100 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8">
          <p className="text-sm text-slate-500"><Link href="/">Home</Link><span className="mx-2">/</span><span className="text-slate-800">Search Results</span></p>
          <form action="/shop" className="relative mt-4 max-w-2xl">
            <FaMagnifyingGlass className="absolute top-1/2 left-4 -translate-y-1/2 text-slate-400" />
            <input name="q" value={query} onChange={(event) => { setQuery(event.target.value); setPage(1); }} placeholder="Search for products..." className="h-12 w-full rounded-xl border border-slate-200 bg-white pl-12 pr-4 text-slate-800 outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-100" />
          </form>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        {activeFilterCount > 0 && (
          <div className="mb-5 flex flex-wrap items-center gap-2 text-sm text-slate-600">
            <span className="inline-flex items-center gap-2"><FaFilter /> Active Filters:</span>
            {categoryIds.map((id) => {
              const category = categories.find((item) => item._id === id);
              return category ? <button key={id} type="button" onClick={() => toggleValue(categoryIds, id, setCategoryIds)} className="inline-flex items-center gap-2 rounded-full bg-green-100 px-3 py-1.5 text-green-800">{category.name}<FaXmark /></button> : null;
            })}
            {brandIds.map((id) => {
              const brand = brands.find((item) => item._id === id);
              return brand ? <button key={id} type="button" onClick={() => toggleValue(brandIds, id, setBrandIds)} className="inline-flex items-center gap-2 rounded-full bg-violet-100 px-3 py-1.5 text-violet-800">{brand.name}<FaXmark /></button> : null;
            })}
            {(minPrice || maxPrice) && <button type="button" onClick={() => { setMinPrice(""); setMaxPrice(""); setPage(1); }} className="rounded-full bg-slate-200 px-3 py-1.5 text-slate-700">{minPrice || "0"}–{maxPrice || "No limit"} EGP <FaXmark className="ml-1 inline" /></button>}
            <button type="button" onClick={clearFilters} className="ml-1 underline underline-offset-2 hover:text-green-700">Clear all</button>
          </div>
        )}

        <p className="mb-4 text-sm text-slate-600">Showing {filteredProducts.length} {filteredProducts.length === 1 ? "product" : "products"}</p>
        <div className="grid items-start gap-5 lg:grid-cols-[256px_minmax(0,1fr)]">
          <aside className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="border-b border-slate-100 pb-5">
              <h2 className="mb-3 font-bold text-slate-900">Categories</h2>
              <div className="max-h-52 space-y-2 overflow-y-auto pr-1">
                {categories.map((category) => (
                  <label key={category._id} className="flex cursor-pointer items-center gap-2 text-sm text-slate-600 hover:text-green-700">
                    <input type="checkbox" checked={categoryIds.includes(category._id)} onChange={() => toggleValue(categoryIds, category._id, setCategoryIds)} className="size-4 accent-green-600" />
                    <span className="min-w-0 flex-1 truncate">{category.name}</span><span className="text-xs text-slate-400">{counts.categories.get(category._id) ?? 0}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="border-b border-slate-100 py-5">
              <h2 className="mb-3 font-bold text-slate-900">Price Range</h2>
              <div className="grid grid-cols-2 gap-2">
                <label className="text-xs text-slate-500">Min (EGP)<input type="number" min="0" value={minPrice} onChange={(event) => { setMinPrice(event.target.value); setPage(1); }} placeholder="0" className="mt-1 h-10 w-full rounded-lg border border-slate-200 px-3 text-sm text-slate-800 outline-none focus:border-green-600" /></label>
                <label className="text-xs text-slate-500">Max (EGP)<input type="number" min="0" value={maxPrice} onChange={(event) => { setMaxPrice(event.target.value); setPage(1); }} placeholder="No limit" className="mt-1 h-10 w-full rounded-lg border border-slate-200 px-3 text-sm text-slate-800 outline-none focus:border-green-600" /></label>
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {[500, 1000, 5000, 10000].map((amount) => <button key={amount} type="button" onClick={() => applyQuickPrice(amount)} className="rounded-full bg-slate-100 px-3 py-1.5 text-xs text-slate-600 hover:bg-green-50 hover:text-green-700">Under {amount >= 1000 ? `${amount / 1000}K` : amount}</button>)}
              </div>
            </div>

            <div className="pt-5">
              <h2 className="mb-3 font-bold text-slate-900">Brands</h2>
              <div className="max-h-52 space-y-2 overflow-y-auto pr-1">
                {brands.map((brand) => (
                  <label key={brand._id} className="flex cursor-pointer items-center gap-2 text-sm text-slate-600 hover:text-green-700">
                    <input type="checkbox" checked={brandIds.includes(brand._id)} onChange={() => toggleValue(brandIds, brand._id, setBrandIds)} className="size-4 accent-green-600" />
                    <span className="min-w-0 flex-1 truncate">{brand.name}</span><span className="text-xs text-slate-400">{counts.brands.get(brand._id) ?? 0}</span>
                  </label>
                ))}
              </div>
            </div>
          </aside>

          <section className="min-w-0">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white p-1">
                <button type="button" aria-label="Grid view" aria-pressed={view === "grid"} onClick={() => setView("grid")} className={`grid size-9 place-items-center rounded-md ${view === "grid" ? "bg-green-600 text-white" : "text-slate-500 hover:bg-slate-100"}`}><FaGrip /></button>
                <button type="button" aria-label="List view" aria-pressed={view === "list"} onClick={() => setView("list")} className={`grid size-9 place-items-center rounded-md ${view === "list" ? "bg-green-600 text-white" : "text-slate-500 hover:bg-slate-100"}`}><FaList /></button>
              </div>
              <label className="flex items-center gap-2 text-sm text-slate-500">Sort by:
                <select value={sort} onChange={(event) => setSort(event.target.value as ProductSort)} className="h-10 rounded-lg border border-slate-200 bg-white px-3 text-slate-700 outline-none focus:border-green-600">
                  <option value="relevance">Relevance</option><option value="price-low">Price: Low to High</option><option value="price-high">Price: High to Low</option><option value="rating">Top Rated</option>
                </select>
              </label>
            </div>

            {visibleProducts.length ? view === "grid" ? (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 2xl:grid-cols-4">{visibleProducts.map((product) => <SearchProductCard key={product._id} product={product} />)}</div>
            ) : (
              <div className="space-y-3">{visibleProducts.map((product) => (
                <article key={product._id} className="flex gap-4 rounded-xl border border-slate-200 bg-white p-3 shadow-sm sm:items-center sm:p-4">
                  <Link href={`/productdetails/${product._id}`} className="relative size-24 shrink-0 overflow-hidden rounded-lg bg-slate-50 sm:size-32"><Image src={product.imageCover} alt={product.title} fill unoptimized sizes="128px" className="object-contain p-2" /></Link>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs text-slate-400">{product.category?.name ?? "Products"}</p>
                    <Link href={`/productdetails/${product._id}`} className="mt-1 line-clamp-2 font-semibold text-slate-800 hover:text-green-700">{product.title}</Link>
                    <p className="mt-2 text-amber-400">★★★★★ <span className="text-xs text-slate-500">{product.ratingsAverage?.toFixed(1) ?? "0.0"}</span></p>
                    <div className="mt-2 flex items-center gap-3"><b className="text-slate-900">{(product.priceAfterDiscount ?? product.price).toLocaleString()} EGP</b><WishlistToggle productId={product._id} /></div>
                  </div>
                </article>
              ))}</div>
            ) : (
              <div className="rounded-xl border border-dashed border-slate-300 bg-white py-16 text-center text-slate-500">No products match these filters.</div>
            )}

            {pageCount > 1 && (
              <nav aria-label="Product results pages" className="mt-7 flex flex-wrap justify-center gap-2">
                <button type="button" disabled={currentPage === 1} onClick={() => setPage((value) => Math.max(1, value - 1))} className="size-10 rounded-lg border border-slate-200 bg-white disabled:opacity-40">‹</button>
                {Array.from({ length: pageCount }, (_, index) => index + 1).map((number) => <button key={number} type="button" aria-current={currentPage === number ? "page" : undefined} onClick={() => setPage(number)} className={`size-10 rounded-lg border ${currentPage === number ? "border-green-600 bg-green-600 text-white" : "border-slate-200 bg-white text-slate-600"}`}>{number}</button>)}
                <button type="button" disabled={currentPage === pageCount} onClick={() => setPage((value) => Math.min(pageCount, value + 1))} className="size-10 rounded-lg border border-slate-200 bg-white disabled:opacity-40">›</button>
              </nav>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}
