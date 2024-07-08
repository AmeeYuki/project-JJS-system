import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_URL_BE } from "../config";
import { selectToken } from "../slices/auth.slice";

export const promotionAPI = createApi({
  reducerPath: "promotionManagement",
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL_BE,
    prepareHeaders: (headers, { getState }) => {
      const token = selectToken(getState());
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      headers.set("Content-Type", "application/json");
      return headers;
    },
  }),
  tagTypes: ["PromotionList"],
  endpoints: (builder) => ({
    getAllPromotions: builder.query({
      query: () => "promotions/get_all_promotions",
      providesTags: (result) =>
        result
          ? result.map(({ id }) => ({ type: "PromotionList", id }))
          : [{ type: "PromotionList", id: "LIST" }],
    }),

    addPromotion: builder.mutation({
      query: (newPromotion) => ({
        url: "promotions/create",
        method: "POST",
        body: newPromotion,
      }),
      invalidatesTags: [{ type: "PromotionList", id: "LIST" }],
    }),
    deletePromotion: builder.mutation({
      query: (id) => ({
        url: `promotions/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ({ id }) => [{ type: "PromotionList", id }],
    }),

    deleteExpiredPromotions: builder.mutation({
      query: () => ({
        url: "promotions/delete_expired_promotions",
        method: "DELETE",
      }),
    }),

    usePromotion: builder.mutation({
      query: (code) => ({
        url: `promotions/use/${code} `,
        method: "POST",
      }),
      invalidatesTags: [{ type: "PromotionList", id: "LIST" }],
    }),
  }),
});

export const {
  useGetAllPromotionsQuery,
  useAddPromotionMutation,
  useDeletePromotionMutation,
  useDeleteExpiredPromotionsMutation,
  useUsePromotionMutation,
} = promotionAPI;
