import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BASE_URL }), 
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
        url: '/api/user/register',
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
  }),
});

export const { useLoginUserMutation, useRegisterUserMutation, useLogoutUserMutation } = userApi;
export default userApi;
