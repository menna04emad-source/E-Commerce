export type Brand = {
  _id: string;
  name: string;
  slug: string;
  image: string;
};

export type BrandResponse = { results: number; data: Brand[] };
