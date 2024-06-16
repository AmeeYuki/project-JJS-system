import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_URL_BE } from "../config";
import { selectToken } from "../slices/auth.slice";

export const customerAPI = createApi({
  reducerPath: "customerManagement",
  tagTypes: ["CustomerList"],
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
    getAllCustomer: builder.query({
      query: () => `customers/get_customers`,
      // `providesTags` determines which 'tag' is attached to the
      // cached data returned by the query.
      providesTags: (result) =>
        result
          ? result.map(({ id }) => ({ type: "UserList", id }))
          : [{ type: "UserList", id: " LIST " }],
    }),
    getCustomerByPhone: builder.query({
      query: (phone) => `customers/get_customer_by_phone?phone=${phone}`,
      providesTags: (result) =>
        result
          ? [{ type: "CustomerList", id: result.id }]
          : [{ type: "CustomerList", id: "LIST" }],
    }),
  }),
});

export const {
  useGetAllCustomerQuery,
  useGetCustomerByPhoneQuery,
  useLazyGetCustomerByPhoneQuery,
} = customerAPI;
