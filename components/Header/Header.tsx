'use client';

import { useState } from 'react';
import Link from 'next/link';
import NavItem from '../NavItem/NavItem';
import styles from './Header.module.scss';
import { useAppSelector } from '@/store/store';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const favorites = useAppSelector((state) => state.favorites.data);
  const cartItems = useAppSelector((state) => state.cart.data);

  return (
    <header className={styles.header}>
      <div className={styles.header__inner}>
        <Link href="/" className={styles.header__logo} aria-label="test task">
          test task
        </Link>

        <button
          className={styles.header__burger}
          type="button"
          aria-expanded={isMenuOpen}
          aria-controls="main-navigation"
          aria-label={isMenuOpen ? 'Закрыть меню' : 'Открыть меню'}
          onClick={() => setIsMenuOpen((isOpen) => !isOpen)}
        >
          <span />
          <span />
          <span />
        </button>

        <nav
          id="main-navigation"
          className={`${styles.header__nav} ${isMenuOpen ? styles.header__navOpen : ''}`}
          aria-label="Главная навигация"
          onClick={() => setIsMenuOpen(false)}
        >
          <ul className={styles.header__list}>
            <NavItem href="/" label="Товары" />
            <NavItem href="/cart" label="Корзина" count={cartItems.length} />
            <NavItem href="/favorites" label="Избранное" count={favorites.length} />
          </ul>
        </nav>
      </div>
    </header>
  );
}
