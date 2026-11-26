"use client";

import { useCallback, useEffect, useState } from "react";
import { getWishlistCount } from "./wishlist.actions";

export function WishlistCount() {
  const [count, setCount] = useState(0);
  const refresh = useCallback(async () => setCount(await getWishlistCount()), []);

  useEffect(() => {
    void refresh();
    window.addEventListener("freshcart:wishlist-updated", refresh);
    return () => window.removeEventListener("freshcart:wishlist-updated", refresh);
  }, [refresh]);

  return count > 0 ? <span className="absolute -top-2 -right-2 grid min-w-4 place-items-center rounded-full bg-rose-500 px-1 text-[9px] font-bold leading-4 text-white">{count}</span> : null;
}
