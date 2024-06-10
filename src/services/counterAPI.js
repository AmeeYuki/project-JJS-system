import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_URL_BE } from "../config";
import { selectToken } from "../slices/auth.slice";

export const counterAPI = createApi({
  reducerPath: "counterManagement",
  tagTypes: ["CounterList"],
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
    getCounters: builder.query({
      query: () => `counters/get_all_counters`,
      providesTags: ["Counter"],
    }),
    addCounter: builder.mutation({
      query: (body) => ({
        method: "POST",
        url: `counters/create`,
        body,
      }),
      invalidatesTags: ["Counter"],
    }),
    editCounter: builder.mutation({
      query: ({ id, ...body }) => ({
        method: "PUT",
        url: `counters/update/${id}`,
        body,
      }),
      invalidatesTags: ["Counter"],
    }),
    deleteCounter: builder.mutation({
      query: (counterId) => ({
        method: "DELETE",
        url: `counters/delete/${counterId}`,
      }),
      invalidatesTags: ["Counter"],
    }),
    getCounterByName: builder.query({
      query: (name) => `counters/get_counter_by_name?name=${name}`,
    }),
    inactiveCounter: builder.mutation({
      query: (counterId) => ({
        url: `users/block/${counterId}/0`,
        method: "PUT",
      }),
      invalidatesTags: (result, error, counterId) => [
        { type: "CounterList", id: counterId },
      ],
    }),

    activeCounter: builder.mutation({
      query: (counterId) => ({
        url: `users/block/${counterId}/1`,
        method: "PUT",
      }),
      invalidatesTags: (result, error, counterId) => [
        { type: "CounterList", id: counterId },
      ],
    }),
  }),
});

export const {
  useGetCountersQuery,
  useAddCounterMutation,
  useEditCounterMutation,
  useDeleteCounterMutation,
  useGetCounterByNameQuery,
  useInactiveCounterMutation,
  useActiveCounterMutation,
} = counterAPI;
