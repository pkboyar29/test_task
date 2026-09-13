'use client';

import { useState, useMemo } from 'react';
import { useAppSelector } from '@/store/store';
import ProductCard from '@/components/entities/Product/ProductCard/ProductCard';
import ProductCardSkeleton from '@/components/entities/Product/ProductCard/ProductCardSkeleton';
import EmptyState from '../../../common/EmptyState/EmptyState';
import Pagination from '@/components/common/Pagination/Pagination';
import ProductFilters, {
  ProductFilterValuesType,
} from '@/components/entities/Product/ProductFilters/ProductFilters';
import ProductSort, {
  ProductSortValueType,
} from '@/components/entities/Product/ProductSort/ProductSort';
import ProductSearch from '@/components/entities/Product/ProductSearch/ProductSearch';
import { IProduct } from '@/types/IProduct';
import { filterProducts } from '../../../../lib/filterProducts';
import { sortProducts } from '../../../../lib/sortProducts';

interface ProductCatalogProps {
  products: IProduct[];
  itemsCount: number;
  pageCount: number;
  currentPage: number;
}

export default function ProductCatalog({
  products,
  itemsCount,
  pageCount,
  currentPage,
}: ProductCatalogProps) {
  const favoritesStatus = useAppSelector((state) => state.favorites.status);
  const cartStatus = useAppSelector((state) => state.cart.status);
  const isStoreReady = favoritesStatus === 'ready' && cartStatus === 'ready';

  const [filters, setFilters] = useState<ProductFilterValuesType>({
    categories: [],
    onlyAvailable: false,
    minPrice: '',
    maxPrice: '',
    searchQuery: '',
  });
  const [sort, setSort] = useState<ProductSortValueType>('default');

  const categories = useMemo(
    () => Array.from(new Set(products.flatMap((product) => Object.values(product.labels)))),
    [products],
  );

  const filteredProducts = filterProducts(products, filters);
  const sortedProducts = sortProducts(filteredProducts, sort);

  return (
    <>
      <ProductFilters categories={categories} onApply={setFilters} />
      <div className="catalog-toolbar">
        <ProductSearch
          onSearch={(newSearchQuery) => {
            setFilters((prev) => ({ ...prev, searchQuery: newSearchQuery }));
          }}
        />
        <ProductSort value={sort} onChange={setSort} />
      </div>

      {!isStoreReady ? (
        <ProductCardSkeleton />
      ) : sortedProducts.length > 0 ? (
        <div className="cards">
          {sortedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <EmptyState message="По выбранным фильтрам товары не найдены." />
      )}

      <Pagination itemsCount={itemsCount} pageCount={pageCount} currentPage={currentPage} />
    </>
  );
}
