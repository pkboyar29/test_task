'use client';

import { IProduct } from '@/types/IProduct';
import styles from './ProductCard.module.scss';
import { useAppDispatch, useAppSelector, selectIsFavorite, selectIsInCart } from '@/store/store';
import { addFavorite, removeFavorite } from '@/store/slices/favoritesSlice';
import { addToCart, removeFromCart } from '@/store/slices/cartSlice';
import { formatPrice } from '@/helpers/formatPrice';
import { getReviewWord } from '@/helpers/getReviewWord';
import ProductImage from '../ProductImage/ProductImage';
import Button from '../Button/Button';

interface ProductCardProps {
  product: IProduct;
}

export default function ProductCard({ product }: ProductCardProps) {
  const labels = Object.entries(product.labels);
  const hasDiscount = product.price_discount > 0 && product.price_discount < product.price;

  const dispatch = useAppDispatch();

  const isFavorite = useAppSelector((state) => selectIsFavorite(state, product.id));
  const isInCart = useAppSelector((state) => selectIsInCart(state, product.id));

  const handleFavoriteClick = () => {
    if (isFavorite) {
      dispatch(removeFavorite(product.id));
    } else {
      dispatch(addFavorite(product));
    }
  };

  const handleCartClick = () => {
    if (isInCart) {
      dispatch(removeFromCart(product.id));
    } else {
      dispatch(addToCart(product));
    }
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

        <ProductImage src={product.preview_picture} alt={product.name} width={270} height={270} />
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
          <span className={styles.card__reviews}>
            {product.reviews} {getReviewWord(product.reviews)}
          </span>

          <div className={styles['card__footer--container']}>
            <div className={styles.card__prices}>
              <strong className={styles.card__price}>
                {formatPrice(hasDiscount ? product.price_discount : product.price)}
              </strong>
              {hasDiscount ? (
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
