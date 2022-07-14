import { configureStore } from "@reduxjs/toolkit";
import newsReducer from './features/newsReducer'
import usersReducer from './features/usersReducer'
import categoriesReducer from './features/categoriesReducer'
import commentsReducer from "./features/commentsReducer";

export const store = configureStore({
    reducer: {
        news: newsReducer,
        users: usersReducer,
        comments: commentsReducer,
        categories: categoriesReducer,
    }
})