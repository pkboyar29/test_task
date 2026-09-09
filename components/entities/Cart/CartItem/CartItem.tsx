'use client';

import Link from 'next/link';
import { useEffect, useState, useRef } from 'react';
import { ICartItem } from '@/types/ICartItem';
import { useAppDispatch } from '@/store/store';
import { decrementQuantity, incrementQuantity, removeFromCart } from '@/store/slices/cartSlice';
import styles from './CartItem.module.scss';
import { formatPrice } from '@/lib/formatPrice';
import ProductImage from '../../../common/ProductImage/ProductImage';

const DELETE_DELAY = 3000;

interface CartItemProps {
  item: ICartItem;
}

export default function CartItem({ item }: CartItemProps) {
  const dispatch = useAppDispatch();
  const [isDeletePending, setIsDeletePending] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(null);

  const { product, quantity } = item;
  const itemPrice = product.price_discount * quantity;

  useEffect(() => {
    if (!isDeletePending) {
      return;
    }

    const timeoutId = setTimeout(() => {
      dispatch(removeFromCart(product.id));
    }, DELETE_DELAY);
    timeoutRef.current = timeoutId;

    return () => clearTimeout(timeoutId);
  }, [dispatch, isDeletePending, product.id]);

  const handleDelete = () => {
    setIsDeletePending(true);
  };

  const handleUndo = () => {
    setIsDeletePending(false);
  };

  const handleConfirmDelete = () => {
    if (!timeoutRef.current) {
      return;
    }

    clearTimeout(timeoutRef.current);
    dispatch(removeFromCart(product.id));
  };

  return (
    <article className={`${styles.cartItem} ${isDeletePending ? styles['cartItem--pending'] : ''}`}>
      <div className={styles.cartItem__left}>
        <div className={styles.cartItem__imageWrapper}>
          <Link href={`products/${product.id}`}>
            <ProductImage
              src={product.preview_picture}
              alt={product.name}
              width={110}
              height={110}
            />
          </Link>
        </div>

        <Link className={styles.cartItem__titleLink} href={`products/${product.id}`}>
          <h2 className={styles.cartItem__title}>{product.name}</h2>
        </Link>
      </div>

      <div className={styles.cartItem__right}>
        <div className={styles.cartItem__controls}>
          <strong className={styles.cartItem__price}>{formatPrice(itemPrice)}</strong>

          <div className={styles.cartItem__quantity} aria-label={`Количество: ${quantity}`}>
            <button
              className={styles.cartItem__quantityButton}
              type="button"
              aria-label={`Уменьшить количество товара «${product.name}»`}
              disabled={quantity === 1 || isDeletePending}
              onClick={() => dispatch(decrementQuantity(product.id))}
            >
              −
            </button>
            <span className={styles.cartItem__quantityValue}>{quantity}</span>
            <button
              className={styles.cartItem__quantityButton}
              type="button"
              aria-label={`Увеличить количество товара «${product.name}»`}
              disabled={quantity === 10 || isDeletePending}
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
          disabled={isDeletePending}
          onClick={handleDelete}
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

      {isDeletePending && (
        <div className={styles.cartItem__snackbar} role="status" aria-live="polite">
          <span>Товар удалится через 3 секунды</span>

          <button className={styles.cartItem__undo} type="button" onClick={handleUndo}>
            Отменить
          </button>

          <button
            className={styles.cartItem__close}
            type="button"
            aria-label="Сразу удалить из корзины"
            onClick={handleConfirmDelete}
          >
            <svg
              className={styles.cartItem__closeIcon}
              viewBox="0 0 24 24"
              aria-hidden="true"
              focusable="false"
            >
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>
      )}
    </article>
  );
}
