'use client';

import { ReactNode, useEffect } from 'react';
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
      localStorage.setItem(FAVORITES_LS_KEY, JSON.stringify([]));
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

function CartPersistence() {
  const dispatch = useAppDispatch();
  const { data: cartItems, status } = useAppSelector((state) => state.cart);

  useEffect(() => {
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
  }, [dispatch]);

  useEffect(() => {
    if (status === 'idle') {
      return;
    }

    localStorage.setItem(CART_LS_KEY, JSON.stringify(cartItems));
  }, [status, cartItems]);

  return null;
}

export default function StoreProvider({ children }: { children: ReactNode }) {
  return (
    <Provider store={store}>
      <FavoritesPersistence />
      <CartPersistence />
      {children}
    </Provider>
  );
}
