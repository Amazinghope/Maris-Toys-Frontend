import { createSlice, createSelector } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: {},
  },
  reducers: {
    initCart: (state, action) => {
      state.items = action.payload.items || {};
    },
    addToCart: (state, action) => {
      const { id, product } = action.payload;
      if (state.items[id]) {
        state.items[id].qty += 1;
      } else {
        state.items[id] = { product, qty: 1 };
      }
    },
    increaseQty: (state, action) => {
      const { id } = action.payload;
      if (state.items[id]) state.items[id].qty += 1;
    },
    decreaseQty: (state, action) => {
      const { id } = action.payload;
      if (state.items[id] && state.items[id].qty > 1) {
        state.items[id].qty -= 1;
      }
    },
    removeFromCart: (state, action) => {
      const { id } = action.payload;
      delete state.items[id];
    },
  },
});

export const { initCart, addToCart, increaseQty, decreaseQty, removeFromCart } =
  cartSlice.actions;

export default cartSlice.reducer;

//
// 🔽 Selectors with memoization
//
const selectCartState = (state) => state.cart;

export const selectCartItems = createSelector(
  [selectCartState],
  (cart) => Object.values(cart.items) // only recalculates if cart.items changes
);

export const selectCartTotals = createSelector(
  [selectCartItems],
  (items) => {
    const subTotal = items.reduce(
      (sum, item) => sum + item.product.price * item.qty,
      0
    );
    const shippingFee = subTotal > 5000 ? 0 : 250;
    const tax = Math.round(subTotal * 0.075);
    const total = subTotal + shippingFee + tax;
    return { subTotal, shippingFee, tax, total };
  }
);



// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {items: {}}

// const cartSlice = createSlice({
//     name: "cart",
//     initialState,
//     reducers:{
//         initCart: (state, action) =>{
//             return action.payload || initialState;
//         },

//         addToCart: (state, action) => {
//             const {product, qty = 1} = action.payload
//             const id = product._id
//             const prevQty = state.items[id]?.qty || 0
//             state.items[id] = {product, qty: prevQty + qty}
//         },

//         increaseQty: (state, action) => {
//             const {id} = action.payload ;
//             const prev = state.items[id] || {product: null, qty:0}
//             state.items[id] = {...prev, qty: prev.qty + 1}
//         },

//         decreaseQty: (state, action) => {
//             const {id} = action.payload
//             const prev = state.items[id]
//             if(!prev) return;
//             const nextQty = Math.max(0, prev.qty - 1);
//             if(!nextQty === 0){
//            delete state.items[id]
//             }else{
//                 state.items[id] = {...prev, qty: nextQty}
//             }
//         },

//         removeFromCart: (state, action) => {
//             delete state.items[action.payload.id]
//         },

//         clearCart: () => initialState
//     },
// })


// export const {initCart, addToCart, increaseQty, decreaseQty, removeFromCart, clearCart} = cartSlice.actions

// export const selectCartItems = (state) => Object.values(state.cart.items);

// export const selectCartTotals = (state) => {
//   const items = Object.values(state.cart.items);
//   const subtotal = items.reduce((s, it) => s + it.product.price * it.qty, 0);
//   const shipping = subtotal > 50000 ? 0 : 2500;
//   const tax = Math.round(subtotal * 0.075);
//   const total = subtotal + shipping + tax;
//   return { subtotal, shipping, tax, total };
// };
// export default cartSlice.reducer