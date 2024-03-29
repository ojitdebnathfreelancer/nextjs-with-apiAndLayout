import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/api/" }),
  endpoints: (builder) => ({
    getNews: builder.query({
      query: () => "/news",
    }),
    getSingleNews: builder.query({
      query: (id) => `/news/${id}`,
    }),
  }),
});

export const { useGetNewsQuery, useGetSingleNewsQuery } = apiSlice;
