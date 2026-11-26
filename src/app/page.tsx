import type { Metadata } from "next";
import { Suspense } from "react";
import { HomePage } from "./_components/./Home/home-page";
import { SuspenseFallback } from "./_components/suspense-fallback";

export const metadata: Metadata = {
  title: "FreshCart | Fresh products delivered to your door",
  description:
    "Shop fresh groceries, fashion, electronics and more at FreshCart. Enjoy great deals and fast delivery.",
};

export default function Page() {
  return (
    <>
      <Suspense
        fallback={
          <SuspenseFallback message="Loading fresh products and categories..." />
        }
      >
        <HomePage />
      </Suspense>
    </>
  );
}
