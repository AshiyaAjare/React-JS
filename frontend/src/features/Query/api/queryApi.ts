import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../../../app/store";

export interface User {
  id: number;
  first_name: string;
  last_name: string;
}

export interface Query {
  id: number;
  title: string;
  content: string;
  created_at: string;
  user: User;
}


const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:3000/api/v1",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token; // Get token from Redux store
    if (token) {
      headers.set("Authorization", `Bearer ${token}`); // Attach token
    }
    return headers;
  },
});

export const queryAPI = createApi({
  reducerPath: "queryAPI",
  baseQuery,
  endpoints: (builder) => ({
    getQueries: builder.query<Query[], void>({
      query: () => "/queries",
      transformResponse: (response: { queries: Query[] }) => response.queries,
    }),
    createQuery: builder.mutation<Query, Partial<Query>>({
      query: (newQuery) => ({
        url: "/queries",
        method: "POST",
        body: newQuery,
      }),
    }),
    getQueryById: builder.query({
      query: (queryId) => `/queries/${queryId}`,
    }),
    deleteQueryById: builder.mutation({
      query: (queryId) => ({
        url:`/queries/${queryId}`,
        method: "DELETE",
      })
    }),
    updateQuery: builder.mutation({
      query: ({queryId, content}) => ({
        url: `/queries/${queryId}`,
        method: "PUT",
        body: {content}
      })
    })
  }),
});

export const { useGetQueriesQuery, useCreateQueryMutation, useGetQueryByIdQuery, useDeleteQueryByIdMutation, useUpdateQueryMutation } = queryAPI;
