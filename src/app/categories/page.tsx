import type { Metadata } from "next";
import { Suspense } from "react";
import { CategoryList } from "../_components/Categories/category-list";
import { getCategories } from "../_components/Categories/categories.api";
import { SuspenseFallback } from "../_components/suspense-fallback";

export const metadata: Metadata = {
  title: "All Categories | FreshCart",
  description: "Browse FreshCart products by category.",
};

async function CategoriesContent() {
  const categories = await getCategories();
  return <CategoryList categories={categories} />;
}

export default function CategoriesPage() {
  return <Suspense fallback={<SuspenseFallback message="Loading categories..." />}><CategoriesContent /></Suspense>;
}
