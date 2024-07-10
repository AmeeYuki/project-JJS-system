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
      providesTags: (result) =>
        result
          ? result.users.map(({ id }) => ({ type: "UserList", id }))
          : [{ type: "UserList", id: "LIST" }],
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
      invalidatesTags: [{ type: "UserList", id: "LIST" }],
    }),

    editUser: builder.mutation({
      query: ({ id, ...body }) => {
        const users = {
          fullname: body.fullname,
          email: body.email,
          phone_number: body.phone_number,
          date_of_birth: body.dob,
          role_id: body.role_id,
          counter_id: body.counter_id,
        };
        return {
          url: `users/update/${id}`,
          method: "PUT",
          body: users,
        };
      },
      invalidatesTags: (result, error, { id }) => [{ type: "UserList", id }],
    }),

    deleteUser: builder.mutation({
      query: (id) => ({
        url: `users/delete_user/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "UserList", id: "LIST" }],
    }),

    inactiveUser: builder.mutation({
      query: (userId) => ({
        url: `users/block/${userId}/0`,
        method: "PUT",
      }),
      invalidatesTags: (result, error, userId) => [
        { type: "UserList", id: userId },
      ],
    }),

    activeUser: builder.mutation({
      query: (userId) => ({
        url: `users/block/${userId}/1`,
        method: "PUT",
      }),
      invalidatesTags: (result, error, userId) => [
        { type: "UserList", id: userId },
      ],
    }),

    getUsersByRoleAndCounter: builder.query({
      query: ({ roleId, counterId }) =>
        `users/get_user_by_role_and_counter?roleId=${roleId}&counterId=${counterId}`,
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "UserList", id })),
              { type: "UserList", id: "LIST" },
            ]
          : [{ type: "UserList", id: "LIST" }],
    }),
  }),
});

export const {
  useGetAllUserQuery,
  useEditUserMutation,
  useDeleteUserMutation,
  useCreateUserMutation,
  useActiveUserMutation,
  useInactiveUserMutation,
  useGetUsersByRoleAndCounterQuery,
} = userAPI;
