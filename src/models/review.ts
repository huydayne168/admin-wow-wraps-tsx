import { type } from "os";
import { User } from "./user";

export type Review = {
    _id: string;
    date: string;
    comment: string;
    ratePoint: number;
    user: User;
};
