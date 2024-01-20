import { createAsyncThunk } from '@reduxjs/toolkit';
import { shopApiUrls } from '@/api/shopApi';
import { OTPShop, ShopAuth, ShopLogin } from '@/types/shop';
const { getShopRoute, signupShopRoute, activateShopRoute, loginShopRoute } = shopApiUrls;

export const fetchShop = createAsyncThunk('get-shop', async (shopId: string, { rejectWithValue }) => {
  try {
    const response = await fetch(getShopRoute(shopId), { method: 'GET' });
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

export const signupShop = createAsyncThunk('signup-shop', async (payload: ShopAuth, { rejectWithValue }) => {
  try {
    const response = await fetch(signupShopRoute, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    if (response.ok) {
      const data = await response.json();
      let shopData = {
        shop_id: data.shop.shop_id,
        email: data.shop.email,
        shopName: data.shop.shopName,
        avatar: data.shop.avatar
      };
      localStorage.setItem("shop", JSON.stringify(shopData));
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

export const activateShop = createAsyncThunk(
  'activate-shop',
  async (payload: OTPShop, { rejectWithValue }) => {
    try {
      const response = await fetch(activateShopRoute, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const data = await response.json();
        let shopData = {
          shop_id: data.shop.shop_id,
          email: data.shop.email,
          shopName: data.shop.shopName,
          avatar: data.shop.avatar
        };
        localStorage.setItem("shop", JSON.stringify(shopData));
        return data;
      } else {
        const errorData = await response.json();
        const errorMessage = errorData.error || 'An error occurred';
        throw errorMessage
      }
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const loginShop = createAsyncThunk('login-shop', async (payload: ShopLogin, { rejectWithValue }) => {
  try {
    const response = await fetch(loginShopRoute, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    if (response.ok) {
      const data = await response.json();
      let shopData = {
        shop_id: data.shop.shop_id,
        email: data.shop.email,
        shopName: data.shop.shopName,
        avatar: data.shop.avatar
      };
      localStorage.setItem("shop", JSON.stringify(shopData));
      return data;
    } else {
      const errorData = await response.json();
      const errorMessage = errorData.error || 'An error occurred';
      throw errorMessage
    }
  } catch (error) {
    return rejectWithValue(error);
  }
})

export const logoutShop = createAsyncThunk('logout-shop', async (shopId: string, { rejectWithValue }) => {
  try {
    const response = await fetch(getShopRoute(shopId), { method: 'GET' });
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