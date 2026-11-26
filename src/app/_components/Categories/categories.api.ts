import type { Category } from "../../_types/category";
import { getApiUrl } from "@/lib/api-url";

const API = getApiUrl("v1/categories");

export async function getCategories(): Promise<Category[]> {
  try {
    const response = await fetch(API, { next: { revalidate: 300 } });
    if (!response.ok) return [];
    const result = (await response.json()) as { data?: Category[] };
    return Array.isArray(result.data) ? result.data : [];
  } catch {
    return [];
  }
}

export async function getCategoryById(id: string): Promise<Category | null> {
  try {
    const response = await fetch(`${API}/${encodeURIComponent(id)}`, {
      next: { revalidate: 300 },
    });
    if (!response.ok) return null;
    const result = (await response.json()) as { data?: Category };
    return result.data ?? null;
  } catch {
    return null;
  }
}
