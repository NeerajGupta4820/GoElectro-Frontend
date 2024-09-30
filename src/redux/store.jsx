import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice.js';
import userApi from './api/userApi.js';

const store = configureStore({
  reducer: {
    user: userReducer,
    [userApi.reducerPath]: userApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userApi.middleware),
});

export default store;
