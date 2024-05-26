import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_URL_BE } from "../config";
import { selectToken } from "../slices/auth.slice";

export const userAPI = createApi({
  reducerPath: "userManagement",
  tagTypes: ["UserList"],
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL_BE,
    prepareHeaders: (headers, { getState }) => {
      const token = selectToken(getState()); // Retrieve token from Redux state using selectToken selector
      if (token) {
        headers.append("Authorization", `Bearer ${token}`);
      }
      headers.append("Content-Type", "application/json");
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getAllUser: builder.query({
      query: () => `users/get_all_users?page=0&limit=10000 `,
      // `providesTags` determines which 'tag' is attached to the
      // cached data returned by the query.
      providesTags: (result) =>
        result
          ? result.users.map(({ id }) => ({ type: "UserList", id }))
          : [{ type: "UserList", id: " LIST " }],
    }),

    addUser: builder.mutation({
      query: (body) => ({
        method: "POST",
        url: `userManager`,
        body,
      }),
      invalidatesTags: [{ type: "UserList", id: "LIST" }],
    }),
    createUser: builder.mutation({
      query: (body) => {
        const users = {
          fullname: body.name,
          email: body.email,
          phone_number: body.phone,
          date_of_birth: body.dob,
          role_id: body.role,
          counter_id: body.counter,
        };
        return {
          method: "POST",
          url: `users/register`,
          body: users,
        };
      },
      invalidatesTags: [{ type: "UserList", id: " LIST " }],
    }),

    editUser: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: `userManager/${id}`,
        method: "PUT",
        body: patch,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "UserList", id }],
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `users/delete_user/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "UserList", id: "LIST" }],
    }),
  }),
});

export const {
  useGetAllUserQuery,
  useAddUserMutation,
  useEditUserMutation,
  useDeleteUserMutation,
  useCreateUserMutation,
} = userAPI;
