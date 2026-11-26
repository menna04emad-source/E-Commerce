export type Product = {
  _id: string;
  title: string;
  description: string;
  price: number;
  priceAfterDiscount?: number;
  quantity?: number;
  imageCover: string;
  images: string[];
  category: { _id: string; name: string; slug: string; image: string };
  brand?: { _id: string; name: string; slug: string; image: string };
  ratingsAverage: number;
  ratingsQuantity: number;
};

export type ProductResponse = { results: number; data: Product[] };
