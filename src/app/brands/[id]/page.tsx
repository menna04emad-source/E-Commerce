import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BrandDetail } from "../../_components/Brands/brand-detail";
import { getBrandById } from "../../_components/Brands/brands.api";
import { filterProductsByBrand } from "../../_components/Brands/brands.logic";
import { getAllProducts } from "../../_components/Home/home-data.logic";

type BrandPageProps = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: BrandPageProps): Promise<Metadata> {
  const { id } = await params;
  const brand = await getBrandById(id);
  return { title: brand ? `${brand.name} | FreshCart` : "Brand | FreshCart" };
}

export default async function BrandPage({ params }: BrandPageProps) {
  const { id } = await params;
  const [brand, products] = await Promise.all([getBrandById(id), getAllProducts()]);
  if (!brand) notFound();
  return <BrandDetail brand={brand} products={filterProductsByBrand(products, brand._id)} />;
}
