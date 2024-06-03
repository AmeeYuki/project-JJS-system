import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { COUNTER_URL } from "../config";

export const counterAPI = createApi({
  reducerPath: "counterManagement",
  tagTypes: ["CounterList"],
  baseQuery: fetchBaseQuery({ baseUrl: COUNTER_URL }),
  endpoints: (builder) => ({
    getCounters: builder.query({
      query: () => `counters`,
      providesTags: (result, _error, _arg) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "CounterList", id })),
              { type: "CounterList", id: "LIST" },
            ]
          : [{ type: "CounterList", id: "LIST" }],
    }),
    addCounter: builder.mutation({
      query: (body) => ({
        method: "POST",
        url: `counters`,
        body,
      }),
      invalidatesTags: [{ type: "CounterList", id: "LIST" }],
    }),
    editCounter: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: `counters/${id}`,
        method: "PUT",
        body: patch,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "CounterList", id }],
    }),
    deleteCounter: builder.mutation({
      query: (id) => ({
        url: `counters/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "CounterList", id: "LIST" }],
    }),
  }),
});

export const {
  useAddCounterMutation,
  useEditCounterMutation,
  useGetCountersQuery,
  useDeleteCounterMutation,
} = counterAPI;
