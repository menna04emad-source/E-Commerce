import Image from "next/image";
import { getProductById } from "./product.api";
import { AddToCartButton } from "../../_components/Cart/add-to-cart-button";
import { WishlistToggle } from "../../_components/Wishlist/wishlist-toggle";

type ProductPageProps = {
  params: Promise<{ id: string }>;
};

export default async function ProductPage(props: ProductPageProps) {
  const params = await props.params;
  const product = await getProductById(params.id);
  const inStock = (product.ratingsQuantity ?? 0) > 0;

  return (
    <main className="min-h-screen bg-white text-slate-800">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        {/* Breadcrumb */}
        <nav
          aria-label="Breadcrumb"
          className="mb-6 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-slate-500 sm:mb-8"
        >
          <span>Home</span>
          <span aria-hidden="true">›</span>
          <span>{product.category?.name ?? "Products"}</span>
          <span aria-hidden="true">›</span>
          <span className="text-slate-900">{product.title}</span>
        </nav>

        {/* Product summary */}
        <section className="grid items-start gap-5 lg:grid-cols-[minmax(280px,0.8fr)_1.8fr] lg:gap-6">
          {/* Image-free product panel */}
          <div className="flex min-h-64 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 p-8 text-center sm:min-h-80 lg:min-h-[470px]">
            <div>
              <div className="mx-auto mb-4 grid h-full w-full place-items-center rounded-full bg-transparent text-3xl text-green-600 shadow-sm">
                  <Image
                         src={product.imageCover}
                         alt={product.title}
                         width={500}
                         height={500}
                         unoptimized
                         className="h-full w-full object-contain"
                       />
              </div>
              <p className="text-sm text-slate-500">{product.title}</p>
            </div>
          </div>

          {/* Product details */}
          <div className="rounded-xl border border-slate-200 p-5 shadow-sm sm:p-7">
            <div className="mb-3 flex flex-wrap gap-2 text-xs">
              <span className="rounded-full bg-green-50 px-3 py-1.5 text-green-700">
                {product.category?.name ?? "Products"}
              </span>

              {product.brand?.name && (
                <span className="rounded-full bg-slate-100 px-3 py-1.5 text-slate-700">
                  {product.brand.name}
                </span>
              )}
            </div>

            <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              {product.title}
            </h1>

            <div className="mt-2 flex flex-wrap items-center gap-2 text-sm">
              <span className="tracking-wider text-amber-400" aria-label="Rating">
                ★★★★☆
              </span>
              <span className="text-slate-600">
                {product.ratingsAverage ?? "—"} ({product.ratingsQuantity ?? 0} reviews)
              </span>
            </div>

            <p className="mt-4 text-3xl font-bold text-slate-900">
              {product.price} EGP
            </p>

            <span
              className={`mt-5 inline-flex items-center rounded-full px-3 py-1.5 text-sm ${
                inStock
                  ? "bg-green-50 text-green-700"
                  : "bg-red-50 text-red-700"
              }`}
            >
              <span className="mr-2 text-xs">●</span>
              {inStock ? "In Stock" : "Out of Stock"}
            </span>

            <hr className="my-5 border-slate-200" />

            <p className="text-sm leading-7 text-slate-600 sm:text-base">
              {product.description}
            </p>

            {/* Static quantity */}
            <div className="mt-6">
              <p className="mb-2 text-sm font-medium text-slate-700">Quantity</p>
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex h-12 w-fit items-center gap-7 rounded-lg border border-slate-300 px-4">
                  <span className="text-slate-400">−</span>
                  <span className="text-slate-800">1</span>
                  <span className="text-slate-600">+</span>
                </div>
                <span className="text-sm text-slate-500">
                  {product.ratingsQuantity ?? "—"} available
                </span>
              </div>
            </div>

            {/* Static total for quantity 1 */}
            <div className="mt-5 flex items-center justify-between gap-3 rounded-lg bg-slate-50 px-4 py-4">
              <span className="text-sm text-slate-600 sm:text-base">Total Price:</span>
              <strong className="text-lg text-green-600 sm:text-xl">
                {Number(product.price).toFixed(2)} EGP
              </strong>
            </div>

            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <AddToCartButton productId={product._id} compact />
              <button
                type="button"
                className="rounded-xl bg-slate-900 px-4 py-3.5 font-medium text-white transition hover:bg-slate-800 sm:py-4"
              >
                Buy Now
              </button>
            </div>

            <div className="mt-3 flex justify-center rounded-lg border border-slate-300 py-2.5">
              <WishlistToggle productId={product._id} />
              <span className="ml-2 self-center text-sm text-slate-700">Add to Wishlist</span>
            </div>

            {/* Service highlights */}
            <div className="mt-5 grid gap-4 border-t border-slate-200 pt-5 sm:grid-cols-3">
              {[
                ["🚚", "Free Delivery", "Orders over $50"],
                ["↺", "30 Days Return", "Money back"],
                ["🛡", "Secure Payment", "100% Protected"],
              ].map(([icon, title, subtitle]) => (
                <div key={title} className="flex items-center gap-3">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-green-50 text-green-600">
                    {icon}
                  </span>
                  <div>
                    <p className="text-sm font-medium text-slate-800">{title}</p>
                    <p className="text-xs text-slate-500">{subtitle}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Product information */}
        <section className="mt-8 rounded-xl border border-slate-200 p-5 shadow-sm sm:mt-10 sm:p-6">
          <div className="border-b border-slate-200 pb-4">
            <h2 className="font-semibold text-slate-900">About this Product</h2>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              {product.description}
            </p>
          </div>

          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <div className="rounded-lg bg-slate-50 p-4">
              <h3 className="mb-3 font-medium text-slate-900">Product Information</h3>

              <dl className="space-y-2 text-sm">
                <div className="flex justify-between gap-4">
                  <dt className="text-slate-500">Category</dt>
                  <dd className="text-right text-slate-800">
                    {product.category?.name ?? "—"}
                  </dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-slate-500">Brand</dt>
                  <dd className="text-right text-slate-800">
                    {product.brand?.name ?? "—"}
                  </dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-slate-500">Price</dt>
                  <dd className="text-right text-slate-800">{product.price} EGP</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-slate-500">Available quantity</dt>
                  <dd className="text-right text-slate-800">
                    {product.ratingsQuantity ?? "—"}
                  </dd>
                </div>
              </dl>
            </div>

            <div className="rounded-lg bg-slate-50 p-4">
              <h3 className="mb-3 font-medium text-slate-900">Key Features</h3>
              <ul className="space-y-2 text-sm text-slate-600">
                <li><span className="mr-2 text-green-600">✓</span>Quality product</li>
                <li><span className="mr-2 text-green-600">✓</span>Authentic product information</li>
                <li><span className="mr-2 text-green-600">✓</span>Secure packaging</li>
                <li><span className="mr-2 text-green-600">✓</span>Secure checkout</li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
