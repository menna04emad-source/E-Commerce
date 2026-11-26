import Image from "next/image";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa6";
import type { Category } from "../../_types/category";
import { getCategoryEmoji, getCategoryTiles } from "./categories.logic";
import { Suspense } from "react";
import { TailSpin } from "react-loader-spinner";

export function Categories({ categories }: { categories: Category[] }) {
  return (
    <Suspense
      fallback={
        <TailSpin
          height={56}
          width={56}
          color="#16a34a"
          ariaLabel="Loading categories"
        />
      }
    >
      <section>
        <div className="mb-7 flex items-center justify-between">
          <h2 className="flex items-center gap-3 text-2xl font-extrabold text-slate-800">
            <span className="h-8 w-1 rounded bg-green-600" />
            Shop By <em className="not-italic text-green-600">Category</em>
          </h2>
          <Link
            className="flex items-center gap-2 text-sm font-semibold text-green-600"
            href="/categories"
          >
            View All Categories <FaArrowRight />
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6">
          {getCategoryTiles(categories).map((category, index) => (
            <Link
              key={category._id}
              href={category._id.startsWith("fallback-") ? "/categories" : `/categories/${category._id}`}
              className="flex h-32 flex-col items-center justify-center gap-3 rounded-xl border border-slate-100 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              <div className="relative grid size-16 place-items-center overflow-hidden rounded-full bg-green-50 text-3xl">
                {category.image ? (
                  <Image
                    src={category.image}
                    alt=""
                    width={128}
                    height={128}
                    unoptimized
                    className="h-full w-full object-cover"
                  />
                ) : (
                  getCategoryEmoji(index)
                )}
              </div>
              <span className="px-2 text-center text-sm font-medium text-slate-700">
                {category.name}
              </span>
            </Link>
          ))}
        </div>
      </section>
      
    </Suspense>
  );
}
