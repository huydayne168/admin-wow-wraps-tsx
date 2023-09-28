import { type } from "os";
import { Cart } from "./cart";
import { User } from "./user";
import { Product } from "./product";

export type Checkout = {
    products: [
        {
            _id: string;
            product: Product;
            quantity: number;
        }
    ];
    receiverName: string;
    address: string;
    phoneNumber: string;
    paymentMethod: string;
    status: string;
    user: User;
    _id: string;
};
