import { createSlice, configureStore } from "@reduxjs/toolkit";
import { Product } from "../models/product";
import { type } from "os";
import { Checkout } from "../models/checkout";
import { Tag } from "../models/tag";

////// Navigation Slice:
const navigationInit = localStorage.getItem("navigationState") || "dash-board";

const navigationSlice = createSlice({
    name: "navigation",
    initialState: navigationInit,
    reducers: {
        setNavigationState(state, action) {
            localStorage.setItem("navigationState", action.payload);
            return (state = action.payload);
        },
    },
});

export const navigationActions = navigationSlice.actions;

////// Loading State:
const loadingInit = false;

const loadingSlice = createSlice({
    name: "loading",
    initialState: loadingInit,
    reducers: {
        setLoading(state, action) {
            return (state = action.payload);
        },
    },
});

export const loadingActions = loadingSlice.actions;

////// Authentication store:
const id = localStorage.getItem("currentUserId");
let authInit = {
    _id: id || "",
    accessToken: "",
};

const authentication = createSlice({
    name: "authentication",
    initialState: authInit,
    reducers: {
        storeUser(state, action) {
            localStorage.setItem("currentUserId", action.payload._id);
            return (state = {
                _id: action.payload._id,
                accessToken: action.payload.accessToken,
            });
        },

        storeNewAccessToken(state, action) {
            const newState = { ...state, accessToken: action.payload };
            return (state = newState);
        },

        logout(state) {
            state = {
                _id: "",
                accessToken: "",
            };
            localStorage.removeItem("currentUserId");
        },
    },
});

export const authActions = authentication.actions;

////// Tags store:
type TagsSlice = {
    allTags: Tag[];
    choseTags: Tag[];
};

let tagsInit: TagsSlice = {
    allTags: [],
    choseTags: [],
};

const tagsSlice = createSlice({
    name: "tagsSlice",
    initialState: tagsInit,
    reducers: {
        fetchAllTags(state, action) {
            state.allTags = action.payload;
        },
    },
});

export const tagsActions = tagsSlice.actions;

////// Products store: (this slice is used too manage products and sort products)

const intiProducts: Product[] = [];

const productsSlice = createSlice({
    name: "products",
    initialState: intiProducts,
    reducers: {
        setProducts(state, action) {
            return (state = action.payload);
        },

        deleteProduct(state, action) {
            const newState = state.filter(
                (product) => product._id !== action.payload
            );
            return (state = newState);
        },
    },
});

export const productsAction = productsSlice.actions;

////// checkouts store: (this slice is used too manage checkouts and sort checkouts)
const intiCheckouts: Checkout[] = [];

const checkoutsSlice = createSlice({
    name: "checkouts",
    initialState: intiCheckouts,
    reducers: {
        setCheckouts(state, action) {
            return (state = action.payload);
        },

        deleteCheckout(state, action) {
            const newState = state.filter(
                (checkout) => checkout._id !== action.payload
            );
            return (state = newState);
        },

        updateStatus(state, action) {
            const newState = state.map((checkout) => {
                if (checkout._id === action.payload.checkout._id) {
                    return { ...checkout, status: action.payload.status };
                }
                return checkout;
            });
            return newState;
        },
    },
});

export const checkoutsAction = checkoutsSlice.actions;

const store = configureStore({
    reducer: {
        navigation: navigationSlice.reducer,
        loading: loadingSlice.reducer,
        authentication: authentication.reducer,
        tagsSlice: tagsSlice.reducer,
        products: productsSlice.reducer,
        checkouts: checkoutsSlice.reducer,
    },
});
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
