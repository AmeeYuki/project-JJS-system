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
      query: ({ id, ...updatedCustomer }) => ({
        url: `customers/update/${id}`,
        method: "PUT",
        body: updatedCustomer,
      }),
      invalidatesTags: ["CustomerList"],
    }),
    deleteCustomer: builder.mutation({
      query: (id) => ({
        url: `customers/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["CustomerList"],
    }),
    getCustomerByPhone: builder.query({
      query: (phone) => `customers/get_customer_by_phone?phone=${phone}`,
      providesTags: (result) =>
        result
          ? [{ type: "CustomerList", id: result.id }]
          : [{ type: "CustomerList", id: "LIST" }],
    }),

    createCustomerPolicy: builder.mutation({
      query: (body) => ({
        url: `customer_policies/add_new_customer_policy`,
        method: "POST",
        body: body,
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
  useLazyGetCustomerByPhoneQuery,
  useCreateCustomerPolicyMutation,
} = customerAPI;
