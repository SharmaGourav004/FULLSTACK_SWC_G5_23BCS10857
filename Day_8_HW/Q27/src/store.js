import { configureStore, createSlice } from '@reduxjs/toolkit';

const catalog = [
  { id: 1, name: 'Noise Smart Watch', price: 2999 },
  { id: 2, name: 'Wireless Earbuds', price: 1599 },
  { id: 3, name: 'Laptop Stand', price: 899 },
  { id: 4, name: 'Mechanical Keyboard', price: 3499 },
];

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: catalog.map((item) => ({ ...item, quantity: 1 })),
    cart: [],
  },
  reducers: {
    addToCart(state, action) {
      const existing = state.cart.find((item) => item.id === action.payload.id);
      if (existing) {
        existing.quantity += 1;
      } else {
        state.cart.push({ ...action.payload, quantity: 1 });
      }
    },
    removeFromCart(state, action) {
      state.cart = state.cart.filter((item) => item.id !== action.payload);
    },
    updateQuantity(state, action) {
      const { id, quantity } = action.payload;
      const item = state.cart.find((entry) => entry.id === id);
      if (item) {
        item.quantity = Math.max(1, Number(quantity) || 1);
      }
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity } = cartSlice.actions;

export const store = configureStore({
  reducer: {
    cart: cartSlice.reducer,
  },
});

export const products = catalog;
