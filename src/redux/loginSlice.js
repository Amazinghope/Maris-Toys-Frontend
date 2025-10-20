// src/redux/loginSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../api"; // your axios instance

// helper: decode JWT payload (no verification) to get sub (userId)
const parseJwt = (token) => {
  if (!token) return null;
  try {
    const base64Payload = token.split(".")[1];
    const jsonPayload = decodeURIComponent(
      atob(base64Payload)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
    return JSON.parse(jsonPayload);
  } catch {
    return null;
  }
};

// Thunk: initial login step (email + password) -> server returns tempToken
export const loginuser = createAsyncThunk(
  "auth/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const res = await API.post("/auth/login", credentials, { withCredentials: true });

      // Expecting backend to return { status: "Success", tempToken }
      if (res.data?.status === "Success" && res.data?.tempToken) {
        // persist tempToken for verify step
        localStorage.setItem("tempToken", res.data.tempToken);
        return {
          otpPending: true,
          tempToken: res.data.tempToken,
          message: res.data?.message || "OTP sent to your email",
        };
      }

      // Unexpected shape
      return rejectWithValue(res.data || "Unexpected response from server");
    } catch (error) {
      const msg = error?.response?.data?.message || error.message || "Login failed";
      return rejectWithValue(msg);
    }
  }
);

// Thunk: verify OTP. We extract userId from tempToken (sub) and post { userId, otp }

export const verifyOtp = createAsyncThunk(
  "auth/verify-otp",
  async ({  otp }, { rejectWithValue }) => {
    try {
      // const tempToken = localStorage.getItem("tempToken");
      // if (!tempToken) return rejectWithValue("Session expired. Please log in again.");

      // const payload = parseJwt(tempToken);
      // const userId = payload?.sub || payload?.id || payload?._id;
      // if (!userId) return rejectWithValue("Invalid session token");

      // send userId and otp to backend; include credentials so cookie is set
      const res = await API.post(
        "/auth/verify-otp",
        {  otp },
        { withCredentials: true }
      );

      // backend should return user info and set cookie
      if (res.data?.status === "Success") {
        // clear temp token after success
        // localStorage.removeItem("tempToken");
        return {
          user: res.data.user ?? res.data.data ?? null,
          message: res.data.message ?? "OTP verified",
        };
      }

      return rejectWithValue(res.data || "Verification failed");
    } catch (error) {
      const msg = error?.response?.data?.message || error.message || "OTP verification failed";
      return rejectWithValue(msg);
    }
  }
);

export const resendOtp = createAsyncThunk(
    "auth/resend-otp",
  async(_, {rejectWithValue})=>{
  try {
    const tempToken = localStorage.getItem('tempToken')
    if(!tempToken) return rejectWithValue("Seesion expired please login again")
    const payload = parseJwt(tempToken)
    const userId = payload?.sub || payload?.id || payload?._id
    if(!userId) return  rejectWithValue("invalid session token") 
    const res = await API.post("/auth/resend-otp", {userId}, {withCredentials: true})
   
    if(res.data?.status === "success"){
      console.log("📦 Backend verifyOtp response:", res.data);

    return { message: res.data.message || "OTP resent successfully!" };

    }
    return rejectWithValue(res.data || "Failed to resend OTP")
  } catch (error) {
    const msg = error?.response?.data?.message || error.message || "Failed to resend OTP";
      return rejectWithValue(msg);

  }
  }    
)

