import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const productApi = createApi({
  reducerPath: 'productApi',
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BASE_URL }), 
  endpoints: (builder) => ({
    getAllProducts: builder.query({
      query: () => '/api/product/allproducts',
    }),
    getProductById: builder.query({
      query: (id) => `/api/product/product/${id}`,
    }),
    addProduct: builder.mutation({
      query: (productData) => ({
        url: '/api/product/addproduct',
        method: 'POST',
        body: productData,
      }),
    }),
    updateProduct: builder.mutation({
      query: ({ id, productData }) => ({
        url: `/api/product/updateproduct/${id}`,
        method: 'POST',
        body: productData,
      }),
    }),
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `/api/product/deleteproduct/${id}`,
        method: 'POST',
      }),
    }),
  }),
});

// Export hooks for usage in functional components
export const {
  useGetAllProductsQuery,
  useGetProductByIdQuery,
  useAddProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productApi;

export default productApi;
