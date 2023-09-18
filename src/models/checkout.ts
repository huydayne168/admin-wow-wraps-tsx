import { type } from "os";
import { Cart } from "./cart";
import { User } from "./user";

export type Checkout = {
    carts: Cart[];
    user: User;
    _id: string;
};
