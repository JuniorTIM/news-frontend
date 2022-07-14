import { createAsyncThunk } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  comments: [],
  error: null,
  loading: false,
};

export const getComments = createAsyncThunk(
  "comments/get",
  async ({id}, thunkAPI) => {
    try {
      const res = await fetch(`http://localhost:4000/comments/${id}`);
      return res.json();
    } catch (e) {
      thunkAPI.rejectWithValue({ error: e.message });
    }
  }
);

export const clearStorage = (token) => {
  localStorage.clear()
}

export const createComment = createAsyncThunk(
  "comments/add",
  async ({text, id}, thunkAPI) => {
    const state = thunkAPI.getState();
    try {
      const res = await fetch(`http://localhost:4000/comments`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${state.users.token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: text, newsId: id }),
      });
      const data = await res.json()

    if (data.error) {
      return thunkAPI.rejectWithValue(data.error)
    } 

    return thunkAPI.fulfillWithValue(data);
    } catch (e) {
      thunkAPI.rejectWithValue(e);
    }
  }
);

export const deleteComment = createAsyncThunk("comments/delete", async (id, thunkAPI) => {
  const state = thunkAPI.getState();
  try {
   const res =  await fetch(`http://localhost:4000/comments/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${state.users.token}`,
        "Content-Type": "application/json",
      },
    });

    const data = res.json()

    if (data.error) {
      return thunkAPI.rejectWithValue(data.error)
    } 

    return thunkAPI.fulfillWithValue(id);
  } catch (e) {
   return thunkAPI.rejectWithValue(e);
  }
})

export const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getComments.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getComments.fulfilled, (state, action) => {
      state.loading = false;
      state.comments = action.payload;
    });
    builder.addCase(getComments.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(createComment.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(createComment.fulfilled, (state, action) => {
      state.loading = false;
      state.comments.push(action.payload);
    });
    builder.addCase(createComment.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(deleteComment.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(deleteComment.fulfilled, (state, action) => {
      state.loading = false;
      state.error = false
      state.comments = state.comments.filter((comment) => comment._id !== action.payload);
    });
    builder.addCase(deleteComment.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export default commentsSlice.reducer;
