import type { Brand } from "../../_types/brand";
import type { Category } from "../../_types/category";
import type { Product } from "../../_types/product";

export type ProductSort = "relevance" | "price-low" | "price-high" | "rating";

export type ProductFilters = {
  query: string;
  categoryIds: string[];
  brandIds: string[];
  minPrice: number | null;
  maxPrice: number | null;
  sort: ProductSort;
};

export function filterProducts(products: Product[], filters: ProductFilters) {
  const query = filters.query.trim().toLocaleLowerCase();
  const filtered = products.filter((product) => {
    const matchesQuery = !query || [product.title, product.category?.name, product.brand?.name]
      .some((value) => value?.toLocaleLowerCase().includes(query));
    const matchesCategory = !filters.categoryIds.length || filters.categoryIds.includes(product.category?._id ?? "");
    const matchesBrand = !filters.brandIds.length || filters.brandIds.includes(product.brand?._id ?? "");
    const price = product.priceAfterDiscount ?? product.price;
    const matchesMin = filters.minPrice === null || price >= filters.minPrice;
    const matchesMax = filters.maxPrice === null || price <= filters.maxPrice;
    return matchesQuery && matchesCategory && matchesBrand && matchesMin && matchesMax;
  });

  return filtered.sort((left, right) => {
    const leftPrice = left.priceAfterDiscount ?? left.price;
    const rightPrice = right.priceAfterDiscount ?? right.price;
    if (filters.sort === "price-low") return leftPrice - rightPrice;
    if (filters.sort === "price-high") return rightPrice - leftPrice;
    if (filters.sort === "rating") return right.ratingsAverage - left.ratingsAverage;
    return 0;
  });
}

export function searchFilterCounts(products: Product[], categories: Category[], brands: Brand[]) {
  return {
    categories: new Map(categories.map((category) => [category._id, products.filter((product) => product.category?._id === category._id).length])),
    brands: new Map(brands.map((brand) => [brand._id, products.filter((product) => product.brand?._id === brand._id).length])),
  };
}
