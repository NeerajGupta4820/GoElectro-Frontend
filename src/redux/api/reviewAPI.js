import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const reviewApi = createApi({
  reducerPath: 'reviewApi',
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
    getReviewsByProductId: builder.query({
      query: (productId) => `/api/review/product/${productId}`,
    }),
    getReviewById: builder.query({
      query: (reviewId) => `/api/review/${reviewId}`,
    }),
    addReview: builder.mutation({
      query: (reviewData) => ({
        url: '/api/review/create-review',
        method: 'POST',
        body: reviewData,
      }),
    }),
    updateReview: builder.mutation({
      query: ({ reviewId, reviewData }) => ({
        url: `/api/review/update-review/${reviewId}`,
        method: 'PUT',
        body: reviewData,
      }),
    }),
    deleteReview: builder.mutation({
      query: (reviewId) => ({
        url: `/api/review/delete-review/${reviewId}`,
        method: 'DELETE',
      }),
    }),
    likeReview: builder.mutation({
      query: (reviewId) => ({
        url: `/api/review/like-review/${reviewId}`,
        method: 'POST',
      }),
    }),
    dislikeReview: builder.mutation({
      query: (reviewId) => ({
        url: `/api/review/dislike-review/${reviewId}`,
        method: 'POST',
      }),
    }),
  }),
});

export const {
  useGetReviewsByProductIdQuery,
  useGetReviewByIdQuery,
  useAddReviewMutation,
  useUpdateReviewMutation,
  useDeleteReviewMutation,
  useLikeReviewMutation,
  useDislikeReviewMutation,
} = reviewApi;

export default reviewApi;
