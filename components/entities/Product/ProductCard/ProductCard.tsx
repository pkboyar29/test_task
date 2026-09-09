'use client';

import Link from 'next/link';
import { IProduct } from '@/types/IProduct';
import styles from './ProductCard.module.scss';
import { useAppDispatch, useAppSelector, selectIsFavorite, selectIsInCart } from '@/store/store';
import { addFavorite, removeFavorite } from '@/store/slices/favoritesSlice';
import { addToCart, removeFromCart } from '@/store/slices/cartSlice';
import { formatPrice } from '@/lib/formatPrice';
import { getReviewWord } from '@/lib/getReviewWord';
import ProductImage from '../../../common/ProductImage/ProductImage';
import Button from '../../../common/Button/Button';
import Label from '../../../common/Label/Label';

interface ProductCardProps {
  product: IProduct;
}

export default function ProductCard({ product }: ProductCardProps) {
  const labels = Object.entries(product.labels);

  const dispatch = useAppDispatch();

  const isFavorite = useAppSelector((state) => selectIsFavorite(state, product.id));
  const isInCart = useAppSelector((state) => selectIsInCart(state, product.id));

  const handleFavoriteClick = () => {
    dispatch(isFavorite ? removeFavorite(product.id) : addFavorite(product));
  };

  const handleCartClick = () => {
    dispatch(isInCart ? removeFromCart(product.id) : addToCart(product));
  };

  return (
    <article className={styles.card}>
      <div className={styles.card__visual}>
        {product.available ? <span className={styles.card__availability}>В наличии</span> : null}

        <button
          className={`${styles.card__favorite} ${isFavorite ? styles['card__favorite--active'] : ''}`}
          type="button"
          aria-label={isFavorite ? 'Убрать из избранного' : 'Добавить в избранное'}
          aria-pressed={isFavorite}
          onClick={handleFavoriteClick}
        >
          {isFavorite ? '♥' : '♡'}
        </button>

        <Link className={styles.card__imageLink} href={`/products/${product.id}`}>
          <ProductImage src={product.preview_picture} alt={product.name} width={270} height={270} />
        </Link>
      </div>

      <div className={styles.card__content}>
        {labels.length > 0 ? (
          <div className={styles.card__labels}>
            {labels.map(([name, value], index) => (
              <Label key={name} value={value} variant={index} />
            ))}
          </div>
        ) : null}

        <h2 className={styles.card__title}>
          <Link className={styles.card__titleLink} href={`/products/${product.id}`}>
            {product.name}
          </Link>
        </h2>

        <div className={styles.card__footer}>
          <span className={styles.card__reviews}>
            {product.reviews} {getReviewWord(product.reviews)}
          </span>

          <div className={styles['card__footer--container']}>
            <div className={styles.card__prices}>
              <strong className={styles.card__price}>{formatPrice(product.price_discount)}</strong>
              {product.price_discount ? (
                <del className={styles.card__oldPrice}>{formatPrice(product.price)}</del>
              ) : null}
            </div>

            <Button
              type="button"
              isActive={isInCart}
              disabled={!product.available}
              clickHandler={handleCartClick}
            >
              {!product.available ? 'Нет в наличии' : isInCart ? 'В корзине' : 'В корзину'}
            </Button>
          </div>
        </div>
      </div>
    </article>
  );
}
