import { type } from "os";
import { Review } from "./review";
export type Product = {
    name: string;
    _id: string;
    amount: number;
    price: number;
    rate: number;
    shortDescription: string;
    longDescription: string;
    category: {
        _id: string;
        name: string;
    };
    tags: [
        {
            _id: string;
            name: string;
        }
    ];
    reviews: Review[];
    image: any;
};
