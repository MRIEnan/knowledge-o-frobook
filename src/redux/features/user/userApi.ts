import { api } from "@/redux/api/apiSlice";

const userApi = api.injectEndpoints({
  endpoints: (builder) => ({
    // todo: create user
    createUser: builder.mutation({
      query: ({ data }) => ({
        url: `/users/create-user`,
        method: "POST",
        body: data,
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
    // todo: login user
    loginUser: builder.mutation({
      query: ({ data }) => ({
        url: `/auth/login`,
        method: "POST",
        body: data,
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),

    // todo: Get profile
    getProfile: builder.mutation({
      query: ({ authorization }) => ({
        url: `/users/my-profile`,
        method: "POST",
        headers: {
          Authorization: `${authorization}`,
        },
      }),
    }),
    // todo: logout user
    logoutUser: builder.mutation({
      query: ({ data, authorization }) => ({
        url: `/users/logout-user`,
        method: "POST",
        headers: {
          Authorization: authorization,
        },
        body: data,
      }),
    }),
  }),
});

export const {
  useCreateUserMutation,
  useLoginUserMutation,
  useLogoutUserMutation,
  useGetProfileMutation,
} = userApi;
