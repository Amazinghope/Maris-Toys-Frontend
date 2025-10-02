import { createSlice, createAsyncThunk, isRejectedWithValue } from "@reduxjs/toolkit";
import API from "../api";

export const loginuser = createAsyncThunk(
    "auth/login",
    async(userData, {rejectWithValue}) =>{
        try {
          const res = await API.post("/login", credentials)
         return res.data.user
        } catch (error) {
           return rejectWithValue(error.res.message || "Invalid Credentials") 
        }
    }
)

const loginSlice = createSlice({
    name: "login",
    initialState: {
        user: null,
        loading: false,
        isAuthorized: false,
        error: false,

    }
})