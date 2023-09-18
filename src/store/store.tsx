import { createSlice, configureStore } from "@reduxjs/toolkit";
import { User } from "../models/user";
import http from "../utils/http";

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
            console.log(action.payload._id);
            localStorage.setItem(
                "currentUserId",
                JSON.stringify(action.payload._id)
            );
            return (state = {
                _id: action.payload._id,
                accessToken: action.payload.accessToken,
            });
        },

        storeNewAccessToken(state, action) {
            const newState = { ...state, ...action.payload.accessToken };
            return (state = newState);
        },
    },
});

export const authActions = authentication.actions;

const store = configureStore({
    reducer: {
        authentication: authentication.reducer,
    },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
