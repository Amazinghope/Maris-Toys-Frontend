// export const selectCartItems = (state) => Object.values(state.cart.items)

// export const selectCartTotals = (state) => {
//     const items = Object.values(state.cart.items)
//     const subTotal = items.reduce((sumOfItems, item) => sumOfItems + item.product.price * item.qty, 0)
//     const shippingFee = subTotal > 5000 ? 0 : 250;
//     const tax = Math.round(subTotal * 0.075);
//     const total = subTotal + shippingFee + tax
//     return {subTotal, shippingFee, tax, total}
// }