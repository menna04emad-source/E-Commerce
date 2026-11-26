import type { Metadata } from "next";
import { Suspense } from "react";
import { getBrands } from "../_components/Brands/brands.api";
import { Brands } from "../_components/Brands/brands";
import { SuspenseFallback } from "../_components/suspense-fallback";

export const metadata: Metadata = {
  title: "Top Brands | FreshCart",
  description: "Explore trusted brands available at FreshCart.",
};

async function BrandsContent() {
  const brands = await getBrands();
  return <Brands brands={brands} />;
}

export default function BrandsPage() {
  return <Suspense fallback={<SuspenseFallback message="Loading brands..." />}><BrandsContent /></Suspense>;
}
