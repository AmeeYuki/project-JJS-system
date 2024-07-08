import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_URL_BE } from "../config";
import { selectToken } from "../slices/auth.slice";

export const typeAPI = createApi({
  reducerPath: "typeManagement",
  tagTypes: ["TypeList"],
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL_BE,
    prepareHeaders: (headers, { getState }) => {
      const token = selectToken(getState());
      if (token) {
        headers.append("Authorization", `Bearer ${token}`);
      }
      headers.append("Content-Type", "application/json");
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getTypes: builder.query({
      query: () => `typeprice/get_all_type_prices`,
      providesTags: ["TypeList"],
    }),
    addType: builder.mutation({
      query: (body) => ({
        method: "POST",
        url: `typeprice/typeprices`,
        body,
      }),
      invalidatesTags: ["TypeList"],
    }),
    editType: builder.mutation({
      query: ({ id, ...body }) => ({
        method: "PUT",
        url: `typeprice/typeprices/${id}`,
        body,
      }),
      invalidatesTags: ["TypeList"],
    }),
    deleteType: builder.mutation({
      query: (id) => ({
        method: "DELETE",
        url: `typeprice/typeprices/${id}`,
      }),
      invalidatesTags: ["TypeList"],
    }),
    getTypeById: builder.query({
      query: (id) => `typeprice/typeprices/${id}`,
    }),
  }),
});

export const {
  useGetTypesQuery,
  useAddTypeMutation,
  useEditTypeMutation,
  useDeleteTypeMutation,
  useGetTypeByIdQuery,
} = typeAPI;
