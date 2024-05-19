import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { USER_API_URL } from "../config";

export const userAPI = createApi({
  reducerPath: "userManagement",
  tagTypes: ["UserList"],
  baseQuery: fetchBaseQuery({ baseUrl: USER_API_URL }),
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => `userManager`,
      providesTags: (result, _error, _arg) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "UserList", id })),
              { type: "UserList", id: "LIST" },
            ]
          : [{ type: "UserList", id: "LIST" }],
    }),
    addUser: builder.mutation({
      query: (body) => ({
        method: "POST",
        url: `userManager`,
        body,
      }),
      invalidatesTags: [{ type: "UserList", id: "LIST" }],
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
        url: `userManager/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "UserList", id: "LIST" }],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useAddUserMutation,
  useEditUserMutation,
  useDeleteUserMutation,
} = userAPI;
