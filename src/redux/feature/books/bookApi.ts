import { api } from "../../api/apiSlice";

const bookApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getBooks: builder.query({
      query: () => `/books`,
    }),
    getLatestBooks: builder.query({
      query: () => `books/?limit=3&sortBy=createdAt&sortOrder=desc`,
    }),
    getSingleBooks: builder.query({
      query: (id) => `books/${id}`,
    }),
  }),
});

export const {
  useGetBooksQuery,
  useGetSingleBooksQuery,
  useGetLatestBooksQuery,
} = bookApi;
