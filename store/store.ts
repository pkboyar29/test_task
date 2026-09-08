import { configureStore, combineReducers, createSelector } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import favoritesReducer from './slices/favoritesSlice';
import cartReducer from './slices/cartSlice';

const rootReducer = combineReducers({
  favorites: favoritesReducer,
  cart: cartReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();

const selectFavorites = (state: RootState) => state.favorites.data;
const selectCartItems = (state: RootState) => state.cart.data;
const selectProductId = (_state: RootState, productId: number) => productId;

export const selectIsFavorite = createSelector(
  [selectFavorites, selectProductId],
  (favorites, productId) => favorites.some((favorite) => favorite.id === productId),
);

export const selectIsInCart = createSelector(
  [selectCartItems, selectProductId],
  (cartItems, productId) => cartItems.some(({ product }) => product.id === productId),
);
