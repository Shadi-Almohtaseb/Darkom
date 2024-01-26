import { configureStore } from "@reduxjs/toolkit";
import authShopSlice from "./slices/authShopSlice";
import shopSlice from "./slices/shopSlice";
import categoriesSlice from "./slices/categoriesSlice";
import tagsSlice from "./slices/tagsSlice";
import productSlice from "./slices/productSlice";

const makeStore = () => {
  return configureStore({
    reducer: {
      authShop: authShopSlice,
      shop: shopSlice,
      product: productSlice,
      categories: categoriesSlice,
      tags: tagsSlice,
    },
  });
}

export const store = makeStore();

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

