'use client';

import { useState, useEffect } from 'react';
import styles from './ProductSearch.module.scss';

interface ProductSearchProps {
  onSearch: (newSearchQuery: string) => void;
}

export default function ProductSearch({ onSearch }: ProductSearchProps) {
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      onSearch(searchQuery);
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  return (
    <label className={styles.search} htmlFor="product-search">
      <span className={styles.search__field}>
        <span className={styles.search__icon} aria-hidden="true">
          ⌕
        </span>

        <input
          id="product-search"
          type="search"
          placeholder="Найти товар"
          onChange={(event) => setSearchQuery(event.currentTarget.value)}
        />
      </span>
    </label>
  );
}
