import ProductCatalog from '@/components/ProductCatalog/ProductCatalog';
import { fetchProducts } from '@/api/products';

export default async function Home() {
  const products = await fetchProducts();

  return (
    <>
      <h1 className="title">Каталог товаров</h1>

      <ProductCatalog products={products} />
    </>
  );
}
