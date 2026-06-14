import { configureStore, createSlice } from '@reduxjs/toolkit';

const products = [
  { id: 1, name: 'Smart TV', category: 'Electronics', price: 49999, rating: 4.6 },
  { id: 2, name: 'Running Shoes', category: 'Fashion', price: 3499, rating: 4.2 },
  { id: 3, name: 'Wooden Desk', category: 'Furniture', price: 12999, rating: 4.5 },
  { id: 4, name: 'Bluetooth Speaker', category: 'Electronics', price: 2599, rating: 4.1 },
  { id: 5, name: 'Coffee Table', category: 'Furniture', price: 8999, rating: 4.7 },
  { id: 6, name: 'Denim Jacket', category: 'Fashion', price: 2799, rating: 4.0 },
];

const storedFilters = JSON.parse(localStorage.getItem('productFilters') || 'null');

const filterSlice = createSlice({
  name: 'filters',
  initialState: storedFilters || {
    category: 'All',
    minPrice: 0,
    maxPrice: 50000,
    rating: 0,
  },
  reducers: {
    setCategory(state, action) {
      state.category = action.payload;
    },
    setMinPrice(state, action) {
      state.minPrice = Number(action.payload);
    },
    setMaxPrice(state, action) {
      state.maxPrice = Number(action.payload);
    },
    setRating(state, action) {
      state.rating = Number(action.payload);
    },
    resetFilters(state) {
      state.category = 'All';
      state.minPrice = 0;
      state.maxPrice = 50000;
      state.rating = 0;
    },
  },
});

export const { setCategory, setMinPrice, setMaxPrice, setRating, resetFilters } = filterSlice.actions;

export const store = configureStore({
  reducer: {
    filters: filterSlice.reducer,
  },
});

store.subscribe(() => {
  localStorage.setItem('productFilters', JSON.stringify(store.getState().filters));
});

export { products };
