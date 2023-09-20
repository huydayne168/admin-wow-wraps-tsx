import { type } from "os";
import { User } from "./user";
import { Product } from "./product";

type FoodInCart = {
    food: Product;
    amount: number;
};

export type Cart = {
    _id: string;
    user: User;
    foods: FoodInCart[];
};
