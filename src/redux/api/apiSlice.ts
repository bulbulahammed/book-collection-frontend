import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://book-collection-backend.vercel.app/api/v1/",
    // baseUrl: "http://localhost:5000/api/v1/",
  }),
  tagTypes: ["Books", "Review", "Status", "User"],
  endpoints: () => ({}),
});
