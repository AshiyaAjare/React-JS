import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface AcceptInvitationRequest {
  email: string;
  token: string;
  password: string;
  password_confirmation: string;
}

interface AcceptInvitationResponse {
  message: string;
}

export const acceptInvitationAPI = createApi({
    reducerPath: 'acceptInvitationAPI',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/' }),
    endpoints: (builder) => ({
      acceptInvitation: builder.mutation<AcceptInvitationResponse, AcceptInvitationRequest>({
        query: (data) => ({
          url: '/users/invitation',
          method: 'PATCH',
          body: {
            user: {
              password: data.password,
              password_confirmation: data.password_confirmation,
              invitation_token: data.token, 
            },
          },
          headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', },
        }),
      }),
    }),
});
  

export const { useAcceptInvitationMutation } = acceptInvitationAPI;
