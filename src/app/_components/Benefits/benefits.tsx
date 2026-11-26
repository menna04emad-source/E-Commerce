import {
  FaHeadset,
  FaRotateLeft,
  FaShieldHalved,
  FaTruckFast,
} from "react-icons/fa6";

const benefits = [
  {
    icon: FaTruckFast,
    title: "Free Shipping",
    detail: "On orders over 500 EGP",
    color: "text-blue-500 bg-blue-50",
  },
  {
    icon: FaShieldHalved,
    title: "Secure Payment",
    detail: "100% secure transactions",
    color: "text-emerald-500 bg-emerald-50",
  },
  {
    icon: FaRotateLeft,
    title: "Easy Returns",
    detail: "14-day return policy",
    color: "text-orange-500 bg-orange-50",
  },
  {
    icon: FaHeadset,
    title: "24/7 Support",
    detail: "Dedicated support team",
    color: "text-purple-500 bg-purple-50",
  },
];

export function Benefits() {
  return (
    <section className="bg-slate-50 px-4 py-6">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {benefits.map(({ icon: Icon, title, detail, color }) => (
          <div
            key={title}
            className="flex items-center gap-3 rounded-xl border border-slate-100 bg-white p-4 shadow-sm"
          >
            <span
              className={`grid size-11 shrink-0 place-items-center rounded-full ${color}`}
            >
              <Icon />
            </span>
            <span>
              <b className="block text-sm text-slate-800">{title}</b>
              <small className="text-xs text-slate-500">{detail}</small>
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
