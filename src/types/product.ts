export type ProductType = {
    id?: number;
    name: string;
    short_description: string;
    long_description: string;
    tags: number[];
    images: string[];
    categories: number[];
    variants: ProductVariantType[];
    createdAt?: string;

}

export type ProductVariantType = {
    id?: number;
    color: string;
    originalPrice: number;
    discountPrice: number;
    stock_quantity: number;
    dimensions: ProductDimension;
    createdAt?: string;
}

export type ProductDimension = {
    length?: number;
    width?: number;
    height?: number;
}