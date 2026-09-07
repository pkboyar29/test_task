'use client';

import ProductCard from '@/components/ProductCard/ProductCard';
import { useAppSelector } from '@/store/store';
import styles from './page.module.scss';

export default function Favorites() {
  const { data: favorites, status } = useAppSelector((state) => state.favorites);

  return (
    <main className={styles.favorites}>
      <div className={styles.favorites__container}>
        <h1 className={styles.favorites__title}>Избранное</h1>

        {status === 'idle' ? (
          <div>Loading...</div>
        ) : favorites.length > 0 ? (
          <div className="cards">
            {favorites.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <p className={styles.favorites__empty}>В избранном пока нет товаров</p>
        )}
      </div>
    </main>
  );
}
