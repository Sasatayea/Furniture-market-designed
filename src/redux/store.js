import { configureStore } from "@reduxjs/toolkit";
import  productsReducer  from "./slices/products";
import CounterReducer from "./slices/counter"

import userReducer from "./slices/userSlice"

import favoriteReducer from "./slices/favoriteSlice";

import cartReducer from "./slices/cartSlice";

import adminProductsReducer from "./slices/adminProductsSlice";


const store=configureStore({
    reducer:{
        products:productsReducer,
        favorite: favoriteReducer,
        cart: cartReducer,
        counter:CounterReducer,
        user: userReducer,
        adminProducts: adminProductsReducer,
    }
})
export default store;

