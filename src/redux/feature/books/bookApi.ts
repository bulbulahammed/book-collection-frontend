/* eslint-disable @typescript-eslint/no-unused-vars */
import { ParamSerialization } from "../../../lib/ParamSerialization";
import { api } from "../../api/apiSlice";

const bookApi = api.injectEndpoints({
  endpoints: (builder) => ({
    //Get All books
    getBooks: builder.query({
      query: (args: Record<string, unknown>) => {
        const query = args ? ParamSerialization(args) : "";
        return `/books?${query}`;
      },
      providesTags: ["Books"],
    }),
    // Add Book
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

    // Update Book
    updateBook: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `books/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Books"],
    }),

    //Delete Books
    deleteBook: builder.mutation({
      query: (id) => ({
        url: `books/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Books"],
    }),

    // Get Latest Books
    getLatestBooks: builder.query({
      query: () => `books/?limit=6&sortBy=createdAt&sortOrder=desc`,
      providesTags: ["Books"],
    }),

    // Get Single Book
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
