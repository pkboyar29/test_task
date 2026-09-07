'use client';

import { ICartItem } from '@/types/ICartItem';
import { useAppDispatch } from '@/store/store';
import { decrementQuantity, incrementQuantity, removeFromCart } from '@/store/slices/cartSlice';
import styles from './CartItem.module.scss';
import { formatPrice } from '@/helpers/formatPrice';
import ProductImage from '../ProductImage/ProductImage';

interface CartItemProps {
  item: ICartItem;
}

export default function CartItem({ item }: CartItemProps) {
  const dispatch = useAppDispatch();
  const { product, quantity } = item;
  const itemPrice = (product.price_discount || product.price) * quantity;

  return (
    <article className={styles.cartItem}>
      <div className={styles.cartItem__left}>
        <div className={styles.cartItem__imageWrapper}>
          <ProductImage src={product.preview_picture} alt={product.name} width={110} height={110} />
        </div>

        <h2 className={styles.cartItem__title}>{product.name}</h2>
      </div>

      <div className={styles.cartItem__right}>
        <div className={styles.cartItem__controls}>
          <strong className={styles.cartItem__price}>{formatPrice(itemPrice)}</strong>

          <div className={styles.cartItem__quantity} aria-label={`Количество: ${quantity}`}>
            <button
              className={styles.cartItem__quantityButton}
              type="button"
              aria-label={`Уменьшить количество товара «${product.name}»`}
              disabled={quantity === 1}
              onClick={() => dispatch(decrementQuantity(product.id))}
            >
              −
            </button>
            <span className={styles.cartItem__quantityValue}>{quantity}</span>
            <button
              className={styles.cartItem__quantityButton}
              type="button"
              aria-label={`Увеличить количество товара «${product.name}»`}
              disabled={quantity === 10}
              onClick={() => dispatch(incrementQuantity(product.id))}
            >
              +
            </button>
          </div>
        </div>

        <button
          className={styles.cartItem__remove}
          type="button"
          aria-label={`Удалить товар «${product.name}» из корзины`}
          onClick={() => dispatch(removeFromCart(product.id))}
        >
          <svg
            className={styles.cartItem__removeIcon}
            viewBox="0 0 24 24"
            aria-hidden="true"
            focusable="false"
          >
            <path d="M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3" />
          </svg>
        </button>
      </div>
    </article>
  );
}
