import { api } from "@/redux/api/apiSlice";

const reviewApi = api.injectEndpoints({
  endpoints: (builder) => ({
    //  todo: get review of any book
    getReview: builder.query({
      query: ({ id, pageNumber = 1 }) => ({
        url: `/reviews/${id}?sortOrder=desc&page=${pageNumber}`,
      }),
      providesTags: ["review"],
    }),

    // todo: create review of any book
    createReview: builder.mutation({
      query: ({ id, authorization, data }) => ({
        url: `/reviews/${id}`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: authorization,
        },
        body: data,
      }),
      invalidatesTags: ["review"],
    }),

    // todo: update review of any book
    updateReview: builder.mutation({
      query: ({ id, authorization, data }) => ({
        url: `/reviews/${id}`,
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: authorization,
        },
        body: data,
      }),
      invalidatesTags: ["review"],
    }),

    // todo: delete review of any book
    deleteReview: builder.mutation({
      query: ({ id, authorization }) => ({
        url: `/reviews/${id}`,
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: authorization,
        },
      }),
      invalidatesTags: ["review"],
    }),
  }),
});

export const {
  useGetReviewQuery,
  useCreateReviewMutation,
  useUpdateReviewMutation,
  useDeleteReviewMutation,
} = reviewApi;
