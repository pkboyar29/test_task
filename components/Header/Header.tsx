'use client';

import { useState } from 'react';
import Link from 'next/link';
import NavItem from '../NavItem/NavItem';
import styles from './Header.module.scss';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
            <NavItem href="/cart" label="Корзина" count={3} />
            <NavItem href="/favorites" label="Избранное" count={7} />
          </ul>
        </nav>
      </div>
    </header>
  );
}
