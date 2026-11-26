import Link from "next/link";
import { FaArrowRight } from "react-icons/fa6";
import { Benefits } from "../Benefits/benefits";
import { Categories } from "../Categories/categories";
import { Deals } from "../Deals/deals";
import { Hero } from "../Hero/hero";
import { getCategories, getProducts } from "./home-data.logic";
import { getFeaturedProducts } from "./home.logic";
import { Newsletter } from "../Newsletter/newsletter";
import { ProductGrid } from "../Product/product-grid";
import { SuspenseFallback } from "../suspense-fallback";

export async function HomePage() {
  const [products, categories] = await Promise.all([
    getProducts(),
    getCategories(),
  ]);
  const featured = getFeaturedProducts(products);
  return (
    <>
      <Hero />
      <Benefits />
      <main className="mx-auto flex max-w-7xl flex-col gap-16 px-4 py-12 sm:gap-20 sm:py-16">
        <Categories categories={categories} />
        <Deals />
        <section>
          <div className="mb-7 flex items-center justify-between">
            <h2 className="flex items-center gap-3 text-2xl font-extrabold text-slate-800">
              <span className="h-8 w-1 rounded bg-green-600" />
              Featured <em className="not-italic text-green-600">Products</em>
            </h2>
            <Link
              href="/shop"
              className="flex items-center gap-2 text-sm font-semibold text-green-600"
            >
              Browse all <FaArrowRight />
            </Link>
          </div>
            <ProductGrid products={featured} />
        </section>
        <Newsletter />
      </main>
    </>
  );
}
