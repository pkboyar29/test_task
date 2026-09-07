'use client';

import CartItem from '@/components/CartItem/CartItem';
import EmptyState from '@/components/EmptyState/EmptyState';
import { useAppSelector } from '@/store/store';
import styles from './page.module.scss';
import { formatPrice } from '@/helpers/formatPrice';

export default function Cart() {
  const { data: cartItems, status } = useAppSelector((state) => state.cart);
  const totalPrice = cartItems.reduce(
    (total, { product, quantity }) => total + (product.price_discount || product.price) * quantity,
    0,
  );

  return (
    <main className={styles.cartPage}>
      <div className={styles.cartPage__inner}>
        <header className={styles.cartPage__header}>
          <span className={styles.cartPage__eyebrow}>Ваш выбор</span>
          <h1 className="title">Корзина</h1>
        </header>

        {status === 'idle' ? (
          <p>Loading...</p>
        ) : cartItems.length === 0 ? (
          <EmptyState message="В корзине пока ничего нет." />
        ) : (
          <div className={styles.cartPage__container}>
            <section className={styles.cartPage__items} aria-label="Товары в корзине">
              {cartItems.map((item) => (
                <CartItem key={item.product.id} item={item} />
              ))}
            </section>

            <aside className={styles.cartPage__summary}>
              <span className={styles.cartPage__summaryLabel}>Итого</span>
              <strong className={styles.cartPage__total}>{formatPrice(totalPrice)}</strong>
              <button className={styles.cartPage__checkout} type="button">
                Оформить заказ
              </button>
            </aside>
          </div>
        )}
      </div>
    </main>
  );
}
