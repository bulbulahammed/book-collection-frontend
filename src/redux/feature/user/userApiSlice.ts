import { api } from "../../api/apiSlice";
const userApiSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    // Sign In / Login User
    signInUser: builder.mutation({
      query: (body: { user: { email: string; password: string } }) => {
        return {
          url: "/users/login",
          method: "POST",
          body,
        };
      },
    }),
    // Sign Up / Register New User
    signupUser: builder.mutation({
      query: (body: {
        user: {
          firstName: string;
          lastName: string;
          email: string;
          password: string;
        };
      }) => {
        return {
          url: "/users/sign-up",
          method: "POST",
          body,
        };
      },
    }),
    // Get single User By ID
    getSingleUser: builder.query({
      query: (id) => `users/${id}`,
      providesTags: ["User"],
    }),
    // Add to wish list
    addToWishList: builder.mutation({
      query: ({ userId, bookId }) => {
        return {
          url: `/users/wishList/${userId}/${bookId}`,
          method: "PATCH",
        };
      },
    }),
    // Add to Reading list
    addToReadingList: builder.mutation({
      query: ({ userId, bookId }) => {
        return {
          url: `/users/readingList/${userId}/${bookId}`,
          method: "PATCH",
        };
      },
    }),
    // Add to Reading list
    addToReadList: builder.mutation({
      query: ({ userId, bookId }) => {
        return {
          url: `/users/readList/${userId}/${bookId}`,
          method: "PATCH",
        };
      },
    }),
  }),
});

export const {
  useSignInUserMutation,
  useSignupUserMutation,
  useGetSingleUserQuery,
  useAddToWishListMutation,
  useAddToReadingListMutation,
  useAddToReadListMutation,
} = userApiSlice;
