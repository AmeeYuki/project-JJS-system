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
    acceptPolicy: builder.mutation({
      query: ({ id }) => ({
        url: `customer_policies/approve_customer_policy/${id}`,
        method: "PUT",
        body: {
          publishing_status: "accept",
        },
      }),
      invalidatesTags: ["CustomerList"],
    }),
    rejectPolicy: builder.mutation({
      query: ({ id }) => ({
        url: `customer_policies/approve_customer_policy/${id}`,
        method: "PUT",
        body: {
          publishing_status: "reject",
        },
      }),
      invalidatesTags: ["CustomerList"],
    }),
    usedPolicy: builder.mutation({
      query: ({ id }) => ({
        url: `customer_policies/approve_customer_policy/${id}`,
        method: "PUT",
        body: {
          publishing_status: "used",
        },
      }),
      invalidatesTags: ["CustomerList"],
    }),
    getAllPolicy: builder.query({
      query: () => ({
        url: `customer_policies/get_all_customer_policies`,
        method: "GET",
      }),
      invalidatesTags: ["CustomerList"],
    }),
    getPolicyCustomerAccept: builder.query({
      query: (id) => ({
        url: `customer_policies/get_policy_by_customer_and_status?customerId=${id}&publishStatus=accept`,
        method: "GET",
      }),
      invalidatesTags: ["CustomerList"],
    }),
    usePoint: builder.mutation({
      query: ({ customerId, point }) => ({
        url: `customers/apply_accumulated_point/${customerId}?accumulated_point=${point}`,
        method: "PUT",
      }),
      invalidatesTags: ["CustomerList"],
    }),

    addPoint: builder.mutation({
      query: ({ data, point }) => ({
        url: `customers/update/${data.id}`,
        method: "PUT",
        body: {
          fullName: "Ame ",
          email: data.email,
          phone: data.phone,
          address: data.address,
          accumulated_point: point,
        },
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
  useGetAllPolicyQuery,
  useAcceptPolicyMutation,
  useRejectPolicyMutation,
  useGetPolicyCustomerAcceptQuery,
  useUsedPolicyMutation,
  useUsePointMutation,
  useAddPointMutation,
} = customerAPI;
