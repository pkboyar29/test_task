'use client';

import { useState } from 'react';
import { IProduct } from '@/types/IProduct';
import styles from './ProductCard.module.scss';

interface ProductCardProps {
  product: IProduct;
}

const priceFormatter = new Intl.NumberFormat('ru-RU', {
  style: 'currency',
  currency: 'RUB',
  maximumFractionDigits: 0,
});

export default function ProductCard({ product }: ProductCardProps) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isInCart, setIsInCart] = useState(false);

  const labels = Object.entries(product.labels);
  const hasDiscount =
    product.price_discount > 0 && product.price_discount < product.price;

  return (
    <article className={styles.card}>
      <div className={styles.card__visual}>
        {product.available ? (
          <span className={styles.card__availability}>В наличии</span>
        ) : null}
        <button
          className={`${styles.card__favorite} ${isFavorite ? styles['card__favorite--active'] : ''}`}
          type="button"
          aria-label={
            isFavorite ? 'Убрать из избранного' : 'Добавить в избранное'
          }
          aria-pressed={isFavorite}
          onClick={() => setIsFavorite((current) => !current)}
        >
          {isFavorite ? '♥' : '♡'}
        </button>

        {/* TODO: использовать <Image /> */}
        {product.preview_picture ? (
          <img
            className={styles.card__image}
            src={product.preview_picture}
            // TODO: что-то отображать, если изображения по пути нету
            // alt={product.name}
          />
        ) : (
          <div className={styles.card__imagePlaceholder}>Нет изображения</div>
        )}
      </div>

      <div className={styles.card__content}>
        {labels.length > 0 ? (
          <div className={styles.card__labels}>
            {labels.map(([name, value], index) => (
              <span
                className={`${styles.card__label} ${styles[`card__label--${index % 4}`]}`}
                key={name}
              >
                {value}
              </span>
            ))}
          </div>
        ) : null}

        <h2 className={styles.card__title}>{product.name}</h2>

        <div className={styles.card__footer}>
          <div className={styles.card__prices}>
            <strong className={styles.card__price}>
              {priceFormatter.format(
                hasDiscount ? product.price_discount : product.price,
              )}
            </strong>
            {hasDiscount ? (
              <del className={styles.card__oldPrice}>
                {priceFormatter.format(product.price)}
              </del>
            ) : null}
          </div>

          <button
            className={`${styles.card__cart} ${isInCart ? styles['card__cart--active'] : ''}`}
            type="button"
            disabled={!product.available}
            onClick={() => setIsInCart((current) => !current)}
          >
            {isInCart ? 'В корзине' : 'В корзину'}
          </button>
        </div>
      </div>
    </article>
  );
}
