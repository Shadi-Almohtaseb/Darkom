import { createSlice } from "@reduxjs/toolkit";
import { fetchCategories } from "../thunks/CategoriesThunk";

export type Category = {
  id: number;
  name: string;
  description: string;
  image: string;
};

const categorySlice = createSlice({
  name: 'categories',
  initialState: {
    categories: [] as Category[],
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
    builder.addCase(fetchCategories.fulfilled, (state, action) => {
      state.categories = action.payload.categories;
      state.loading = false;
      state.isError = false;
    })
    builder.addCase(fetchCategories.pending, (state) => {
      state.loading = true;
      state.isError = false;
    })
    builder.addCase(fetchCategories.rejected, (state, action) => {
      state.loading = false;
      state.isError = true;
    })
  }
});

export const { reset } = categorySlice.actions;
export default categorySlice.reducer;
