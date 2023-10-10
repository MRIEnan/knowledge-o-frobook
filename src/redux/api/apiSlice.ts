import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://knowledgeus-server.vercel.app/api/v1",
    credentials: "include",
  }),
  tagTypes: ["review", "wish", "book"],
  endpoints: () => ({}),
});
