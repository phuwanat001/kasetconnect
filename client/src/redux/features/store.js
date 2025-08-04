import { configureStore } from "@reduxjs/toolkit";
import productsApi from "./products/productApi";
import cartReducer from './features/cart/cartSlice'

export const store = configureStore({
    reducer : {
        cart : cartReducer,
        [productsApi.reducerPath]: productsApi.reducer,
    },
    middleware : (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(productsApi.middleware),
})