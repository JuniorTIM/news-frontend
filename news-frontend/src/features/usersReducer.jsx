import { createAsyncThunk } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: [],
  error: null,
  loading: false,
  token: localStorage.getItem("token"),
  name: localStorage.getItem("name"),
  user: localStorage.getItem("user"),
};

export const getUsers = createAsyncThunk("users/get", async (_, thunkAPI) => {
  try {
    const res = await fetch(`http://localhost:4000/user`);
    return res.json();
  } catch (e) {
    thunkAPI.rejectWithValue({ error: e.message });
  }
});

export const createUser = createAsyncThunk("users/add", async ({login, password}, thunkAPI) => {
  try {
    const res =  await fetch("http://localhost:4000/user", {
       method: "POST",
       headers: {'Content-Type': 'application/json'},
       body: JSON.stringify({login, password})
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

export const auth = createAsyncThunk('login/auth', async ({login,password}, thunkAPI) => {
  try {
    const res =  await fetch("http://localhost:4000/login", {
       method: "POST",
       headers: {'Content-Type': 'application/json'},
       body: JSON.stringify({login, password})
     })
     const data = await res.json()
     
     if (data.error) {
      return thunkAPI.rejectWithValue(data.error)
     } else {
      localStorage.setItem("token", data.token)
      localStorage.setItem("name", data.name)
      localStorage.setItem("user", data.user)

      return thunkAPI.fulfillWithValue(data)
     }
   } catch (e) {
     thunkAPI.rejectWithValue(e.message)
   }
})

export const logOut = createAsyncThunk('logOut', async(_, thunkAPI) => {
  localStorage.removeItem('token')
  localStorage.removeItem('name')
  localStorage.removeItem("user")
})

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUsers.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getUsers.fulfilled, (state, action) => {
      state.loading = false;
      state.users = action.payload;
    });
    builder.addCase(getUsers.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(createUser.fulfilled, (state, action) => {
      state.error = null
      state.users = action.payload
    })
    builder.addCase(createUser.rejected, (state, action) => {
      state.error = "Такой пользователь уже существует"
    })

    builder.addCase(auth.fulfilled, (state, action) => {
      state.error = null
      state.token = action.payload.token
      state.user = action.payload.user
      state.loading = false

    })
    builder.addCase(auth.rejected, (state, action) => {
      state.error = action.payload
      state.loading = false
    })
    builder.addCase(auth.pending, (state, action) => {
      state.loading = true
      state.error = null
    })
    builder.addCase(logOut.fulfilled, (state, action) => {
      state.token = null
      state.name = null
      state.user = null
      state.error = null
    })
  },
});

export default usersSlice.reducer;
