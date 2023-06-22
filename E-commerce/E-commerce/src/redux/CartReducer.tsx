import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../pages/types/Types';

interface CartState {
  cartItems: Product[];
}

const initialState: CartState = {
  cartItems: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      const item = state.cartItems.find((item) => item.id === action.payload.id);
      if (item) {
        item.amount += 1;
      } else {
        state.cartItems.push({ ...action.payload, amount: 1 });
      }
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      const itemId = action.payload;
      state.cartItems = state.cartItems.filter((item) => item.id !== itemId);
    },
    updateCartItemQuantity: (state, action: PayloadAction<{ itemId: number; quantity: number }>) => {
      const { itemId, quantity } = action.payload;
      const item = state.cartItems.find((item) => item.id === itemId);
      if (item) {
        item.amount += quantity;
        if (item.amount === 0) {
          state.cartItems = state.cartItems.filter((item) => item.id !== itemId);
        }
      }
    },
    resetCart: (state) => {
      state.cartItems = [];
    },
  },
});

export const { addToCart, removeFromCart, updateCartItemQuantity, resetCart } = cartSlice.actions;

export default cartSlice.reducer;
