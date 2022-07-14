import { createAsyncThunk } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categories: [],
  error: null,
  loading: false
};


export const getCategories = createAsyncThunk('categories/get', async (_, thunkAPI) => {
    try {
        const res = await fetch("http://localhost:4000/category")
        return res.json()
    } catch (e) {
        thunkAPI.rejectWithValue(e)
    }
})

export const createCategory = createAsyncThunk('categories/add', async (text, thunkAPI) => {
    const state = thunkAPI.getState()
    try {
        const res = await fetch("http://localhost:4000/admin/category", {
            method: "POST",
            headers: {
              Authorization: `Bearer ${state.auth.token}`,
              "Content-Type": "application/json",
            },
          })
        return res.json()
    } catch (e) {
        thunkAPI.rejectWithValue(e)
    }
})

export const categoriesSlice = createSlice({
    name: "categories",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getCategories.pending, (state, action) => {
            state.loading = true
        })
        builder.addCase(getCategories.fulfilled, (state, action) => {
            state.loading = false
            state.categories = action.payload
        })
        builder.addCase(getCategories.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
        })
    }
})

export default categoriesSlice.reducer