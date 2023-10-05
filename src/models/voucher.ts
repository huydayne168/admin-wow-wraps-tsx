import { type } from "os";

export type Voucher = {
    _id: string;
    code: string;
    discountPercent: number;
    quantity: number;
    isActive: boolean;
    end: string;
};
