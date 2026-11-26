"use client";

import Link from "next/link";
import { useState } from "react";
import { FaArrowRight, FaBars, FaCartShopping, FaXmark } from "react-icons/fa6";

const links = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/shop" },
  { label: "Categories", href: "/categories" },
  { label: "Brands", href: "/brands" },
  { label: "Wishlist", href: "/wishlist" },
  { label: "Shopping Cart", href: "/cart" },
];

export function MobileNavigation() {
  const [open, setOpen] = useState(false);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        aria-label={open ? "Close navigation menu" : "Open navigation menu"}
        aria-expanded={open}
        aria-controls="freshcart-mobile-navigation"
        onClick={() => setOpen((value) => !value)}
        className="grid size-10 shrink-0 place-items-center rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-50"
      >
        {open ? <FaXmark /> : <FaBars />}
      </button>

      {open && (
        <div className="fixed inset-0 z-50 bg-slate-950/40" onClick={() => setOpen(false)}>
          <aside
            id="freshcart-mobile-navigation"
            aria-label="Mobile navigation"
            className="h-full w-[min(86vw,360px)] bg-white p-5 shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-slate-100 pb-5">
              <Link href="/" onClick={() => setOpen(false)} className="flex items-center gap-2 text-xl font-extrabold text-slate-800">
                <FaCartShopping className="text-green-600" />FreshCart
              </Link>
              <button type="button" aria-label="Close menu" onClick={() => setOpen(false)} className="grid size-9 place-items-center rounded-full bg-slate-100 text-slate-600"><FaXmark /></button>
            </div>
            <nav className="py-4">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-between border-b border-slate-100 py-4 text-sm font-medium text-slate-700 hover:text-green-600"
                >
                  {link.label}<FaArrowRight className="text-xs text-slate-400" />
                </Link>
              ))}
            </nav>
            <div className="mt-2 grid grid-cols-2 gap-3">
              <Link href="/login" onClick={() => setOpen(false)} className="rounded-lg border border-green-600 py-3 text-center text-sm font-semibold text-green-700">Sign In</Link>
              <Link href="/sign" onClick={() => setOpen(false)} className="rounded-lg bg-green-600 py-3 text-center text-sm font-semibold text-white">Sign Up</Link>
            </div>
          </aside>
        </div>
      )}
    </div>
  );
}
