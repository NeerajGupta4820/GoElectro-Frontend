import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice.js';
import productReducer from './slices/productSlice.js';
import categoryReducer from './slices/categorySlice.js';
import userApi from './api/userApi.js';
import productApi from './api/productApi.js';
import categoryApi from './api/categoryApi.js';

const store = configureStore({
  reducer: {
    user: userReducer,
    product: productReducer,
    category: categoryReducer,
    [userApi.reducerPath]: userApi.reducer,
    [productApi.reducerPath]: productApi.reducer,
    [categoryApi.reducerPath]: categoryApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userApi.middleware, productApi.middleware, categoryApi.middleware),
});

export default store;
