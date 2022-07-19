import { createAsyncThunk } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categories: [],
  error: null,
  loading: false,
};


export const getCategories = createAsyncThunk('categories/get', async (_, thunkAPI) => {
    try {
        const res = await fetch("http://localhost:4000/category")
        return res.json()
    } catch (e) {
        thunkAPI.rejectWithValue(e)
    }
})

export const createCategory = createAsyncThunk('categories/add', async (categoryText, thunkAPI) => {
    try {
        const res = await fetch("http://localhost:4000/category", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ name: categoryText }),
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

        builder.addCase(createCategory.pending, (state, action) => {
            state.loading = true
        })
        builder.addCase(createCategory.fulfilled, (state, action) => {
            state.loading = false
            state.categories.push(action.payload);
        })
        builder.addCase(createCategory.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
          });
    }
})

export default categoriesSlice.reducer