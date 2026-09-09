'use client';

import styles from './ProductCardSkeleton.module.scss';

interface ProductCardSkeletonProps {
  count?: number;
}

export default function ProductCardSkeleton({ count = 6 }: ProductCardSkeletonProps) {
  return (
    <div className="cards" aria-busy="true" aria-label="Загрузка товаров">
      {Array.from({ length: count }, (_, index) => (
        <article className={styles.card} key={index}>
          <div className={styles.card__visual}>
            <span className={styles.card__visualShape} />
          </div>

          <div className={styles.card__content}>
            <span className={`${styles.card__line} ${styles['card__line--short']}`} />
            <span className={`${styles.card__line} ${styles['card__line--title']}`} />
            <span className={`${styles.card__line} ${styles['card__line--title']}`} />
            <div className={styles.card__footer}>
              <span className={`${styles.card__line} ${styles['card__line--price']}`} />
              <span className={`${styles.card__line} ${styles['card__line--button']}`} />
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
