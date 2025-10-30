// src/features/auth/registerSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../api";

// Async thunk for registration
export const registerUser = createAsyncThunk(
  "auth/register",
  async (userData, { rejectWithValue }) => {
    try {
      // now use API instead of axios
      const res = await API.post("/auth/register", userData);
      return res.data.userDetails;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Something went wrong");
    }
  }
);
// export const getAllUsers = createAsyncThunk(
//   "auth/reg"
// )

const registerSlice = createSlice({
  name: "register",
  initialState: {
    user: null,
    loading: false,
    error: null,
    success: false,
  },
  reducers: {
    resetRegisterState: (state) => {
      state.user = null;
      state.loading = false;
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.user = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetRegisterState } = registerSlice.actions;
export default registerSlice.reducer;
