import { configureStore } from "@reduxjs/toolkit";
import cartReducer from './cartSlice'
import registerReducer from './registerSlice'

const store = configureStore({
    reducer: {
        cart: cartReducer,
        reg: registerReducer,
    },
})

export default store