import ProductCard from '@/components/ProductCard/ProductCard';
import { fetchProducts } from '@/api/products';
import styles from './page.module.scss';

export default async function Home() {
  const products = await fetchProducts();

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div className="cards">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </main>
    </div>
  );
}
