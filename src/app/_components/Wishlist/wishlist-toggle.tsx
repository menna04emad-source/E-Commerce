"use client";

import { useState, useTransition } from "react";
import { FaHeart } from "react-icons/fa6";
import Swal from "sweetalert2";
import { toggleProductInWishlist } from "./wishlist.actions";

export function WishlistToggle({ productId, initialSaved = false }: { productId: string; initialSaved?: boolean }) {
  const [saved, setSaved] = useState(initialSaved);
  const [pending, startTransition] = useTransition();

  function toggleWishlist() {
    startTransition(async () => {
      const result = await toggleProductInWishlist(productId);
      if (result.success && typeof result.saved === "boolean") {
        setSaved(result.saved);
        window.dispatchEvent(new Event("freshcart:wishlist-updated"));
      }
      await Swal.fire({
        icon: result.success ? "success" : "error",
        title: result.success ? (result.saved ? "Added to wishlist" : "Removed from wishlist") : "Wishlist update failed",
        text: result.message,
        confirmButtonColor: "#16a34a",
      });
    });
  }

  return (
    <button
      type="button"
      aria-label={saved ? "Remove from wishlist" : "Add to wishlist"}
      aria-pressed={saved}
      disabled={pending}
      onClick={toggleWishlist}
      className={`grid size-8 place-items-center rounded-full border border-slate-100 bg-white shadow-sm transition hover:text-rose-500 disabled:opacity-50 ${saved ? "text-rose-500" : "text-slate-500"}`}
    >
      <FaHeart />
    </button>
  );
}
