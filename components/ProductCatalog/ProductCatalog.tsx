'use client';

import { useState, useMemo } from 'react';
import ProductCard from '@/components/ProductCard/ProductCard';
import EmptyState from '../EmptyState/EmptyState';
import ProductFilters, { ProductFilterValues } from '@/components/ProductFilters/ProductFilters';
import { IProduct } from '@/types/IProduct';

interface ProductCatalogProps {
  products: IProduct[];
}

export default function ProductCatalog({ products }: ProductCatalogProps) {
  const [currentFilters, setCurrentFilters] = useState<ProductFilterValues>({
    categories: [],
    onlyAvailable: false,
    minPrice: '',
    maxPrice: '',
  });

  const categories = useMemo(
    () => Array.from(new Set(products.flatMap((product) => Object.values(product.labels)))),
    [products],
  );

  const filteredProducts = products.filter((product) => {
    const productCategories = Object.values(product.labels);
    const minPrice = Number(currentFilters.minPrice);
    const maxPrice = Number(currentFilters.maxPrice);

    const matchesCategory =
      currentFilters.categories.length === 0
        ? true
        : currentFilters.categories.some((category) => productCategories.includes(category));
    const matchesAvailability = !currentFilters.onlyAvailable ? true : product.available;
    const matchesMinPrice = !currentFilters.minPrice ? true : product.price_discount >= minPrice;
    const matchesMaxPrice = !currentFilters.maxPrice ? true : product.price_discount <= maxPrice;

    return matchesCategory && matchesAvailability && matchesMinPrice && matchesMaxPrice;
  });

  return (
    <>
      <ProductFilters categories={categories} onApply={setCurrentFilters} />

      {filteredProducts.length > 0 ? (
        <div className="cards">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <EmptyState message="По выбранным фильтрам товары не найдены." />
      )}
    </>
  );
}
