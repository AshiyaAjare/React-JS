import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const tagAPI = createApi({
  reducerPath: "tagAPI",
  baseQuery: fetchBaseQuery({ 
    baseUrl: "http://localhost:3000/api/v1",
    prepareHeaders: (headers, { getState }) => {
        const token = (getState() as any).auth.token; // Get token from Redux store
        if (token) {
          headers.set("Authorization", `Bearer ${token}`); // Attach token
        }
        return headers;
      },
    }),
  endpoints: (builder) => ({
    getTags: builder.query<{ tags: { id: number; name: string }[] }, void>({
      query: () => "/tags",
    }),
  }),
});

export const { useGetTagsQuery } = tagAPI;
