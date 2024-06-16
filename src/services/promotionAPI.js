import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_URL_BE } from "../config";
import { selectToken } from "../slices/auth.slice";

export const promotionAPI = createApi({
  reducerPath: "promotionManagement",
  tagTypes: ["PromotionList"],
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
    getAllPromotions: builder.query({
      query: () => `/promotions/promotions`,
      providesTags: (result) =>
        result
          ? result.map(({ id }) => ({ type: "PromotionList", id }))
          : [{ type: "PromotionList", id: "LIST" }],
    }),

    addPromotion: builder.mutation({
      query: (newPromotion) => ({
        url: `/promotions/create`,
        method: "POST",
        body: newPromotion,
      }),
      invalidatesTags: [{ type: "PromotionList", id: "LIST" }],
    }),
    updatePromotion: builder.mutation({
      query: ({ id, ...updatedPromotion }) => ({
        url: `/promotions/use/${id}`,
        method: "PUT",
        body: updatedPromotion,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "PromotionList", id },
      ],
    }),
    deletePromotion: builder.mutation({
      query: (id) => ({
        url: `/promotions/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [{ type: "PromotionList", id }],
    }),
  }),
});

export const {
  useGetAllPromotionsQuery,
  useAddPromotionMutation,
  useUpdatePromotionMutation,
  useDeletePromotionMutation,
} = promotionAPI;
