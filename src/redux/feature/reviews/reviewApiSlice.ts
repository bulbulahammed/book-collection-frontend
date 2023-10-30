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
  }),
});

export const { useAddReviewMutation } = reviewApiSlice;
