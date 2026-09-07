import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IProduct } from '@/types/IProduct';

interface FavoritesState {
  data: IProduct[];
  status: 'idle' | 'ready';
}

const initialState: FavoritesState = {
  data: [],
  status: 'idle',
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
    setFavoritesReady(state) {
      state.status = 'ready';
    },
  },
});

export const { addFavorite, removeFavorite, setFavorites, setFavoritesReady } =
  favoritesSlice.actions;
export default favoritesSlice.reducer;
