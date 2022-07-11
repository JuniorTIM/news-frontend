import { createAsyncThunk } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  news: [],
  error: null,
  loading: false
};

export const getNews = createAsyncThunk('news/get', async (_, thunkAPI) => {
    try {
        const res = await fetch("http://localhost:4000/news")
        return res.json()
    } catch (e) {
        thunkAPI.rejectWithValue(e)
    }
})

export const newsSlice = createSlice({
    name: "news",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getNews.pending, (state, action) => {
            state.loading = true
        })
        builder.addCase(getNews.fulfilled, (state, action) => {
            state.loading = false
            state.news = action.payload
        })
        builder.addCase(getNews.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
        })
    }
})


export default newsSlice.reducer