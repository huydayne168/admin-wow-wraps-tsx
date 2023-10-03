import { Product } from "./product";

export type FlashSale = {
    _id: string;
    name: string;
    discountPercent: number;
    start: string;
    end: string;
    products: Product[];
    isActive: boolean;
    isDelete: boolean;
};
