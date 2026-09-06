'use client';

import { ReactNode, useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import { setFavorites } from '@/store/slices/favoritesSlice';
import { store, useAppDispatch, useAppSelector } from '@/store/store';
import { isProductValid } from '@/helpers/isProductValid';

const FAVORITES_LS_KEY = 'favorites';

function FavoritesPersistence() {
  const dispatch = useAppDispatch();
  const favorites = useAppSelector((state) => state.favorites.data);
  const [isRestored, setIsRestored] = useState(false);

  useEffect(() => {
    try {
      const favoritesLS = localStorage.getItem(FAVORITES_LS_KEY);
      if (favoritesLS) {
        const parsedFavorites: unknown = JSON.parse(favoritesLS);

        if (Array.isArray(parsedFavorites)) {
          dispatch(setFavorites(parsedFavorites.filter(isProductValid)));
        }
      }
    } catch {
      localStorage.removeItem(FAVORITES_LS_KEY);
    } finally {
      setIsRestored(true);
    }
  }, [dispatch]);

  useEffect(() => {
    if (!isRestored) {
      return;
    }

    localStorage.setItem(FAVORITES_LS_KEY, JSON.stringify(favorites));
  }, [isRestored, favorites]);

  return null;
}

export default function StoreProvider({ children }: { children: ReactNode }) {
  return (
    <Provider store={store}>
      <FavoritesPersistence />
      {children}
    </Provider>
  );
}
