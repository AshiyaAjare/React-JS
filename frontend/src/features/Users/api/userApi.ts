import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../../../app/store";



// Define a TypeScript interface for the user data
interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  role: string;
  profile_image_url?: string;
  created_at: string;
  updated_at: string;
}

// Create API slice
export const userAPI = createApi({
  reducerPath: "userAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/api/v1",
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token; // Assuming you store auth in Redux
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['User'],
  endpoints: (builder) => ({
    getUser: builder.query<User, void>({
      query: () => "/users/me", // Fetch current logged-in user
      providesTags: ['User'],
    }),
    updateUser: builder.mutation<User, FormData>({
      query: (formData) => ({
        url: `/users/${formData.get("id")}`, // Use the ID from formData
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: ['User'],
    }),
  }),
});

export const { useGetUserQuery, useUpdateUserMutation } = userAPI;
