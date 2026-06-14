import { configureStore, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchContentMock } from './api';

export const fetchContent = createAsyncThunk('content/fetchContent', async (shouldFail) => {
  const data = await fetchContentMock(shouldFail);
  return data;
});

const contentSlice = createSlice({
  name: 'content',
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchContent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchContent.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchContent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Something went wrong.';
      });
  },
});

export const store = configureStore({
  reducer: {
    content: contentSlice.reducer,
  },
});
