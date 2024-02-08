import { createAsyncThunk } from "@reduxjs/toolkit";
import { TagsApiUrls } from "@/api/tagApi";
const { getAllTags, createTagAPI } = TagsApiUrls;

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

export const createTag = createAsyncThunk('create-tag', async (tag: FormData, { rejectWithValue }) => {
  try {
    const response = await fetch(createTagAPI, {
      method: 'POST',
      body: tag
    });
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      const errorData = await response.json();
      const errorMessage = errorData.error || 'An error occurred';
      throw errorMessage
    }
  } catch (error) {
    return rejectWithValue(error)
  }
});
