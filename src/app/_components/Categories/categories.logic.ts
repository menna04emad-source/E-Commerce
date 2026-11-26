import type { Category } from "../../_types/category";

export const fallbackCategoryNames = ["Music","Men's Fashion","Women's Fashion","SuperMarket","Baby & Toys","Home","Books","Beauty & Health","Mobiles","Electronics"];
const categoryEmojis = ["🎸","👕","👗","🥑","🧸","🏠","📚","🧴","📱","🎧"];

export function getCategoryEmoji(index: number) {
  return categoryEmojis[index % categoryEmojis.length];
}

export function getCategoryTiles(categories: Category[]) {
  return categories.length ? categories : fallbackCategoryNames.map((name,index)=>({_id:`fallback-${index}`,name,slug:name.toLowerCase().replaceAll(" ","-"),image:""}));
}

export function filterProductsByCategory<T extends { category?: { _id?: string } }>(
  products: T[],
  categoryId: string,
) {
  return products.filter((product) => product.category?._id === categoryId);
}
