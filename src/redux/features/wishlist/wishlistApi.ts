import { api } from "@/redux/api/apiSlice";

const wishlistApi = api.injectEndpoints({
  endpoints: (builder) => ({
    //  todo: get wishlist of any user
    getWishlist: builder.query({
      query: ({ authorization, queryParams }) => ({
        url: `/wishlists?${queryParams}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: authorization,
        },
      }),
      providesTags: ["wish"],
    }),

    // todo: create review of any book
    createWish: builder.mutation({
      query: ({ authorization, data }) => ({
        url: `/wishlists/add-wish`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: authorization,
        },
        body: data,
      }),
      invalidatesTags: ["wish"],
    }),

    // todo: update review of any book
    updateWish: builder.mutation({
      query: ({ authorization, data }) => ({
        url: `/wishlists`,
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: authorization,
        },
        body: data,
      }),
      invalidatesTags: ["wish"],
    }),

    // todo: delete review of any book
    deleteWish: builder.mutation({
      query: ({ id, authorization }) => ({
        url: `/wishlists/${id}`,
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: authorization,
        },
      }),
      invalidatesTags: ["wish"],
    }),
  }),
});

export const {
  useCreateWishMutation,
  useGetWishlistQuery,
  useUpdateWishMutation,
  useDeleteWishMutation,
} = wishlistApi;
