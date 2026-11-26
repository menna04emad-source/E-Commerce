import type { Brand } from "../../_types/brand";
import { getApiUrl } from "@/lib/api-url";

export async function getBrands(): Promise<Brand[]> {
  try {
    const response = await fetch(getApiUrl("v1/brands"), { next: { revalidate: 300 } });
    if (!response.ok) return [];
    const result = (await response.json()) as { data?: Brand[] };
    return Array.isArray(result.data) ? result.data : [];
  } catch {
    return [];
  }
}

export async function getBrandById(id: string): Promise<Brand | null> {
  try {
    const response = await fetch(getApiUrl(`v1/brands/${encodeURIComponent(id)}`), {
      next: { revalidate: 300 },
    });
    if (!response.ok) return null;
    const result = (await response.json()) as { data?: Brand };
    return result.data ?? null;
  } catch {
    return null;
  }
}
