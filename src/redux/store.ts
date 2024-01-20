import { configureStore } from "@reduxjs/toolkit";
import authShopSlice from "./slices/authShopSlice";
import shopSlice from "./slices/shopSlice";

const makeStore = () => {
  return configureStore({
    reducer: {
      authShop: authShopSlice,
      shop: shopSlice,
    },
  });
}

export const store = makeStore();

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

