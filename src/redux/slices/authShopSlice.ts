import { createSlice } from '@reduxjs/toolkit';
import { activateShop, loginShop, logoutShop, signupShop } from '@/redux/thunks/shopThunks';

const isServer = typeof window === 'undefined';

const initialState = {
  shop: !isServer && localStorage.getItem('shop') ? JSON.parse(localStorage.getItem('shop') as string) : {},
  token: null,
  isError: false,
  loading: false,
} as any;
const authShopSlice = createSlice({
  name: 'authShop',
  initialState,
  reducers: {
    reset: (state) => {
      state.loading = false
      state.isError = false
    },
  },
  extraReducers: (builder) => {
    // Reducers for signupShop action
    builder.addCase(signupShop.fulfilled, (state, action) => {
      state.shop = action.payload.shop
      state.token = action.payload.token;
      state.loading = false;
      state.isError = false
    });
    builder.addCase(signupShop.pending, (state) => {
      state.loading = true;
      state.isError = false;
    });
    builder.addCase(signupShop.rejected, (state) => {
      state.loading = false;
      state.isError = true
    });

    // Reducers for activateShop action
    builder.addCase(activateShop.fulfilled, (state, action) => {
      state.shop = action.payload.shop
      state.token = action.payload.token;
      state.loading = false;
      state.isError = false
    });
    builder.addCase(activateShop.pending, (state) => {
      state.loading = true;
      state.isError = false;
    });
    builder.addCase(activateShop.rejected, (state) => {
      state.loading = false;
      state.isError = true
    });

    // Reducers for loginShop action
    builder.addCase(loginShop.fulfilled, (state, action) => {
      state.shop = action.payload.shop
      state.token = action.payload.token;
      state.loading = false;
      state.isError = false
    });
    builder.addCase(loginShop.pending, (state) => {
      state.loading = true;
      state.isError = false;
    });
    builder.addCase(loginShop.rejected, (state) => {
      state.loading = false;
      state.isError = true
    });

    // Reducers for logoutShop action
    builder.addCase(logoutShop.fulfilled, (state) => {
      state.shop = {};
      state.token = null;
      state.loading = false;
      state.isError = false
    });
    builder.addCase(logoutShop.pending, (state) => {
      state.loading = true;
      state.isError = false;
    });
    builder.addCase(logoutShop.rejected, (state) => {
      state.loading = false;
      state.isError = true
    });
  }
});

export const { reset } = authShopSlice.actions;
export default authShopSlice.reducer;