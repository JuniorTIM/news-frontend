import { createAsyncThunk } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categories: [],
  error: null,
};


export const getCategories = createAsyncThunk('categories/get', async (_, thunkAPI) => {
    try {

    } catch (e) {
        thunkAPI.rejectWithValue({error: e.message})
    }
})