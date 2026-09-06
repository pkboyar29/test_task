import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IProduct } from '@/types/IProduct';

interface FavoritesState {
  data: IProduct[];
}

const initialState: FavoritesState = {
  data: [],
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addFavorite(state, action: PayloadAction<IProduct>) {
      const isAlreadyFavorite = state.data.some(({ id }) => id === action.payload.id);

      if (!isAlreadyFavorite) {
        state.data.push(action.payload);
      }
    },
    removeFavorite(state, action: PayloadAction<number>) {
      state.data = state.data.filter(({ id }) => id !== action.payload);
    },
    setFavorites(state, action: PayloadAction<IProduct[]>) {
      state.data = action.payload;
    },
  },
});

export const { addFavorite, removeFavorite, setFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;
