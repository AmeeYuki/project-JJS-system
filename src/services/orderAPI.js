import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_URL_BE } from "../config";
import { selectToken } from "../slices/auth.slice";

export const orderAPI = createApi({
  reducerPath: "orderManagement",
  tagTypes: ["OrderList"],
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
    getOrders: builder.query({
      query: () => `orders/get_all_orders`,
      providesTags: (result) =>
        result
          ? [
              ...result.orders.map(({ id }) => ({
                type: "OrderList",
                id,
              })),
              { type: "OrderList", id: "LIST" },
            ]
          : [{ type: "OrderList", id: "LIST" }],
    }),

    getOrderDetail: builder.query({
      query: (id) => `order_details/get_order_detail_by_order_id/${id}`,
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({
                type: "OrderList",
                id,
              })),
              { type: "OrderList", id: "LIST" },
            ]
          : [{ type: "OrderList", id: "LIST" }],
    }),

    getOrderById: builder.query({
      query: (id) => `orders/get_order_by_id/${id}`,
    }),

    addOrder: builder.mutation({
      query: (body) => {
        return {
          method: "POST",
          url: `orders/create`,
          body,
        };
      },
      invalidatesTags: [{ type: "OrderList", id: "LIST" }],
    }),
    editOrder: builder.mutation({
      query: (payload) => {
        return {
          method: "PUT",
          url: `product/` + payload.id,
          body: payload.body,
        };
      },
      invalidatesTags: (res, err, arg) => [{ type: "OrderList", id: arg.id }],
    }),
    deleteOrder: builder.mutation({
      query: (payload) => {
        return {
          method: "DELETE",
          url: `product/` + payload.id,
        };
      },
      invalidatesTags: (_res, _err, _arg) => [
        { type: "OrderList", id: "LIST" },
      ],
    }),
  }),
});

export const {
  useGetOrdersQuery,
  useGetOrderByIdQuery,
  useAddOrderMutation,
  useEditOrderMutation,
  useDeleteOrderMutation,
  useGetOrderDetailQuery,
  useLazyGetOrderByIdQuery,
  useLazyGetOrderDetailQuery,
} = orderAPI;
