import { Suspense } from "react";
import { getWishlist } from "../_components/Wishlist/wishlist.api";
import { WishlistPage } from "../_components/Wishlist/wishlist-page";

async function WishlistContent() {
  const products = await getWishlist();
  return <WishlistPage products={products} />;
}

export default function WishlistRoute() {
  return (
    <Suspense fallback={<p className="p-8 text-center">Loading wishlist...</p>}>
      <WishlistContent />
    </Suspense>
  );
}