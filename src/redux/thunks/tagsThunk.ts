import { createAsyncThunk } from "@reduxjs/toolkit";
import { TagsApiUrls } from "@/api/tagApi";
const { getAllTags } = TagsApiUrls;

export const fetchTags = createAsyncThunk('get-tags', async () => {
  try {
    const response = await fetch(getAllTags, { method: 'GET' });
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      const errorData = await response.json();
      const errorMessage = errorData.error || 'An error occurred';
      throw errorMessage
    }
  } catch (error) {
    return error
  }
});
