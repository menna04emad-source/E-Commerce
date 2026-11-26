import type { Metadata } from "next";
import { Suspense } from "react";
import { getAllProducts } from "../_components/Home/home-data.logic";
import { getBrands } from "../_components/Brands/brands.api";
import { getCategories } from "../_components/Categories/categories.api";
import { SearchResults } from "../_components/Search/search-results";
import { SuspenseFallback } from "../_components/suspense-fallback";

export const metadata: Metadata = {
  title: "Search Products | FreshCart",
  description: "Search and filter FreshCart products by category, brand, and price.",
};

async function ShopContent({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const [{ q }, products, categories, brands] = await Promise.all([
    searchParams,
    getAllProducts(),
    getCategories(),
    getBrands(),
  ]);
  return <SearchResults products={products} categories={categories} brands={brands} initialQuery={q ?? ""} />;
}

export default function ShopPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  return <Suspense fallback={<SuspenseFallback message="Loading products..." />}><ShopContent searchParams={searchParams} /></Suspense>;
}
