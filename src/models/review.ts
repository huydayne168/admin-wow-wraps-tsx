import { type } from "os";
import { User } from "./user";

export type Review = {
    _id: string;
    date: string;
    reviewContent: string;
    rate: number;
    user: User;
};
