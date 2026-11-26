import type { Metadata } from "next";
import { notFound } from "next/navigation";
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

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { id } = await params;
  const [category, products] = await Promise.all([getCategoryById(id), getAllProducts()]);
  if (!category) notFound();
  return <CategoryDetail category={category} products={filterProductsByCategory(products, category._id)} />;
}
