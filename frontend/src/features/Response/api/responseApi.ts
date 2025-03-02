import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const responseAPI = createApi({
    reducerPath: "responseAPI",
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
        upvoteResponse: builder.mutation({
            query: ({ responseId }) => ({
                url: `/responses/${responseId}/upvote`,
                method: "PATCH",
            }),
        }),
        downvoteResponse: builder.mutation({
            query: ({ responseId }) => ({
                url: `/responses/${responseId}/downvote`,
                method: "PATCH",
            }),
        }),
    }),
});

export const { useUpvoteResponseMutation, useDownvoteResponseMutation } = responseAPI;
