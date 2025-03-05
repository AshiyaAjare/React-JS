import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Response } from "../container/types";

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
    tagTypes: ['Responses'],
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
        createResponse: builder.mutation({
            query: ({ queryId, responseData }) => ({
                url: `/queries/${queryId}/responses`,
                method: "POST",
                body: responseData, // ✅ Correct: This should be the full response object
            }),
        }),
        deleteResponse: builder.mutation({
            query: ({ responseId }) => ({
                url: `/responses/${responseId}`,
                method: "DELETE",
            })
        }),
        updateResponse: builder.mutation({
            query: ({ responseId, content }) => ({
                url: `/responses/${responseId}`,
                method: "PUT",
                body: {content},
                headers: {
                    "Content-Type": "application/json",
                },
            })
        }),
        approveResponse: builder.mutation({
            query: (responseId: number) => ({
              url: `/responses/${responseId}/toggle_approval`, // Correct API path
              method: "PATCH",
            }),
        }),
        getResponses: builder.query<Response[], void>({
            query: () => "/responses",
            providesTags: ['Responses'],
        }),
        updateResponseStatus: builder.mutation<Response, { id: number, updates: Partial<Response> }>({
            query: ({ id, updates }) => ({
              url: `/responses/${id}`,
              method: 'PATCH',
              body: updates,
            }),
            invalidatesTags: ['Responses'],
          }),
          
    }),
});

export const { useUpvoteResponseMutation, useDownvoteResponseMutation, useCreateResponseMutation,
     useDeleteResponseMutation, useUpdateResponseMutation, useApproveResponseMutation,
     useGetResponsesQuery, useUpdateResponseStatusMutation } = responseAPI;
