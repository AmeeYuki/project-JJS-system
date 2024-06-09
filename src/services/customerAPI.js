import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_URL_BE } from "../config";
import { selectToken } from "../slices/auth.slice";

export const customerAPI = createApi({
  reducerPath: "customerManagement",
  tagTypes: ["CustomerList"],
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
    getAllCustomer: builder.query({
      query: () => `customers/get_customers`,
      providesTags: ["CustomerList"],
    }),

    createCustomer: builder.mutation({
      query: (newCustomer) => ({
        url: `customers/create`,
        method: "POST",
        body: newCustomer,
      }),
      invalidatesTags: ["CustomerList"],
    }),
    updateCustomer: builder.mutation({
      query: ({ id, ...rest }) => ({
        url: `customers/update/${id}`,
        method: "PUT",
        body: rest,
      }),
      invalidatesTags: ["CustomerList"],
    }),
    deleteCustomer: builder.mutation({
      query: (customerId) => ({
        url: `customers/delete/${customerId}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "CustomerList" }],
    }),

    createPromotion: builder.mutation({
      query: ({ customerId, promotionDetails }) => ({
        url: `promotions/create_promotion/${customerId}`,
        method: "POST",
        body: { promotionDetails },
      }),
      invalidatesTags: ["CustomerList"],
    }),
  }),
});

export const {
  useGetAllCustomerQuery,
  useCreateCustomerMutation,
  useUpdateCustomerMutation,
  useDeleteCustomerMutation,
  useCreatePromotionMutation,
} = customerAPI;
