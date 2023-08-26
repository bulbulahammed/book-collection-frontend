import { api } from "../../api/apiSlice";

const userApiSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    signinUser: builder.mutation({
      query: (body: { user: { email: string; password: string } }) => {
        return {
          url: "/users/login",
          method: "POST",
          body,
        };
      },
    }),
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
  }),
});

export const { useSigninUserMutation, useSignupUserMutation } = userApiSlice;
