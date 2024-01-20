import { API_BASE_URL } from "./baseURL";

export const shopApiUrls = {
    getShopRoute: (shopId: string) => `${API_BASE_URL}/shops/${shopId}`,
    signupShopRoute: `${API_BASE_URL}/shops/signup`,
    activateShopRoute: `${API_BASE_URL}/shops/activation`,
    loginShopRoute: `${API_BASE_URL}/shops/login`,
};
