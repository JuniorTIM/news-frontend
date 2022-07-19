import { createAsyncThunk } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  news: [],
  error: null,
  loading: false,
};

export const getNews = createAsyncThunk("news/get", async (_, thunkAPI) => {
  try {
    const res = await fetch("http://localhost:4000/news");
    return res.json();
  } catch (e) {
    thunkAPI.rejectWithValue(e);
  }
});

export const createNews = createAsyncThunk("news/add", async ({img, categoryId, titleText, newsText}, thunkAPI) => {
  try {
    const res =  await fetch("http://localhost:4000/news", {
       method: "POST",
       headers: {'Content-Type': 'application/json'},
       body: JSON.stringify({img: img, categoryId: categoryId, title: titleText, text: newsText,})
     })
     const data = await res.json()

     if (data.error) {
      return thunkAPI.rejectWithValue(data.error)
     } else {
      return thunkAPI.fulfillWithValue(data);
     }
   } catch (e) {
     thunkAPI.rejectWithValue(e.message)
   }
})

export const deleteNews = createAsyncThunk("news/delete", async (id, thunkAPI) => {
  try {
    await fetch(`http://localhost:4000/news/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return id
  } catch (e) {
    thunkAPI.rejectWithValue(e);
  }
})

export const newsSlice = createSlice({
  name: "news",
  initialState,
  reducers: {},
  extraReducers: (builder) => {

    builder.addCase(getNews.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getNews.fulfilled, (state, action) => {
      state.loading = false;
      state.news = action.payload;
    });
    builder.addCase(getNews.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(deleteNews.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(deleteNews.fulfilled, (state, action) => {
      state.loading = false;
      state.news = state.news.filter((element) => element._id !== action.payload);
    });
    builder.addCase(deleteNews.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(createNews.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(createNews.fulfilled, (state, action) => {
      state.loading = false;
      state.news.push(action.payload)
    });
    builder.addCase(createNews.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export default newsSlice.reducer;
