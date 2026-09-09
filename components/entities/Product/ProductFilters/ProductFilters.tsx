'use client';

import { useState } from 'react';
import type { FormEvent } from 'react';
import styles from './ProductFilters.module.scss';
import Button from '../../../common/Button/Button';

export interface ProductFilterValuesType {
  categories: string[];
  onlyAvailable: boolean;
  minPrice: string;
  maxPrice: string;
  searchQuery: string;
}

interface ProductFiltersProps {
  categories: string[];
  onApply: (filters: ProductFilterValuesType) => void;
}

const initialFilters: ProductFilterValuesType = {
  categories: [],
  onlyAvailable: false,
  minPrice: '',
  maxPrice: '',
  searchQuery: '',
};

export default function ProductFilters({ categories, onApply }: ProductFiltersProps) {
  const [filters, setFilters] = useState(initialFilters);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const handleCategoryChange = (category: string) => {
    setFilters((prev) => ({
      ...prev,
      categories: prev.categories.includes(category)
        ? prev.categories.filter((item) => item !== category)
        : [...prev.categories, category],
    }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsEditing(false);
    onApply(filters);
  };

  return (
    <form className={styles.filters} onSubmit={handleSubmit}>
      <fieldset className={styles.filters__group}>
        <legend className={styles.filters__legend}>Категория</legend>
        <div className={styles.filters__categories}>
          {categories.map((category) => (
            <label key={category} className={styles.filters__option}>
              <input
                type="checkbox"
                checked={filters.categories.includes(category)}
                onChange={() => {
                  setIsEditing(true);
                  handleCategoryChange(category);
                }}
              />
              <span>{category}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset className={styles.filters__group}>
        <legend className={styles.filters__legend}>Наличие</legend>
        <label className={styles.filters__option}>
          <input
            type="checkbox"
            checked={filters.onlyAvailable}
            onChange={(event) => {
              setIsEditing(true);
              setFilters((current) => ({ ...current, onlyAvailable: event.target.checked }));
            }}
          />
          <span>Только в наличии</span>
        </label>
      </fieldset>

      <fieldset className={styles.filters__group}>
        <legend className={styles.filters__legend}>Цена, ₽</legend>
        <div className={styles.filters__priceInputs}>
          <label className={styles.filters__priceField}>
            <span>От</span>
            <input
              type="number"
              min="0"
              value={filters.minPrice}
              onChange={(event) => {
                setIsEditing(true);
                setFilters((current) => ({ ...current, minPrice: event.target.value }));
              }}
            />
          </label>
          <label className={styles.filters__priceField}>
            <span>До</span>
            <input
              type="number"
              min="0"
              value={filters.maxPrice}
              onChange={(event) => {
                setIsEditing(true);
                setFilters((current) => ({ ...current, maxPrice: event.target.value }));
              }}
            />
          </label>
        </div>
      </fieldset>

      <div className={styles.filters__submit}>
        <Button disabled={!isEditing} type="submit">
          Применить изменения
        </Button>
      </div>
    </form>
  );
}
