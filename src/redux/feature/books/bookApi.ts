import { api } from "../../api/apiSlice";

const bookApi = api.injectEndpoints({
  endpoints: (builder) => ({
    addBook: builder.mutation({
      query: (body: {
        book: {
          title: string;
          author: string;
          genre: string;
          publicationYear: string;
          img: string;
          addedBy: string;
          description: string;
        };
      }) => {
        return {
          url: "/books",
          method: "POST",
          body,
        };
      },
      invalidatesTags: ["Books"],
    }),
    updateBook: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `books/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Books"],
    }),
    deleteBook: builder.mutation({
      query: (id) => ({
        url: `books/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Books"],
    }),

    getLatestBooks: builder.query({
      query: () => `books/?limit=6&sortBy=createdAt&sortOrder=desc`,
      providesTags: ["Books"],
    }),
    getBooks: builder.query({
      query: () => `/books`,
      providesTags: ["Books"],
    }),
    getSingleBooks: builder.query({
      query: (id) => `books/${id}`,
      providesTags: ["Books"],
    }),
  }),
});

export const {
  useGetBooksQuery,
  useGetSingleBooksQuery,
  useGetLatestBooksQuery,
  useUpdateBookMutation,
  useAddBookMutation,
  useDeleteBookMutation,
} = bookApi;
