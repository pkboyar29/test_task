'use client';

import { IProduct } from '@/types/IProduct';
import { useAppDispatch, useAppSelector, selectIsFavorite, selectIsInCart } from '@/store/store';
import { addFavorite, removeFavorite } from '@/store/slices/favoritesSlice';
import { addToCart, removeFromCart } from '@/store/slices/cartSlice';
import { formatPrice } from '@/helpers/formatPrice';
import { getReviewWord } from '@/helpers/getReviewWord';
import ProductImage from '../ProductImage/ProductImage';
import Button from '../Button/Button';
import Label from '../Label/Label';
import styles from './ProductDetails.module.scss';

interface ProductDetailsProps {
  product: IProduct;
}

export default function ProductDetails({ product }: ProductDetailsProps) {
  const dispatch = useAppDispatch();

  const isFavorite = useAppSelector((state) => selectIsFavorite(state, product.id));
  const isInCart = useAppSelector((state) => selectIsInCart(state, product.id));

  const labels = Object.values(product.labels);

  const handleFavoriteClick = () => {
    dispatch(isFavorite ? removeFavorite(product.id) : addFavorite(product));
  };

  const handleCartClick = () => {
    dispatch(isInCart ? removeFromCart(product.id) : addToCart(product));
  };

  return (
    <article className={styles.details}>
      <div className={styles.details__visual}>
        {product.available ? <span className={styles.details__availability}>В наличии</span> : null}
        <ProductImage src={product.preview_picture} alt={product.name} width={400} height={400} />
      </div>

      <div className={styles.details__content}>
        {labels.length > 0 ? (
          <div className={styles.details__labels}>
            {labels.map((label, index) => (
              <Label key={label} value={label} variant={index} />
            ))}
          </div>
        ) : null}

        <h1 className={styles.details__title}>{product.name}</h1>
        <p className={styles.details__reviews}>
          {product.reviews} {getReviewWord(product.reviews)}
        </p>

        {product.characteristics.length > 0 ? (
          <section className={styles.details__section}>
            <h2 className={styles.details__sectionTitle}>Характеристики</h2>

            <dl className={styles.details__characteristics}>
              {product.characteristics.map((characteristic, index) => (
                <div className={styles.details__characteristic} key={index}>
                  <dt>{characteristic.label}</dt>
                  <dd>{characteristic.value}</dd>
                </div>
              ))}
            </dl>
          </section>
        ) : null}

        <div className={styles.details__purchase}>
          <div className={styles.details__prices}>
            <strong className={styles.details__price}>{formatPrice(product.price_discount)}</strong>
            <del>{formatPrice(product.price)}</del>
          </div>

          <div className={styles.details__actions}>
            <Button
              type="button"
              isActive={isFavorite}
              clickHandler={handleFavoriteClick}
              aria-label={isFavorite ? 'Убрать из избранного' : 'Добавить в избранное'}
            >
              {isFavorite ? 'В избранном' : 'В избранное'}
            </Button>
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
