import Link from "next/link";
import { FaArrowRight } from "react-icons/fa6";
const deals = [
  {
    label: "🔥 Deal of the Day",
    title: "Fresh Organic Fruits",
    detail: "Get up to 40% off on selected organic fruits",
    discount: "40% OFF",
    code: "ORGANIC40",
    action: "Shop Now",
    color: "from-emerald-500 to-emerald-800",
  },
  {
    label: "✨ New Arrivals",
    title: "Exotic Vegetables",
    detail: "Discover our latest collection of premium vegetables",
    discount: "25% OFF",
    code: "FRESH25",
    action: "Explore Now",
    color: "from-orange-500 to-rose-500",
  },
];

export function Deals() {
  return (
    <section className="grid gap-4 md:grid-cols-2">
      {deals.map((deal) => (
        <article
          key={deal.code}
          className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${deal.color} p-6 text-white sm:p-8`}
        >
          <span className="rounded-full bg-white/20 px-3 py-1 text-xs">
            {deal.label}
          </span>
          <h2 className="mt-4 text-2xl font-extrabold">{deal.title}</h2>
          <p className="mt-2 text-sm text-white/85">{deal.detail}</p>
          <div className="my-4 flex flex-wrap items-center gap-4">
            <b className="text-3xl">{deal.discount}</b>
            <span className="text-xs">
              Use code: <strong>{deal.code}</strong>
            </span>
          </div>
          <Link
            href="/shop"
            className="inline-flex items-center gap-3 rounded-full bg-white px-5 py-3 font-bold text-slate-800"
          >
            {deal.action}
            <FaArrowRight />
          </Link>
        </article>
      ))}
    </section>
  );
}
