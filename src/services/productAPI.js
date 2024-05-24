import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { PRODUCT_URL } from "../config";

export const productAPI = createApi({
  reducerPath: "productManagement",
  tagTypes: ["ProductList"],
  baseQuery: fetchBaseQuery({ baseUrl: PRODUCT_URL }),
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => `products`,
      providesTags: (result, _error, _arg) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "ProductList", id })),
              { type: "ProductList", id: "LIST" },
            ]
          : [{ type: "ProductList", id: "LIST" }],
    }),
    getCategories: builder.query({
      query: () => `categories`,
      providesTags: (result, _error, _arg) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "CategoryList", id })),
              { type: "CategoryList", id: "LIST" },
            ]
          : [{ type: "CategoryList", id: "LIST" }],
    }),
    addProduct: builder.mutation({
      query: (body) => ({
        method: "POST",
        url: `products`,
        body,
      }),
      invalidatesTags: [{ type: "ProductList", id: "LIST" }],
    }),
    editProduct: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: `products/${id}`,
        method: "PUT",
        body: patch,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "ProductList", id }],
    }),
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `products/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "ProductList", id: "LIST" }],
    }),
    editCategory: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: `categories/${id}`,
        method: "PUT",
        body: patch,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "CategoryList", id: "LIST" },
      ],
    }),
    addCategory: builder.mutation({
      query: (body) => ({
        url: `categories`,
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "CategoryList", id: "LIST" }],
    }),
  }),
});

export const {
  useAddProductMutation,
  useDeleteProductMutation,
  useEditProductMutation,
  useGetProductsQuery,
  useGetCategoriesQuery,
  useEditCategoryMutation,
  useAddCategoryMutation,
} = productAPI;
