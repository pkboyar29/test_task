import { IProduct } from '@/types/IProduct';

// TODO: вынести в .env
const PRODUCT_API_URL = 'https://maxifoxy-testfront-96b4.twc1.net/api/products';

export async function fetchProducts(): Promise<IProduct[]> {
  const res = await fetch(PRODUCT_API_URL);

  if (!res.ok) {
    throw new Error('Failed to fetch products');
  }

  // TODO: также хранить items_count, per_page
  const data: { items: IProduct[] } = await res.json();
  return data.items;
}
