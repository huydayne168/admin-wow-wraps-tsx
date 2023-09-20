import { type } from "os";

export type User = {
    _id: string;
    userName: string;
    email: string;
    password: string;
    refreshToken: string;
    roles: string[];
};
