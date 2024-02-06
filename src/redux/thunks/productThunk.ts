import { createAsyncThunk } from "@reduxjs/toolkit";
import { productApiUrls } from "@/api/productApi";
import { ProductType } from "@/types/product";
const { getAllProduct, createProduct } = productApiUrls;

export const fetchProducts = createAsyncThunk('get-products', async () => {
  try {
    const response = await fetch(getAllProduct, { method: 'GET' });
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

export const addProduct = createAsyncThunk('add-product', async (payload: any, { rejectWithValue }) => {
  try {
    const token = document?.cookie
      .split('; ')
      .find(row => row.startsWith('_auth'))
      ?.split('=')[1] ?? '';

    const response = await fetch(createProduct, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      body: payload
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
    return rejectWithValue(error);
  }
});