import { createSlice, createSelector } from "@reduxjs/toolkit";

const savedCart = JSON.parse(localStorage.getItem("cartItems")) || [];
const savedShipping = JSON.parse(localStorage.getItem("shippingAddress")) || {};



const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: savedCart, //  always an array
    shippingAddress: savedShipping, // NEW: persisted shipping address

  },
  reducers: {
    initCart: (state, action) => {
      state.items = action.payload.items || [];
    },
    addToCart: (state, action) => {
      const { id, product } = action.payload;
      const existingItem = state.items.find((item) => item.id === id);
      if (existingItem) {
        existingItem.qty += 1;
      } else {
        state.items.push({ id, product, qty: 1 });
        localStorage.setItem("cartItems", JSON.stringify(state.items));

      }
    },
    increaseQty: (state, action) => {
      const { id } = action.payload;
      const item = state.items.find((item) => item.id === id);
      if (item) item.qty += 1;
      localStorage.setItem("cartItems", JSON.stringify(state.items));

    },
    decreaseQty: (state, action) => {
      const { id } = action.payload;
      const item = state.items.find((item) => item.id === id);
      if (item && item.qty > 1) item.qty -= 1;
      localStorage.setItem("cartItems", JSON.stringify(state.items));

    },
    removeFromCart: (state, action) => {
      const { id } = action.payload;
      state.items = state.items.filter((item) => item.id !== id);
      localStorage.setItem("cartItems", JSON.stringify(state.items));

    },
    clearCart: (state) => {
      state.items = [];
      localStorage.removeItem("cartItems");

    },

    // ✅ NEW: save/update shipping address
    setShippingAddress: (state, action) => {
      state.shippingAddress = action.payload;
      localStorage.setItem("shippingAddress", JSON.stringify(state.shippingAddress));
    },
  },
});

export const {
  initCart,
  addToCart,
  increaseQty,
  decreaseQty,
  removeFromCart,
  clearCart,
  setShippingAddress,
} = cartSlice.actions;

export default cartSlice.reducer;

//
//  Selectors
//
const selectCartState = (state) => state.cart;

export const selectCartItems = createSelector(
  [selectCartState],
  (cart) => cart.items
);

export const selectCartTotals = createSelector(
  [selectCartItems, (_, shippingAddress) => shippingAddress],
  (items, shippingAddress) => {
    const subTotal = items.reduce(
      (sum, item) => sum + item.product.price * item.qty,
      0
    );
    const tax = Math.round(subTotal * 0.075);

    // Handle both string ("Lagos") and object ({ state: "Lagos" })
    const location =
      typeof shippingAddress === "string"
        ? shippingAddress.toLowerCase()
        : (shippingAddress?.state || shippingAddress?.city || "").toLowerCase();

    const today = new Date();
    const day = today.getDay();
    const isWeekend = day === 0 || day === 6;

    let shippingFee = 0;

    if (location === "lagos") {
      // Lagos: ₦3000 weekdays, ₦5000 weekends
      shippingFee = isWeekend ? 2000 : 3000;
    } else {
      // Other states: ₦7000 fixed
      shippingFee = 7000;
    }

    const total = subTotal + tax + shippingFee;
    return { subTotal, tax, shippingFee, total, isWeekend };
  }
);



