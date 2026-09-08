'use client';

import { useEffect, useState, useMemo } from 'react';
import { useAppSelector } from '@/store/store';
import ProductCard from '@/components/ProductCard/ProductCard';
import ProductCardSkeleton from '@/components/ProductCard/ProductCardSkeleton';
import EmptyState from '../EmptyState/EmptyState';
import ProductFilters, {
  ProductFilterValuesType,
} from '@/components/ProductFilters/ProductFilters';
import ProductSort, { ProductSortValueType } from '@/components/ProductSort/ProductSort';
import ProductSearch from '@/components/ProductSearch/ProductSearch';
import { IProduct } from '@/types/IProduct';
import { filterProducts } from '../../helpers/filterProducts';
import { sortProducts } from '../../helpers/sortProducts';

interface ProductCatalogProps {
  products: IProduct[];
}

export default function ProductCatalog({ products }: ProductCatalogProps) {
  const [isMounted, setIsMounted] = useState(false);
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

  useEffect(() => {
    // TODO: temporary
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMounted(true);
  }, []);

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
      <div className="catalog-toolbar">
        <ProductSearch
          onSearch={(newSearchQuery) => {
            setFilters((prev) => ({ ...prev, searchQuery: newSearchQuery }));
          }}
        />
        <ProductSort value={sort} onChange={setSort} />
      </div>

      {!isMounted || !isStoreReady ? (
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
    </>
  );
}
