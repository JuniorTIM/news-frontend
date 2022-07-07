import { configureStore } from "@reduxjs/toolkit";
import newsReducer from './features/newsReducer'
import usersReducer from './features/usersReducer'

export const store = configureStore({
    reducer: {
        news: newsReducer,
        auth: usersReducer
    }
})