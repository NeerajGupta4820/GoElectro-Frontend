// src/store/index.js
import { configureStore } from '@reduxjs/toolkit';
import cartReducer from "./slices/cartSlice.js";
import userReducer from './slices/userSlice.js';
import productReducer from './slices/productSlice.js';
import categoryReducer from './slices/categorySlice.js';
import userApi from './api/userApi.js';
import productApi from './api/productApi.js';
import categoryApi from './api/categoryApi.js';
import reviewApi from './api/reviewApi.js'; 

const store = configureStore({
  reducer: {
    user: userReducer,
    product: productReducer,
    category: categoryReducer,
    cart: cartReducer,
    [userApi.reducerPath]: userApi.reducer,
    [productApi.reducerPath]: productApi.reducer,
    [categoryApi.reducerPath]: categoryApi.reducer,
    [reviewApi.reducerPath]: reviewApi.reducer, 
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userApi.middleware, productApi.middleware, categoryApi.middleware, reviewApi.middleware), // Add reviewApi middleware
});

export default store;