const initialState = {
  user: null,
  loading: false,
  isVerified: false,
  error: null,
  otpPending: false,
  message: null,
  tempToken: null,
  token: null, // session token lives in httpOnly cookie (server sets cookie)
};

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.isVerified = false;
      state.token = null;
      state.tempToken = null;
      state.otpPending = false;
      state.message = null;
      state.error = null;
      // Note: clear cookie on server via logout endpoint — frontend cannot clear httpOnly cookie
      localStorage.removeItem("tempToken");
    },
    clearAuthMessage: (state) => {
      state.message = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // loginuser
      .addCase(loginuser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(loginuser.fulfilled, (state, action) => {
        state.loading = false;
        state.otpPending = !!action.payload?.otpPending;
        state.tempToken = action.payload?.tempToken || null;
        state.message = action.payload?.message || null;
      })
      .addCase(loginuser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Login failed";
      })

      // verifyOtp
      .addCase(verifyOtp.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(verifyOtp.fulfilled, (state, action) => {
        state.loading = false;
        state.otpPending = false;
        state.tempToken = null;
        state.user = action.payload?.user || null;
        state.message = action.payload?.message || null;
        state.isVerified = true;
        // token is managed by cookie (server). If you also return token in body, set it here:
        state.token = true
      })
      .addCase(verifyOtp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "OTP verification failed";
      })
      .addCase(resendOtp.pending, (state)=>{
        state.loading = true
        state.error = null
        state.message = null
      })
      .addCase(resendOtp.fulfilled, (state, action) =>{
        state.loading = false
        state.error = false
        state.message = action.payload
      })
      .addCase(resendOtp.rejected, (state, action) =>{
        state.loading = false;
        state.error = action.payload || "Failed to resend OTP";
      });
  },
});

export const { logout, clearAuthMessage } = loginSlice.actions;
export default loginSlice.reducer;


// import { createSlice, createAsyncThunk} from "@reduxjs/toolkit";
// import API from "../api";

// export const loginuser = createAsyncThunk(
//     "auth/login",
//     async(credentials, {rejectWithValue}) =>{
//         try {
//           const res = await API.post("/auth/login", credentials)
//         //  return res.data.user
//           // Otp required
//       if (res.data?.status === "Success" && res.data?.tempToken) {
//         localStorage.setItem("tempToken", res.data.tempToken);
//         return {
//           otpPending: true,
//           tempToken: res.data.tempToken,
//           message: res.data?.message || "Otp sent to your email",
//         };
//       }
//       return rejectWithValue("Unexpected response from server");

//         } catch (error) {
//            return rejectWithValue(error.res.message || "Invalid Credentials") 
//         }
//     }
// )

// // Otp Verification

// export const verifyOtp = createAsyncThunk(
//    "auth/verify-otp",
//    async({otp}, {rejectWithValue}) =>{
//     try {
//         const tempToken = localStorage.getItem('tempToken')
//         if(!tempToken)  return rejectWithValue("Session expired. please log in again.")
//         const res = await API.post('/auth/verify-otp', 
//     {otp},
//     {credentials}
//   )
        
//     } catch (error) {
        
//     }
//    }
// )

// const loginSlice = createSlice({
//     name: "login",
//     initialState: {
//         user: null,
//         loading: false,
//         isVerified: false,
//         error: false,
//         otpPending: false,
//         email: null,
//         token: cookieStore.get('token') || null,
//         tempToken: cookieStore.get('tempToken') || null

//     },
//     reducers:{
//     logout: (state) =>{
//     state.user = null,
//     state.isVerified = false
//     },
//     clearAuthMessage: (state) => {
//       state.message = null;
//       state.error = null;
//     },

//     },
//    extraReducers:(builder) => {
//     builder
//     .addCase(loginuser.pending, (state)=>{
//         state.loading = true
//         state.error = null
//     })
//     .addCase(loginuser.fulfilled, (state, action)=>{
//         state.loading = false
//         state.user = action.payload
//         state.isVerified = true
//     })
//     .addCase(loginuser.rejected, (state, action)=>{
//         state.loading = false
//         state.error = action.payload
//     })
//     // otp verification build
//     .addCase(verifyOtp.pending, (state)=>{
//         state.loading = true
//         state.error = null
//         state.message = null
//     })
//     .addCase(verifyOtp.fulfilled, (state, action)=>{
//         state.loading = false
//         state.tempToken = null
//         state.otpPending = false
//         state.token = action.payload.token
//         state.message = action.payload.message 
//     })
//     .addCase(verifyOtp.rejected, (state, action)=>{
//         state.loading = false
//         state.error = action.payload
//     })
//    }
// },
//     )
//     export const {logout, clearAuthMessage} = loginSlice.actions
//     export default loginSlice.reducer