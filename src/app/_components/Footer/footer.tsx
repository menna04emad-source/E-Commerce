import Link from "next/link";
import {
  FaCartShopping,
  FaHeadset,
  FaRotateLeft,
  FaShieldHalved,
  FaTruckFast,
} from "react-icons/fa6";
const footerColumns = [
  {
    title: "Shop",
    links: [
      "All Products",
      "Categories",
      "Brands",
      "Electronics",
      "Men's Fashion",
      "Women's Fashion",
    ],
  },
  {
    title: "Account",
    links: [
      "My Account",
      "Order History",
      "Wishlist",
      "Shopping Cart",
      "Sign In",
      "Create Account",
    ],
  },
  {
    title: "Support",
    links: [
      "Contact Us",
      "Help Center",
      "Shipping Info",
      "Returns & Refunds",
      "Track Order",
    ],
  },
  {
    title: "Legal",
    links: ["Privacy Policy", "Terms of Service", "Cookie Policy"],
  },
];

export function Footer() {
  return (
    <>
      <section className="bg-green-50">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-5 px-4 py-5 md:grid-cols-4">
          {[
            {
              icon: FaTruckFast,
              title: "Free Shipping",
              sub: "On orders over 500 EGP",
            },
            {
              icon: FaRotateLeft,
              title: "Easy Returns",
              sub: "14-day return policy",
            },
            {
              icon: FaShieldHalved,
              title: "Secure Payment",
              sub: "100% secure checkout",
            },
            {
              icon: FaHeadset,
              title: "24/7 Support",
              sub: "Contact us anytime",
            },
          ].map(({ icon: Icon, title, sub }) => (
            <div key={title} className="flex items-center gap-3">
              <Icon className="rounded-xl bg-green-100 p-3 text-4xl text-green-600" />
              <span className="text-xs">
                <b className="block">{title}</b>
                <small className="text-slate-500">{sub}</small>
              </span>
            </div>
          ))}
        </div>
      </section>
      <footer className="bg-slate-950 text-slate-300">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:grid-cols-2 lg:grid-cols-[2fr_repeat(4,1fr)]">
          <div>
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-lg bg-white px-3 py-2 text-xl font-extrabold text-slate-800"
            >
              <FaCartShopping className="text-green-600" />
              FreshCart
            </Link>
            <p className="mt-5 max-w-sm text-sm leading-6 text-slate-400">
              Your one-stop destination for quality products, the best brands
              and a seamless shopping experience.
            </p>
            <p className="mt-4 text-sm text-slate-400">
              ☎ +1 (800) 123-4567
              <br />✉ support@freshcart.com
              <br />⌖ 123 Commerce Street, New York
            </p>
          </div>
          {footerColumns.map((col) => (
            <div key={col.title}>
              <h3 className="mb-4 font-semibold text-white">{col.title}</h3>
              {col.links.map((link) => (
                <Link
                  key={link}
                  href={
                    link === "My Account"
                      ? "/account-settings"
                      : link === "Order History"
                        ? "/orders"
                      : link === "Wishlist"
                        ? "/wishlist"
                        : link === "Shopping Cart"
                          ? "/cart"
                          : link === "Sign In"
                            ? "/login"
                            : link === "Create Account"
                              ? "/sign"
                              : link.includes("Category")
                      ? "/categories"
                      : link.includes("Brand")
                        ? "/brands"
                        : "/shop"
                  }
                  className="mb-3 block text-sm text-slate-400 hover:text-green-400"
                >
                  {link}
                </Link>
              ))}
            </div>
          ))}
        </div>
        <div className="border-t border-slate-800">
          <div className="mx-auto flex max-w-7xl justify-between px-4 py-5 text-xs text-slate-500">
            <span>© 2026 FreshCart. All rights reserved.</span>
            <span>▰ Visa　 ▰ Mastercard　 ▰ PayPal</span>
          </div>
        </div>
      </footer>
    </>
  );
}
