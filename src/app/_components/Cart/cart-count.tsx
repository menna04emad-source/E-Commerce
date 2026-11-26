"use client";

import { useCallback, useEffect, useState } from "react";
import { getCartQuantity } from "./cart.actions";

export function CartCount() {
  const [count, setCount] = useState(0);

  const refreshCount = useCallback(async () => {
    setCount(await getCartQuantity());
  }, []);

  useEffect(() => {
    void refreshCount();
    window.addEventListener("freshcart:cart-updated", refreshCount);
    return () => window.removeEventListener("freshcart:cart-updated", refreshCount);
  }, [refreshCount]);

  return count > 0 ? <span className="absolute -top-2 -right-2 grid min-w-4 place-items-center rounded-full bg-green-600 px-1 text-[9px] font-bold leading-4 text-white">{count}</span> : null;
}
