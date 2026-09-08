'use client';

import { useEffect, useState } from 'react';
import ProductCard from '@/components/ProductCard/ProductCard';
import ProductCardSkeleton from '@/components/ProductCard/ProductCardSkeleton';
import EmptyState from '@/components/EmptyState/EmptyState';
import { useAppSelector } from '@/store/store';

export default function Favorites() {
  const { data: favorites, status } = useAppSelector((state) => state.favorites);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // TODO: temporary
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMounted(true);
  }, []);

  return (
    <>
      <h1 className="title">Избранное</h1>

      {!isMounted || status === 'idle' ? (
        <ProductCardSkeleton count={4} />
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
