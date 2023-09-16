import { api } from "../../api/apiSlice";

const bookApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getBooks: builder.query({
      query: () => `/books`,
      providesTags: ["Books"],
    }),
    getSingleBooks: builder.query({
      query: (id) => `books/${id}`,
      providesTags: ["Books"],
    }),
    updateBook: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `books/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Books"],
    }),
    getLatestBooks: builder.query({
      query: () => `books/?limit=3&sortBy=createdAt&sortOrder=desc`,
      providesTags: ["Books"],
    }),
  }),
});

export const {
  useGetBooksQuery,
  useGetSingleBooksQuery,
  useGetLatestBooksQuery,
  useUpdateBookMutation,
} = bookApi;
