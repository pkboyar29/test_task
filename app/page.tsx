import { IProduct } from '@/types/IProduct';
import ProductCard from '@/components/ProductCard/ProductCard';
import styles from './page.module.scss';

export default async function Home() {
  // TODO: вынести в функцию
  // TODO: хранить в rtk
  const res = await fetch(
    'https://maxifoxy-testfront-96b4.twc1.net/api/products',
  );
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  const products: IProduct[] = (await res.json()).items;

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div className={styles.cards}>
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </main>
    </div>
  );
}
