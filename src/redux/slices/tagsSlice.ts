import { createSlice } from "@reduxjs/toolkit";
import { createTag, fetchTags } from "../thunks/tagsThunk";

export type Tag = {
  id?: number;
  name: string;
};

const tagSlice = createSlice({
  name: 'tags',
  initialState: {
    tags: [] as Tag[],
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
    builder.addCase(fetchTags.fulfilled, (state, action) => {
      state.tags = action.payload.tags;
      state.loading = false;
      state.isError = false;
    })
    builder.addCase(fetchTags.pending, (state) => {
      state.loading = true;
      state.isError = false;
    })
    builder.addCase(fetchTags.rejected, (state, action) => {
      state.loading = false;
      state.isError = true;
    })
    // create Tag
    builder.addCase(createTag.fulfilled, (state, action) => {
      state.tags.push(action.payload.tag);
      state.loading = false;
      state.isError = false;
    })
    builder.addCase(createTag.pending, (state) => {
      state.loading = true;
      state.isError = false;
    })
    builder.addCase(createTag.rejected, (state, action) => {
      state.loading = false;
      state.isError = true;
    })
  }
});

export const { reset } = tagSlice.actions;
export default tagSlice.reducer;
