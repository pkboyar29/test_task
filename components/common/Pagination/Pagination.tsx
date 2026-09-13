'use client';

import Link from 'next/link';
import styles from './Pagination.module.scss';

interface PaginationProps {
  itemsCount: number;
  pageCount: number;
  currentPage: number;
}

export default function Pagination({ itemsCount, pageCount, currentPage }: PaginationProps) {
  const totalPages = Math.ceil(itemsCount / pageCount);

  if (totalPages <= 1) {
    return null;
  }

  return (
    <nav className={styles.pagination} aria-label="Навигация по страницам">
      <div className={styles.pagination__list}>
        {Array.from({ length: totalPages }, (_, index) => {
          const page = index + 1;

          return (
            <Link
              key={page}
              href={`?page=${page}`}
              className={`${styles.pagination__button} ${
                currentPage === page ? styles['pagination__button--active'] : ''
              }`}
              aria-label={`Страница ${page}`}
              aria-current={currentPage === page ? 'page' : undefined}
            >
              {page}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
