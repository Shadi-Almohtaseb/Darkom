import { createSlice } from '@reduxjs/toolkit';
import { fetchShop } from '@/redux/thunks/shopThunks';

// let shop = localStorage.getItem('shop') ? JSON.parse(localStorage.getItem('shop') as string) : {}
let shop;
interface ShopState {
  shop: any
  isError: boolean;
  loading: boolean;
}

const initialState = {
  shop: shop ? shop : {},
  isError: false,
  loading: false,
} as ShopState;


const shopSlice = createSlice({
  name: 'shop',
  initialState,
  reducers: {
    reset: (state) => {
      state.loading = false
      state.isError = false
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchShop.fulfilled, (state, action) => {
      state.shop = action.payload.shop;
      state.loading = false;
      state.isError = false;
    })
    builder.addCase(fetchShop.pending, (state) => {
      state.loading = true;
      state.isError = false;
    })
    builder.addCase(fetchShop.rejected, (state, action) => {
      state.loading = false;
      state.isError = true;
    })
  }
});

export const { reset } = shopSlice.actions;
export default shopSlice.reducer;