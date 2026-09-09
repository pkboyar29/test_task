'use client';

import ProductCard from '@/components/entities/Product/ProductCard/ProductCard';
import ProductCardSkeleton from '@/components/entities/Product/ProductCard/ProductCardSkeleton';
import EmptyState from '@/components/common/EmptyState/EmptyState';
import { useAppSelector } from '@/store/store';

export default function Favorites() {
  const { data: favorites, status: favoritesStatus } = useAppSelector((state) => state.favorites);
  const { status: cartStatus } = useAppSelector((state) => state.cart);
  const isStoreReady = favoritesStatus === 'ready' && cartStatus === 'ready';

  return (
    <>
      <h1 className="title">Избранное</h1>

      {!isStoreReady ? (
        <ProductCardSkeleton />
      ) : favorites.length === 0 ? (
        <EmptyState message="В избранном пока нет товаров." />
      ) : (
        <div className="cards">
          {favorites.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </>
  );
}
