'use client';

import { useState, useMemo } from 'react';
import ProductCard from '@/components/ProductCard/ProductCard';
import EmptyState from '../EmptyState/EmptyState';
import ProductFilters, {
  ProductFilterValuesType,
} from '@/components/ProductFilters/ProductFilters';
import ProductSort, { ProductSortValueType } from '@/components/ProductSort/ProductSort';
import { IProduct } from '@/types/IProduct';
import { filterProducts } from './filterProducts';
import { sortProducts } from './sortProducts';

interface ProductCatalogProps {
  products: IProduct[];
}

export default function ProductCatalog({ products }: ProductCatalogProps) {
  const [filters, setFilters] = useState<ProductFilterValuesType>({
    categories: [],
    onlyAvailable: false,
    minPrice: '',
    maxPrice: '',
  });
  const [sort, setSort] = useState<ProductSortValueType>('default');

  const categories = useMemo(
    () => Array.from(new Set(products.flatMap((product) => Object.values(product.labels)))),
    [products],
  );

  const filteredProducts = useMemo(() => filterProducts(products, filters), [products, filters]);

  const sortedProducts = useMemo(
    () => sortProducts(filteredProducts, sort),
    [filteredProducts, sort],
  );

  return (
    <>
      <ProductFilters categories={categories} onApply={setFilters} />
      <ProductSort value={sort} onChange={setSort} />

      {sortedProducts.length > 0 ? (
        <div className="cards">
          {sortedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <EmptyState message="По выбранным фильтрам товары не найдены." />
      )}
    </>
  );
}
