import { createAsyncThunk } from "@reduxjs/toolkit";
import { CategoriesApiUrls } from "@/api/categoryApi";
const { getAllCategories } = CategoriesApiUrls;

export const fetchCategories = createAsyncThunk('get-categories', async () => {
    try {
        const response = await fetch(getAllCategories, { method: 'GET' });
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
