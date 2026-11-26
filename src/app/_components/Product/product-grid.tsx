import type { Product } from "../../_types/product";
import { getVisibleProducts } from "./product-grid.logic";
import { ProductCard } from "./product-card";

export function ProductGrid({ products, limit }: { products: Product[]; limit?: number }) {
  const visible = getVisibleProducts(products, limit);
  if (!visible.length) return <div className="rounded-xl border border-dashed border-slate-300 py-16 text-center text-slate-500">Products are temporarily unavailable. Please try again soon.</div>;
  return <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4 xl:grid-cols-5">{visible.map(product=><ProductCard key={product._id} product={product}/>)}</div>;
}
