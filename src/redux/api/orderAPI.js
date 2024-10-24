import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const orderApi = createApi({
  reducerPath: 'orderApi',
  baseQuery: fetchBaseQuery({ 
    baseUrl: import.meta.env.VITE_BASE_URL, 
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('token'); 
      if (token) {
        headers.set('Authorization', `Bearer ${token}`); 
      }
      return headers; 
    },
  }),
  endpoints: (builder) => ({
    getAllOrders: builder.query({
      query: () => '/api/order/allorders',
    }),
    getOrderById: builder.query({
      query: (id) => `/api/order/${id}`,
    }),
    getOrdersByUser: builder.query({
      query: (userId) => `/api/order/user/${userId}`,
    }),
    addOrder: builder.mutation({
      query: (orderData) => ({
        url: '/api/order/add',
        method: 'POST',
        body: orderData, 
      }),
    }),
    updateOrderStatus: builder.mutation({
      query: ({ id, status }) => ({
        url: `/api/order/update/${id}`,
        method: 'POST',
        body: { status }, 
      }),
    }),
    deleteOrder: builder.mutation({
      query: (id) => ({
        url: `/api/order/delete/${id}`,
        method: 'DELETE', 
      }),
    }),
  }),
});

export const {
  useGetAllOrdersQuery,
  useGetOrderByIdQuery,
  useGetOrdersByUserQuery,
  useAddOrderMutation,
  useUpdateOrderStatusMutation,
  useDeleteOrderMutation,
} = orderApi;

export default orderApi;
