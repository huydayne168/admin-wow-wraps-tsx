import { type } from "os";
import { User } from "./user";
import { Food } from "./food";

type FoodInCart = {
    food: Food;
    amount: number;
};

export type Cart = {
    _id: string;
    user: User;
    foods: FoodInCart[];
};
