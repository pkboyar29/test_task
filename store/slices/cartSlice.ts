import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ICartItem } from '@/types/ICartItem';
import { IProduct } from '@/types/IProduct';

interface CartState {
  data: ICartItem[];
  status: 'idle' | 'ready';
}

const initialState: CartState = {
  data: [],
  status: 'idle',
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<IProduct>) {
      const isAlreadyInCart = state.data.some(({ product: { id } }) => id === action.payload.id);

      if (!isAlreadyInCart) {
        state.data.push({ product: action.payload, quantity: 1 });
      }
    },
    incrementQuantity(state, action: PayloadAction<number>) {
      const item = state.data.find(({ product }) => product.id === action.payload);
      if (item) {
        item.quantity += 1;
      }
    },
    decrementQuantity(state, action: PayloadAction<number>) {
      const item = state.data.find(({ product }) => product.id === action.payload);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
      }
    },
    removeFromCart(state, action: PayloadAction<number>) {
      state.data = state.data.filter(({ product: { id } }) => id !== action.payload);
    },
    setCartItems(state, action: PayloadAction<ICartItem[]>) {
      state.data = action.payload;
    },
    setCartReady(state) {
      state.status = 'ready';
    },
  },
});

export const {
  addToCart,
  incrementQuantity,
  decrementQuantity,
  removeFromCart,
  setCartItems,
  setCartReady,
} = cartSlice.actions;
export default cartSlice.reducer;
