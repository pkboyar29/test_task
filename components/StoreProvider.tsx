'use client';

import { ReactNode, useEffect } from 'react';
import { Provider } from 'react-redux';
import { setFavorites, setFavoritesReady } from '@/store/slices/favoritesSlice';
import { store, useAppDispatch, useAppSelector } from '@/store/store';
import { isProductValid } from '@/helpers/isProductValid';

const FAVORITES_LS_KEY = 'favorites';

function FavoritesPersistence() {
  const dispatch = useAppDispatch();
  const { data: favorites, status } = useAppSelector((state) => state.favorites);

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
      dispatch(setFavoritesReady());
    }
  }, [dispatch]);

  useEffect(() => {
    if (status === 'idle') {
      return;
    }

    localStorage.setItem(FAVORITES_LS_KEY, JSON.stringify(favorites));
  }, [status, favorites]);

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
