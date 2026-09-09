'use client';

import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import { setFavorites, setFavoritesReady } from '@/store/slices/favoritesSlice';
import { setCartItems, setCartReady } from '@/store/slices/cartSlice';
import { store, useAppDispatch, useAppSelector } from '@/store/store';
import { isProductValid } from '@/helpers/isProductValid';
import { isCartItemValid } from '@/helpers/isCartItemValid';

const FAVORITES_LS_KEY = 'favorites';
const CART_LS_KEY = 'cart';

function FavoritesPersistence() {
  const dispatch = useAppDispatch();
  const { data: favorites, status } = useAppSelector((state) => state.favorites);

  const isHydrated = useHydrated();

  useEffect(() => {
    if (!isHydrated) {
      return;
    }

    try {
      const favoritesLS = localStorage.getItem(FAVORITES_LS_KEY);
      if (favoritesLS) {
        const parsedFavorites: unknown = JSON.parse(favoritesLS);

        if (Array.isArray(parsedFavorites)) {
          dispatch(setFavorites(parsedFavorites.filter(isProductValid)));
        }
      }
    } catch {
      localStorage.setItem(FAVORITES_LS_KEY, JSON.stringify([]));
    } finally {
      dispatch(setFavoritesReady());
    }
  }, [dispatch, isHydrated]);

  useEffect(() => {
    if (status === 'idle') {
      return;
    }

    localStorage.setItem(FAVORITES_LS_KEY, JSON.stringify(favorites));
  }, [status, favorites]);

  return null;
}

function CartPersistence() {
  const dispatch = useAppDispatch();
  const { data: cartItems, status } = useAppSelector((state) => state.cart);

  const isHydrated = useHydrated();

  useEffect(() => {
    if (!isHydrated) {
      return;
    }

    try {
      const cartLS = localStorage.getItem(CART_LS_KEY);
      if (cartLS) {
        const parsedCart: unknown = JSON.parse(cartLS);

        if (Array.isArray(parsedCart)) {
          dispatch(setCartItems(parsedCart.filter(isCartItemValid)));
        }
      }
    } catch {
      localStorage.setItem(CART_LS_KEY, JSON.stringify([]));
    } finally {
      dispatch(setCartReady());
    }
  }, [dispatch, isHydrated]);

  useEffect(() => {
    if (status === 'idle') {
      return;
    }

    localStorage.setItem(CART_LS_KEY, JSON.stringify(cartItems));
  }, [status, cartItems]);

  return null;
}

const HydrationContext = createContext(false);
export function useHydrated() {
  return useContext(HydrationContext);
}

export default function StoreProvider({ children }: { children: ReactNode }) {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsHydrated(true);
  }, []);

  return (
    <Provider store={store}>
      <HydrationContext.Provider value={isHydrated}>
        <FavoritesPersistence />
        <CartPersistence />
        {children}
      </HydrationContext.Provider>
    </Provider>
  );
}
