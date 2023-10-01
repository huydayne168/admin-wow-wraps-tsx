import { type } from "os";
import { User } from "./user";
import { Product } from "./product";

type FoodInCart = {
    product: Product;
    quantity: number;
};

export type Cart = {
    _id: string;
    products: FoodInCart[];
};
