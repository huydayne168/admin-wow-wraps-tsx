import { type } from "os";
import { Cart } from "./cart";
import { Checkout } from "./checkout";

export type User = {
    _id: string;
    userName: string;
    email: string;
    password: string;
    phoneNumber: string;
    refreshToken?: string;
    roleId: any;
    cart: Cart[];
    checkout: Checkout[];
};
