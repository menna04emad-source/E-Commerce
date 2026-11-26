import Image from "next/image";
import Link from "next/link";
import { FaTag } from "react-icons/fa6";
import type { Brand } from "../../_types/brand";

export function Brands({ brands }: { brands: Brand[] }) {
  return (
    <>
      <section className="bg-gradient-to-r from-violet-600 via-purple-500 to-purple-400 text-white">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-14 lg:px-8">
          <p className="text-sm text-white/75"><Link href="/">Home</Link><span className="mx-2">/</span>Brands</p>
          <div className="mt-5 flex items-center gap-4">
            <span className="grid size-14 place-items-center rounded-2xl bg-white/20 text-2xl shadow-lg"><FaTag /></span>
            <div>
              <h1 className="text-3xl font-extrabold sm:text-4xl">Top Brands</h1>
              <p className="mt-1 text-white/85">Shop from your favorite brands</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto min-h-[50vh] max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
        {brands.length ? (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            {brands.map((brand) => (
              <Link key={brand._id} href={`/brands/${brand._id}`} className="group flex min-h-56 flex-col items-center justify-center gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:border-purple-200 hover:shadow-lg sm:min-h-64">
                <span className="grid h-36 w-full place-items-center overflow-hidden rounded-xl bg-slate-50 p-4">
                  {brand.image ? (
                    <Image src={brand.image} alt={`${brand.name} logo`} width={240} height={120} unoptimized className="h-full w-full object-contain mix-blend-multiply transition group-hover:scale-105" />
                  ) : (
                    <span className="text-center text-2xl font-bold text-slate-700">{brand.name}</span>
                  )}
                </span>
                <span className="text-center text-sm font-semibold text-slate-800">{brand.name}</span>
              </Link>
            ))}
          </div>
        ) : (
          <p className="rounded-xl border border-dashed border-slate-300 py-16 text-center text-slate-500">Brands are temporarily unavailable.</p>
        )}
      </section>
    </>
  );
}
