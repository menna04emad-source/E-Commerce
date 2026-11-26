import Link from "next/link";
import {
  FaCartShopping,
  FaHeadset,
  FaHeart,
  FaMagnifyingGlass,
  FaEnvelope,
  FaPhone,
  FaTruckFast,
  FaGift,
  FaUser,
  FaChevronDown,
} from "react-icons/fa6";
import { MobileNavigation } from "./mobile-navigation";
import { getCategories } from "../Categories/categories.api";
import { CartCount } from "../Cart/cart-count";
import { WishlistCount } from "../Wishlist/wishlist-count";

const navbarLinks = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/shop" },
  { label: "Categories", href: "/categories", dropdown: true },
  { label: "Brands", href: "/brands" },
];

export async function Navbar() {
  const categories = await getCategories();
  return (
    <header className="sticky top-0 z-40 border-b border-slate-100 bg-white shadow-sm">
      <div className="border-b border-slate-100 text-[11px] text-slate-500 sm:text-xs">
        <div className="mx-auto flex h-9 max-w-7xl items-center gap-4 px-3 sm:px-5 lg:px-6">
          <span className="flex items-center gap-2 whitespace-nowrap"><FaTruckFast className="text-green-600"/>Free Shipping on Orders 500 EGP</span>
          <span className="hidden items-center gap-2 whitespace-nowrap sm:flex"><FaGift className="text-green-600"/>New Arrivals Daily</span>
          <div className="ml-auto hidden items-center gap-5 lg:flex">
            <span className="flex items-center gap-2"><FaPhone/>+1 (800) 123-4567</span>
            <span className="flex items-center gap-2"><FaEnvelope/>support@freshcart.com</span>
            <Link href="/login" className="flex items-center gap-2 hover:text-green-600"><FaUser/>Sign In</Link>
            <Link href="/sign" className="flex items-center gap-2 hover:text-green-600"><FaUser/>Sign Up</Link>
          </div>
        </div>
      </div>
      <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-3 px-3 py-3 sm:px-5 lg:flex-nowrap lg:px-6">
        <MobileNavigation />
        <Link
          href="/"
          className="flex shrink-0 items-center gap-2 text-xl font-extrabold tracking-tight text-slate-800 sm:text-2xl"
        >
          <FaCartShopping className="text-green-600" />
          FreshCart
        </Link>
        <form
          action="/shop"
          className="order-last flex h-10 w-full items-center rounded-full border border-slate-200 bg-slate-50 pl-4 sm:order-none sm:ml-auto sm:max-w-sm lg:ml-3 lg:max-w-md"
        >
          <input
            name="q"
            placeholder="Search for products, brands and more..."
            className="min-w-0 flex-1 bg-transparent text-sm outline-none"
          />
          <button
            aria-label="Search"
            className="m-1 grid size-9 place-items-center rounded-full bg-green-600 text-white"
          >
            <FaMagnifyingGlass />
          </button>
        </form>
        <nav className="hidden items-center gap-5 text-sm font-medium text-slate-700 lg:ml-auto lg:flex xl:gap-6">
          {navbarLinks.map((link) => link.dropdown ? (
            <details key={link.href} className="group relative">
              <summary className="flex cursor-pointer list-none items-center gap-1 py-2 hover:text-green-600 [&::-webkit-details-marker]:hidden">
                {link.label}<FaChevronDown className="text-[10px] transition-transform group-open:rotate-180" />
              </summary>
              <div className="absolute top-full left-1/2 z-50 mt-1 w-56 -translate-x-1/2 rounded-xl border border-slate-100 bg-white p-2 shadow-xl">
                <Link href="/categories" className="block rounded-lg px-3 py-2.5 text-sm text-slate-700 hover:bg-green-50 hover:text-green-700">All Categories</Link>
                {categories.slice(0, 5).map((category) => (
                  <Link key={category._id} href={`/categories/${category._id}`} className="block rounded-lg px-3 py-2.5 text-sm text-slate-600 hover:bg-green-50 hover:text-green-700">{category.name}</Link>
                ))}
              </div>
            </details>
          ) : (
            <Link key={link.href} href={link.href} className="flex items-center gap-1 hover:text-green-600">{link.label}</Link>
          ))}
        </nav>
        <div className="ml-auto flex items-center gap-3 text-slate-500 sm:gap-4 lg:ml-0 lg:border-l lg:pl-4">
          <div className="hidden items-center gap-2 text-[10px] xl:flex">
            <span className="grid size-9 place-items-center rounded-full bg-green-50 text-green-600">
              <FaHeadset />
            </span>
            <span>
              Support
              <br />
              <b>24/7 Help</b>
            </span>
          </div>
          <Link href="/wishlist" aria-label="Wishlist">
            <span className="relative"><FaHeart/><WishlistCount /></span>
          </Link>
          <Link href="/cart" aria-label="Cart">
            <span className="relative"><FaCartShopping /><CartCount /></span>
          </Link>
          <Link href="/login" className="hidden h-10 items-center gap-2 rounded-full bg-green-600 px-5 text-xs font-semibold text-white hover:bg-green-700 sm:flex">
            <FaUser/>Sign In
          </Link>
        </div>
      </div>
    </header>
  );
}
