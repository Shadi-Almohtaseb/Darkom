export type ShopAuth = {
    id?: string;
    shopName: string;
    email: string;
    password: string;
    phoneNumber: string
    createdAt?: string;
}

export type ShopLogin = {
    email: string;
    password: string;
}

export type OTPShop = {
    email: string;
    otp: string;
}