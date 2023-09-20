import { createSlice, configureStore } from "@reduxjs/toolkit";

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

////// Authentication store:
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

const store = configureStore({
    reducer: {
        authentication: authentication.reducer,
        tagsSlice: tagsSlice.reducer,
    },
});
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
// export type AppThunk<ReturnType = void> = ThunkAction<
//     ReturnType,
//     RootState,
//     unknown,
//     Action<string>
// >;
export default store;
