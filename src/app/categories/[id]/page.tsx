import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { CategoryDetail } from "../../_components/Categories/category-detail";
import { getCategoryById } from "../../_components/Categories/categories.api";
import { filterProductsByCategory } from "../../_components/Categories/categories.logic";
import { getAllProducts } from "../../_components/Home/home-data.logic";

type CategoryPageProps = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { id } = await params;
  const category = await getCategoryById(id);
  return { title: category ? `${category.name} | FreshCart` : "Category | FreshCart" };
}

async function CategoryContent({ params }: CategoryPageProps) {
  const { id } = await params;
  const [category, products] = await Promise.all([getCategoryById(id), getAllProducts()]);
  if (!category) notFound();
  return <CategoryDetail category={category} products={filterProductsByCategory(products, category._id)} />;
}

export default function CategoryPage({ params }: CategoryPageProps) {
  return <Suspense fallback={<div className="min-h-[50vh] animate-pulse bg-slate-50" />}><CategoryContent params={params} /></Suspense>;
}
