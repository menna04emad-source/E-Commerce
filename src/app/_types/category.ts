export type Category = {
  _id: string;
  name: string;
  slug: string;
  image: string;
};

export type CategoryResponse = { results: number; data: Category[] };
