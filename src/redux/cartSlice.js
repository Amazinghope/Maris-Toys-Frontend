import { createSlice, createSelector } from "@reduxjs/toolkit";

const savedCart = JSON.parse(localStorage.getItem("cartItems")) || [];

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: savedCart, //  always an array
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
  },
});

export const {
  initCart,
  addToCart,
  increaseQty,
  decreaseQty,
  removeFromCart,
  clearCart,
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

// import { createSelector } from "@reduxjs/toolkit";
// import { selectCartItems } from "./cartSlice";

export const selectCartTotals = createSelector(
  [selectCartItems, (_, shippingState) => shippingState], // shippingState is string
  (items, shippingState) => {
    const subTotal = items.reduce(
      (sum, item) => sum + (item.product?.price || 0) * (item.qty || 1),
      0
    );

    const tax = Math.round(subTotal * 0.075);

    // Ensure string
    const stateStr = typeof shippingState === "string" ? shippingState.toLowerCase() : "";

    let shippingFee = 0;
    if (stateStr === "lagos") shippingFee = 3000;
    else if (stateStr) shippingFee = 5000;

    const total = subTotal + tax + shippingFee;

    return { subTotal, tax, shippingFee, total };
  }
);


// export const selectCartTotals = createSelector(
//   [selectCartItems, (_, shippingState) => shippingState],
//   (items, shippingState) => {
//     const subTotal = items.reduce(
//       (sum, item) => sum + (item.product?.price || 0) * (item.qty || 1),
//       0
//     );

//     const tax = Math.round(subTotal * 0.075);

//     // Make sure shippingState is a string
//     let stateStr = typeof shippingState === "string" ? shippingState.toLowerCase() : "";

//     let shippingFee = 0;
//     if (stateStr === "lagos") shippingFee = 3000;
//     else if (stateStr) shippingFee = 5000;

//     const total = subTotal + tax + shippingFee;

//     return { subTotal, tax, shippingFee, total };
//   }
// );


// export const selectCartTotals = createSelector(
//   [selectCartItems, (_, shippingState) => shippingState], // Pass state string
//   (items, shippingState) => {
//     const subTotal = items.reduce(
//       (sum, item) => sum + (item.product?.price || 0) * (item.qty || 1),
//       0
//     );

//     const tax = Math.round(subTotal * 0.075);

//     // Shipping fee logic
//     let shippingFee = 0;
//     if (shippingState?.toLowerCase() === "lagos") shippingFee = 3000;
//     else if (shippingState) shippingFee = 5000;

//     const total = subTotal + tax + shippingFee;

//     return { subTotal, tax, shippingFee, total };
//   }
// );
// export const selectCartTotals = createSelector(
//   [selectCartItems, (_, data) => data],
//   (items, { state }) => {
//     const subTotal = items.reduce(
//       (sum, item) => sum + item.product.price * item.qty, 0
//     );

//     const tax = Math.round(subTotal * 0.075);

//     const today = new Date();
//     const day = today.getDay();
//     const isWeekend = day === 0 || day === 6;

//     let shippingFee = 0;
//     if (isWeekend) shippingFee = 0;
//     else if (state?.toLowerCase() === "lagos") shippingFee = 3000;
//     else shippingFee = 5000;

//     const total = subTotal + tax + shippingFee;

//     return { subTotal, tax, shippingFee, total, isWeekend };
//   }
// );

// export const selectCartTotals = createSelector(
//   [selectCartItems, (_, shippingAddress) => shippingAddress],
//   (items, shippingAddress) => {
//     const subTotal = items.reduce(
//       (sum, item) => sum + item.product.price * item.qty, 0  );

//     const tax = Math.round(subTotal * 0.075);

//     // Determine current day
//     const today = new Date();
//     const day = today.getDay(); // 0 = Sunday, 6 = Saturday
//     const isWeekend = day === 0 || day === 6;

//     // Determine shipping fee logic
//     let shippingFee = 0;

//     if (isWeekend) {
//       shippingFee = 0; // Free on weekends
//     } else if (shippingAddress?.state?.toLowerCase() === "lagos") {
//       shippingFee = 3000; // Within Lagos
//     } else {
//       shippingFee = 5000; // Outside Lagos
//     }

//     const total = subTotal + tax + shippingFee;

//     return { subTotal, tax, shippingFee, total, isWeekend };
//   }
// );

// export const selectCartTotals = createSelector([selectCartItems], (items) => {
//   const subTotal = items.reduce(
//     (sum, item) => sum + item.product.price * item.qty,
//     0
//   );
//   const shippingFee = subTotal > 15000 ? 0 : 2500;
//   const tax = Math.round(subTotal * 0.075);
//   const total = subTotal + shippingFee + tax;
//   return { subTotal, shippingFee, tax, total };
// });


