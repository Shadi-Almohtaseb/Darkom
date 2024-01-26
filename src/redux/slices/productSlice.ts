import { createSlice } from "@reduxjs/toolkit";
import { fetchProducts } from "../thunks/productThunk";
import { ProductType } from "@/types/product";

const productSlice = createSlice({
  name: 'product',
  initialState: {
    products: [] as ProductType[],
    isError: false,
    loading: false,
  },
  reducers: {
    reset: (state) => {
      state.loading = false
      state.isError = false
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.products = action.payload.products;
      state.loading = false;
      state.isError = false;
    })
    builder.addCase(fetchProducts.pending, (state) => {
      state.loading = true;
      state.isError = false;
    })
    builder.addCase(fetchProducts.rejected, (state, action) => {
      state.loading = false;
      state.isError = true;
    })
  }
});

export const { reset } = productSlice.actions;
export default productSlice.reducer;
