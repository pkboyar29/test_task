'use client';

import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import { setFavorites, setFavoritesReady } from '@/store/slices/favoritesSlice';
import { setCartItems, setCartReady } from '@/store/slices/cartSlice';
import { store, useAppDispatch, useAppSelector } from '@/store/store';
import { isProductValid } from '@/lib/isProductValid';
import { isCartItemValid } from '@/lib/isCartItemValid';
import { readArrayFromLS } from '@/lib/readArrayFromLS';
import { ICartItem } from '@/types/ICartItem';
import { IProduct } from '@/types/IProduct';

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

    const favoritesFromLS = readArrayFromLS<IProduct>(FAVORITES_LS_KEY, isProductValid);
    dispatch(setFavorites(favoritesFromLS));
    dispatch(setFavoritesReady());
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

    const cartFromLS = readArrayFromLS<ICartItem>(CART_LS_KEY, isCartItemValid);
    dispatch(setCartItems(cartFromLS));
    dispatch(setCartReady());
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
