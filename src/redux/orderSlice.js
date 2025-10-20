import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../api";
import { fetchOrderById, createOrder } from "../services/orderServices";

//  Create a new order (user checkout)
export const creatingOrder = createAsyncThunk(
  "orders/creatingOrder",
  async (orderData, { rejectWithValue }) => {
    try {
     const res = await createOrder(orderData);  
      return res;  // res = { id, order } from your backend

    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to create order"
      );
    }
  }
);

//  Get all orders for the logged-in user
export const getUserOrders = createAsyncThunk(
  "order/getUserOrders",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await API.get(fetchOrderById, {
        withCredentials: true,
      });
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch user orders"
      );
    }
  }
);

//  Get all orders (admin only)
export const getAllOrders = createAsyncThunk(
  "order/getAllOrders",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await API.get("/order/get-all-order", {
        withCredentials: true,
      });
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch all orders"
      );
    }
  }
);

//  Get specific order by ID
// export const getOrderById = createAsyncThunk(
//   "orders/getOrderById",
//   async (id, { rejectWithValue }) => {
//     try {
//       const { data } = await API.get(fetchOrderById, {
//         withCredentials: true,
//       });
//       return data;
//     } catch (error) {
//       return rejectWithValue(
//         error.response?.data?.message || "Failed to fetch order details"
//       );
//     }
//   }
// );
export const getOrderById = createAsyncThunk(
  "orders/getOrderById",
  async (id, { rejectWithValue }) => {
    try {
      // Use your service function properly
      const data = await fetchOrderById(id);
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch order details"
      );
    }
  }
);


//  Slice
const orderSlice = createSlice({
  name: "orders",
  initialState: {
    orders: [],
    orderDetails: null,
    loading: false,
    error: null,
    success: false,
  },
  reducers: {
    resetOrderState: (state) => {
      state.orders = [];
      state.orderDetails = null;
      state.loading = false;
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      //  Create order
      .addCase(creatingOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(creatingOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.orderDetails = action.payload;
      })
      .addCase(creatingOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      //  Get user orders
      .addCase(getUserOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(getUserOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      //  Get all orders (admin)
      .addCase(getAllOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(getAllOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      //  Get order by ID
      .addCase(getOrderById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getOrderById.fulfilled, (state, action) => {
        state.loading = false;
        state.orderDetails = action.payload;
      })
      .addCase(getOrderById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetOrderState } = orderSlice.actions;
export default orderSlice.reducer;
