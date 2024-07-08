import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_URL_BE } from "../config";
import { selectToken } from "../slices/auth.slice";

const baseQuery = fetchBaseQuery({
  baseUrl: API_URL_BE,
  prepareHeaders: (headers, { getState }) => {
    const token = selectToken(getState());
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    headers.set("Content-Type", "application/json");
    return headers;
  },
  responseHandler: (response) => {
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      return response.json();
    }
    return response.text();
  },
});

export const promotionAPI = createApi({
  reducerPath: "promotionManagement",
  baseQuery,
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
      invalidatesTags: ["PromotionList"],
    }),
    updatePromotion: builder.mutation({
      query: ({ id, ...updatedPromotion }) => ({
        url: `promotions/update/${id}`,
        method: "PUT",
        body: updatedPromotion,
      }),
      invalidatesTags: ({ id }) => [{ type: "PromotionList", id }],
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
        url: `promotions/use/${code}`,
        method: "POST",
      }),
      invalidatesTags: [{ type: "PromotionList", id: "LIST" }],
    }),
  }),
});

export const {
  useGetAllPromotionsQuery,
  useAddPromotionMutation,
  useUpdatePromotionMutation,
  useDeletePromotionMutation,
  useUsePromotionMutation,
} = promotionAPI;
