'use client';

import styles from './ProductSort.module.scss';

export type ProductSortValueType =
  'default' | 'price-asc' | 'price-desc' | 'name-asc' | 'reviews-desc';

interface ProductSortProps {
  value: ProductSortValueType;
  onChange: (value: ProductSortValueType) => void;
}

const sortOptions: { value: ProductSortValueType; label: string }[] = [
  { value: 'default', label: 'По умолчанию' },
  { value: 'price-asc', label: 'Цена: сначала дешевле' },
  { value: 'price-desc', label: 'Цена: сначала дороже' },
  { value: 'name-asc', label: 'Название: А-Я' },
  { value: 'reviews-desc', label: 'Отзывы: сначала больше' },
];

export default function ProductSort({ value, onChange }: ProductSortProps) {
  return (
    <div className={styles.sort}>
      <label className={styles.sort__label} htmlFor="product-sort">
        Сортировка
      </label>
      <select
        className={styles.sort__select}
        id="product-sort"
        value={value}
        onChange={(event) => onChange(event.target.value as ProductSortValueType)}
      >
        {sortOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
