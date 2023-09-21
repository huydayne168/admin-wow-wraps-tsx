import { createSlice, configureStore } from "@reduxjs/toolkit";
import { Product } from "../models/product";
import { type } from "os";

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
            const newState = { ...state, ...action.payload.accessToken };
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
    allTags: string[];
    choseTags: string[];
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
        chooseThisTag(state, action) {
            const tag: string = action.payload;
            if (tag) {
                state.choseTags.push(tag);
            }
        },
        deleteThisChoseTag(state, action) {
            const data: string = action.payload;
            if (data) {
                const newChoseTags = state.choseTags.filter((tag) => {
                    return tag !== data;
                });
                state.choseTags = newChoseTags;
            }
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

        sortByRate(state, action) {
            switch (action.payload) {
                case "HIGH_RATE":
                    return state.sort(
                        (a, b) => Number(b.rate) - Number(a.rate)
                    );
                case "LOW_RATE":
                    return state.sort(
                        (a, b) => Number(a.rate) - Number(b.rate)
                    );
                default:
                    break;
            }
        },

        search(state, action) {
            const searchPart: string = action.payload.searchPart;
            const searchInputValue = action.payload.searchInputValue;
            console.log(searchInputValue);

            if (searchInputValue === "") return state;
            const result = state.filter((product: any) => {
                return product[searchPart].includes(searchInputValue);
            });
            return (state = result);
        },
    },
});

export const productsAction = productsSlice.actions;

const store = configureStore({
    reducer: {
        navigation: navigationSlice.reducer,
        loading: loadingSlice.reducer,
        authentication: authentication.reducer,
        tagsSlice: tagsSlice.reducer,
        products: productsSlice.reducer,
    },
});
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
