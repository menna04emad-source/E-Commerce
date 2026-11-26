"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { FaPlus } from "react-icons/fa6";
import Swal from "sweetalert2";
import { addToCart } from "./cart.actions";

export function AddToCartButton({ productId, compact = false }: { productId: string; compact?: boolean }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  function addProduct() {
    startTransition(async () => {
      const result = await addToCart(productId);
      if (result.success) {
        window.dispatchEvent(new Event("freshcart:cart-updated"));
        await Swal.fire({ icon: "success", title: "Added to cart", text: result.message, confirmButtonColor: "#16a34a" });
        return;
      }

      const needsLogin = result.message.toLowerCase().includes("sign in");
      const alert = await Swal.fire({
        icon: "error",
        title: needsLogin ? "Sign in to continue" : "Could not add product",
        text: result.message,
        showCancelButton: needsLogin,
        confirmButtonText: needsLogin ? "Sign In" : "OK",
        cancelButtonText: "Continue shopping",
        confirmButtonColor: "#16a34a",
      });
      if (needsLogin && alert.isConfirmed) router.push(`/login?callbackUrl=${encodeURIComponent("/cart")}`);
    });
  }

  return (
    <button type="button" onClick={addProduct} disabled={pending} aria-label="Add to cart" className={`${compact ? "h-10 gap-2 rounded-lg px-4 text-sm" : "size-9 rounded-full"} ml-auto inline-flex shrink-0 items-center justify-center bg-green-600 font-semibold text-white hover:bg-green-700 disabled:opacity-50`}>
      {compact ? "Add to Cart" : <FaPlus />}
    </button>
  );
}
