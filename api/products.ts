import { IProduct } from '@/types/IProduct';

// TODO: вынести в .env
const PRODUCT_API_URL = 'https://maxifoxy-testfront-96b4.twc1.net/api/products';

export async function fetchProducts(): Promise<{ items: IProduct[]; itemsCount: number }> {
  const res = await fetch(PRODUCT_API_URL);

  if (!res.ok) {
    throw new Error('Failed to fetch products');
  }

  const { items, count_items } = await res.json();
  return { items, itemsCount: count_items };
}
