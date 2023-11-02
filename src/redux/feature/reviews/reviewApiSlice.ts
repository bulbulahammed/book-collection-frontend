/* eslint-disable @typescript-eslint/no-explicit-any */
import { api } from "../../api/apiSlice";

const reviewApiSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    addReview: builder.mutation({
      query: ({ id, reviewData }) => ({
        url: `reviews/${id}`,
        method: "PATCH",
        body: reviewData,
      }),
      invalidatesTags: ["Review"],
    }),
    //Delete Review
    deleteReview: builder.mutation({
      query: ({ bookId, reviewId }) => ({
        url: `reviews/${bookId}/review/${reviewId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Review"],
    }),
  }),
});

export const { useAddReviewMutation, useDeleteReviewMutation } = reviewApiSlice;
