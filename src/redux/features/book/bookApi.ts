import { api } from "@/redux/api/apiSlice";

const bookApi = api.injectEndpoints({
  endpoints: (builder) => ({
    // todo: get books
    getBooks: builder.query({
      query: (...queryParams: string[]) => ({ url: `/books/${queryParams}` }),
      providesTags: ["book"],
    }),

    // todo: get single books
    getSingleBook: builder.query({
      query: (id: string) => ({ url: `/books/${id}` }),
      providesTags: ["book"],
    }),

    // todo: add single books
    addBook: builder.mutation({
      query: ({ data, authorization }) => ({
        url: `/books/create-book`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: authorization,
        },
        body: data,
      }),
      invalidatesTags: ["book"],
    }),
    // todo: edit single books
    editBook: builder.mutation({
      query: ({ id, data, authorization }) => ({
        url: `/books/${id}`,
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: authorization,
        },
        body: data,
      }),
      invalidatesTags: ["book"],
    }),
    // todo: delete single books
    deleteBook: builder.mutation({
      query: ({ id, authorization }) => ({
        url: `/books/${id}`,
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: authorization,
        },
      }),
    }),
  }),
});

export const {
  useGetBooksQuery,
  useAddBookMutation,
  useEditBookMutation,
  useGetSingleBookQuery,
  useDeleteBookMutation,
} = bookApi;
