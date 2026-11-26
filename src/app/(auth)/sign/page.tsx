import { Button } from "@/components/ui/button";
import Link from "next/link";
import SignupForm from "../../_components/MyForm/signup-form";
export default function SignUpPage() {
  return (
    <main className="min-h-screen bg-white text-slate-700">
      <div className="mx-auto grid min-h-screen max-w-6xl items-start gap-10 px-4 py-10 sm:px-6 sm:py-14 lg:grid-cols-[1fr_1fr] lg:items-center lg:gap-12 lg:px-8">
        {/* Welcome section */}
        <section className="mx-auto w-full max-w-xl lg:mx-0">
          <h1 className="text-3xl font-bold tracking-tight text-slate-700 sm:text-4xl">
            Welcome to <span className="text-green-600">FreshCart</span>
          </h1>

          <p className="mt-2 max-w-xl text-lg leading-7 text-slate-700">
            Join thousands of happy customers who enjoy fresh groceries
            delivered right to their doorstep.
          </p>

          <div className="mt-8 space-y-6">
            <div className="flex items-center gap-4">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-green-100 text-xl font-bold text-green-600">
                ★
              </span>
              <div>
                <h2 className="font-semibold text-slate-700">
                  Premium Quality
                </h2>
                <p className="mt-0.5 text-sm leading-5 text-slate-600 sm:text-base">
                  Premium quality products sourced from trusted suppliers.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-green-100 text-xl text-green-600">
                🚚
              </span>
              <div>
                <h2 className="font-semibold text-slate-700">Fast Delivery</h2>
                <p className="mt-0.5 text-sm leading-5 text-slate-600 sm:text-base">
                  Same-day delivery available in most areas
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-green-100 text-xl font-bold text-green-600">
                ⬟
              </span>
              <div>
                <h2 className="font-semibold text-slate-700">
                  Secure Shopping
                </h2>
                <p className="mt-0.5 text-sm leading-5 text-slate-600 sm:text-base">
                  Your data and payments are completely secure
                </p>
              </div>
            </div>
          </div>

          {/* Testimonial */}
          <div className="mt-8 rounded-lg border border-slate-200 p-4 shadow-sm sm:p-5">
            <div className="flex items-center gap-3">
              <div className="grid h-12 w-12 place-items-center rounded-full bg-green-100 text-2xl">
                👩🏻
              </div>
              <div>
                <p className="font-medium text-slate-700">Sarah Johnson</p>
                <p className="tracking-wider text-amber-400">★★★★★</p>
              </div>
            </div>

            <blockquote className="mt-3 text-sm italic leading-6 text-slate-600 sm:text-base">
              “FreshCart has transformed my shopping experience. The quality of
              the products is outstanding, and the delivery is always on time.
              Highly recommend!”
            </blockquote>
          </div>
        </section>

        {/* Signup form card */}
        <section className="mx-auto w-full max-w-xl rounded-xl bg-white p-5 shadow-lg shadow-slate-900/10 sm:p-8">
          <header className="text-center">
            <h2 className="text-2xl font-semibold text-slate-700 sm:text-3xl">
              Create Your Account
            </h2>
            <p className="mt-2 text-sm text-slate-600 sm:text-base">
              Start your fresh journey with us today
            </p>
          </header>

          {/* Social buttons */}
          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            <Button
              type="button"
              variant="outline"
              className="border-slate-300 text-slate-800"
            >
              <span className="mr-2 font-bold text-red-500">G</span>
              Google
            </Button>

            <Button
              type="button"
              variant="outline"
              className="border-slate-300 text-slate-800"
            >
              <span className="mr-2 grid h-4 w-4 place-items-center rounded-full bg-blue-600 text-xs font-bold text-white">
                f
              </span>
              Facebook
            </Button>
          </div>

          {/* Divider */}
          <div className="my-6 flex items-center gap-4 text-sm text-slate-600">
            <span className="h-px flex-1 bg-slate-200" />
            <span>or</span>
            <span className="h-px flex-1 bg-slate-200" />
          </div>

          <SignupForm />

          <div className="mt-5 border-t border-slate-200 pt-5 text-center text-sm">
            <span className="text-slate-700">Already have an account? </span>
            <Link href="/login" className="font-medium text-green-600 hover:underline">
              Sign In
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
