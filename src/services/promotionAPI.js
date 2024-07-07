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
<<<<<<< HEAD
      headers.append("Content-Type", "application/json");
      console.log("Headers", headers);
      return headers;
    },
  }),

  endpoints: (builder) => ({
    getAllPromotions: builder.query({
      query: () => `promotions/get_all_promotions`,
      providesTags: ["PromotionList"],
=======
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
>>>>>>> main
    }),
    addPromotion: builder.mutation({
      query: (newPromotion) => ({
<<<<<<< HEAD
        url: `promotions/create`,
=======
        url: "promotions/create",
>>>>>>> main
        method: "POST",
        body: newPromotion,
      }),
      invalidatesTags: ["PromotionList"],
    }),
    updatePromotion: builder.mutation({
      query: ({ id, ...updatedPromotion }) => ({
<<<<<<< HEAD
        url: `promotions/use/${id}`,
        method: "PUT",
        body: updatedPromotion,
      }),
      invalidatesTags: ["PromotionList"],
=======
        url: `promotions/update/${id}`,
        method: "PUT",
        body: updatedPromotion,
      }),
      invalidatesTags: ({ id }) => [{ type: "PromotionList", id }],
>>>>>>> main
    }),
    deletePromotion: builder.mutation({
      query: (id) => ({
        url: `promotions/delete/${id}`,
        method: "DELETE",
      }),
<<<<<<< HEAD
      invalidatesTags: ["PromotionList"],
=======
      invalidatesTags: ({ id }) => [{ type: "PromotionList", id }],
    }),

    usePromotion: builder.mutation({
      query: (code) => ({
        url: `promotions/use/${code} `,
        method: "POST",
      }),
      invalidatesTags: [{ type: "PromotionList", id: "LIST" }],
>>>>>>> main
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
