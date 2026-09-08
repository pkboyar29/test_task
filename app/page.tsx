import ProductCatalog from '@/components/ProductCatalog/ProductCatalog';
import { fetchProducts } from '@/api/products';
import styles from './page.module.scss';

export default async function Home() {
  const products = await fetchProducts();

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1 className="title">Каталог товаров</h1>

        <ProductCatalog products={products} />
      </main>
    </div>
  );
}
