import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({ 
    baseUrl: import.meta.env.VITE_BASE_URL,
    prepareHeaders:(Headers)=>{
      const token=localStorage.getItem('token');
      if(token){
        Headers.set('Authorization',`Bearer ${token}`);
      }
      return Headers;
    }
   }), 
  endpoints: (builder) => ({
    loginUser: builder.mutation({
      query: (credentials) => ({
        url: '/api/user/login',
        method: 'POST',
        body: credentials,
      }),
    }),
    registerUser: builder.mutation({
      query: (userData) => ({
        url: '/api/user/signup',
        method: 'POST',
        body: userData,
      }),
    }),
    logoutUser: builder.mutation({
      query: () => ({
        url: '/api/user/logout',
        method: 'POST',
      }),
    }),
    allUsers: builder.mutation({
      query: () => ({
        url: '/api/user/allUsers',
        method: 'GET',
      }),
    }),
  }),
});

export const { useLoginUserMutation, useRegisterUserMutation, useLogoutUserMutation, useAllUsersMutation } = userApi;
export default userApi;
