import type { Category, CategoryResponse } from "../../_types/category";
import type { Product, ProductResponse } from "../../_types/product";
import { getApiUrl } from "@/lib/api-url";

async function getData<T>(endpoint: string): Promise<T[]> {
  try {
    const response = await fetch(getApiUrl(`v1/${endpoint}`),
       { next: { revalidate: 300 } });
      //  console.log("data",response);
       if (!response.ok) return [];
       const body = await response.json() as { data?: T[] };
       return Array.isArray(body.data) ? body.data : [];
      } catch {
    return [];
  }
}

export const getProducts = () => getData<Product>("products?limit=40");
export async function getAllProducts(): Promise<Product[]> {
  try {
    const firstResponse = await fetch(getApiUrl("v1/products?page=1&limit=40"), {
      next: { revalidate: 300 },
    });
    if (!firstResponse.ok) return [];

    const firstPage = (await firstResponse.json()) as {
      data?: Product[];
      metadata?: { numberOfPages?: number };
    };
    const products = Array.isArray(firstPage.data) ? firstPage.data : [];
    const numberOfPages = firstPage.metadata?.numberOfPages ?? 1;
    if (numberOfPages < 2) return products;

    const otherPages = await Promise.all(
      Array.from({ length: numberOfPages - 1 }, (_, index) => index + 2).map(async (page) => {
        const response = await fetch(getApiUrl(`v1/products?page=${page}&limit=40`), {
          next: { revalidate: 300 },
        });
        if (!response.ok) return [];
        const body = (await response.json()) as { data?: Product[] };
        return Array.isArray(body.data) ? body.data : [];
      }),
    );
    return [...products, ...otherPages.flat()];
  } catch {
    return [];
  }
}
export const getCategories = () => getData<Category>("categories");

export function formatRating(product: Product) {
  return `${(product.ratingsAverage ?? 0).toFixed(1)} (${product.ratingsQuantity ?? 0})`;
}

export function getProductPrice(product: Product) {
  return product.priceAfterDiscount ?? product.price;
}

export function getDiscount(product: Product) {
  return product.priceAfterDiscount && product.priceAfterDiscount < product.price
    ? Math.round((1 - product.priceAfterDiscount / product.price) * 100)
    : 0;
}

export type { CategoryResponse, ProductResponse };
