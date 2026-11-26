import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { FaFacebookF, FaGoogle, FaShieldHalved, FaTruckFast, FaHeadset } from "react-icons/fa6";
import { LoginForm } from "../../_components/Login/login-form";

export const metadata: Metadata = {
  title: "Sign In | FreshCart",
  description: "Sign in to your FreshCart account to continue shopping.",
};

export default function LoginPage() {
  return (
    <main className="flex-1 bg-white px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
      <div className="mx-auto grid max-w-6xl items-center gap-8 lg:grid-cols-2 lg:gap-12">
        <section className="mx-auto w-full max-w-xl text-center lg:mx-0">
          <div className="relative mx-auto h-56 w-full overflow-hidden rounded-2xl bg-green-50 shadow-lg sm:h-80 lg:h-[390px]">
            <Image
              src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1400&q=85"
              alt="Fresh produce ready for your shopping basket"
              width={1400}
              height={1000}
              unoptimized
              priority
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/45 via-transparent to-transparent" />
            <span className="absolute bottom-4 left-4 rounded-full bg-white/90 px-4 py-2 text-xs font-semibold text-green-700 shadow-sm">Fresh picks, delivered daily</span>
          </div>
          <h1 className="mt-6 text-2xl font-extrabold leading-tight text-slate-800 sm:text-3xl">
            FreshCart - Your One-Stop Shop for Fresh Products
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-slate-600 sm:text-base">
            Join thousands of happy customers who trust FreshCart for their daily grocery needs.
          </p>
          <div className="mt-5 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-xs text-slate-500">
            <span className="flex items-center gap-2"><FaTruckFast className="text-green-600"/>Free Delivery</span>
            <span className="flex items-center gap-2"><FaShieldHalved className="text-green-600"/>Secure Payment</span>
            <span className="flex items-center gap-2"><FaHeadset className="text-green-600"/>24/7 Support</span>
          </div>
        </section>

        <section className="mx-auto w-full max-w-xl rounded-2xl border border-slate-100 bg-white p-5 shadow-xl shadow-slate-900/10 sm:p-8 lg:p-10">
          <div className="text-center">
            <Link href="/" className="text-3xl font-extrabold tracking-tight"><span className="text-green-600">Fresh</span><span className="text-slate-800">Cart</span></Link>
            <h2 className="mt-4 text-2xl font-bold text-slate-800">Welcome Back!</h2>
            <p className="mt-2 text-sm text-slate-600">Sign in to continue your fresh shopping experience</p>
          </div>

          <div className="mt-7 grid gap-3 sm:grid-cols-2">
            <button type="button" className="flex h-11 items-center justify-center gap-3 rounded-xl border border-slate-200 text-sm font-medium text-slate-700 hover:bg-slate-50"><FaGoogle className="text-red-500"/>Continue with Google</button>
            <button type="button" className="flex h-11 items-center justify-center gap-3 rounded-xl border border-slate-200 text-sm font-medium text-slate-700 hover:bg-slate-50"><FaFacebookF className="text-blue-600"/>Continue with Facebook</button>
          </div>

          <div className="my-6 flex items-center gap-4 text-xs font-medium text-slate-500">
            <span className="h-px flex-1 bg-slate-200"/><span>OR CONTINUE WITH EMAIL</span><span className="h-px flex-1 bg-slate-200"/>
          </div>

          <LoginForm />

          <div className="mt-7 border-t border-slate-100 pt-5 text-center text-sm text-slate-600">
            New to FreshCart? <Link href="/sign" className="ml-1 font-semibold text-green-600 hover:text-green-700">Create an account</Link>
          </div>
          <div className="mt-5 flex flex-wrap justify-center gap-5 text-[10px] text-slate-400">
            <span>🔒 SSL Secured</span><span>♟ 50K+ Users</span><span>★ 4.9 Rating</span>
          </div>
        </section>
      </div>
    </main>
  );
}
