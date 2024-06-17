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
      } else {
        console.warn("No token found");
      }
      headers.append("Content-Type", "application/json");
      console.log("Headers", headers);
      return headers;
    },
  }),

  endpoints: (builder) => ({
    getAllPromotions: builder.query({
      query: () => `promotions/get_all_promotions`,
      providesTags: ["PromotionList"],
    }),
    addPromotion: builder.mutation({
      query: (newPromotion) => ({
        url: `promotions/create`,
        method: "POST",
        body: newPromotion,
      }),
      invalidatesTags: ["PromotionList"],
    }),
    updatePromotion: builder.mutation({
      query: ({ id, ...updatedPromotion }) => ({
        url: `promotions/use/${id}`,
        method: "PUT",
        body: updatedPromotion,
      }),
      invalidatesTags: ["PromotionList"],
    }),
    deletePromotion: builder.mutation({
      query: (id) => ({
        url: `promotions/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["PromotionList"],
    }),
  }),
});

export const {
  useGetAllPromotionsQuery,
  useAddPromotionMutation,
  useUpdatePromotionMutation,
  useDeletePromotionMutation,
} = promotionAPI;
