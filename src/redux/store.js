import { configureStore } from "@reduxjs/toolkit";
import cartReducer from './cartSlice'
import registerReducer from './registerSlice'
import loginReducer from './loginSlice'
import orderReducer from './orderSlice'

const store = configureStore({
    reducer: {
        cart: cartReducer,
        reg: registerReducer,
        login: loginReducer,
        order: orderReducer
    },
})

export default store