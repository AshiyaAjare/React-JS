import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const acceptInviteAPI = createApi({
  reducerPath: "acceptApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000" }), // Change this for production
  endpoints: (builder) => ({
    acceptInvite: builder.mutation({
      query: ({ token, password, passwordConfirmation }) => ({
        url: "/users/invitation",
        method: "POST",
        body: {
          user: {
            invitation_token: token,
            password,
            password_confirmation: passwordConfirmation,
          },
        },
      }),
    }),
  }),
});

export const { useAcceptInviteMutation } = acceptInviteAPI;
