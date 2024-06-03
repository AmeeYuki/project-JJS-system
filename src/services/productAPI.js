import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_URL_BE } from "../config";
import { selectToken } from "../slices/auth.slice";

export const productAPI = createApi({
  reducerPath: "productManagement",
  tagTypes: ["ProductList", "CategoryList"],
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
    getProducts: builder.query({
      query: () => `products/get_all_products?page=0&limit=10000`,
      providesTags: (result) => {
        if (result && Array.isArray(result)) {
          return result
            .map(({ id }) => ({ type: "ProductList", id }))
            .concat({ type: "ProductList", id: "LIST" });
        } else {
          return [{ type: "ProductList", id: "LIST" }];
        }
      },
    }),
    getCategories: builder.query({
      query: () => `categories`,
      providesTags: (result) =>
        result
          ? result
              .map(({ id }) => ({ type: "CategoryList", id }))
              .concat({ type: "CategoryList", id: "LIST" })
          : [{ type: "CategoryList", id: "LIST" }],
    }),

    // addProduct: builder.mutation({
    //   query: (body) => ({
    //     method: "POST",
    //     url: `products/create`,
    //     body,
    //   }),
    //   invalidatesTags: [{ type: "ProductList", id: "LIST" }],
    // }),

    addProduct: builder.mutation({
      query: (body) => {
        const product = {
          product_name: body.productName,
          barcode: body.barcode,
          quantity: body.quantity,
          price_processing: body.priceProcessing,
          price_stone: body.priceStone,
          weight: body.weight,
          weight_unit: body.weightUnit,
          description: body.description,
          image_url: body.image,
          type_id: body.typeId,
          counter_id: body.counterId,
        };
        return {
          method: "POST",
          url: `products/create`,
          body: product,
        };
      },
      invalidatesTags: [{ type: "ProductList", id: "LIST" }],
    }),

    editProduct: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: `products/update/${id}`,
        method: "PUT",
        body: patch,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "ProductList", id }],
    }),
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `products/soft_delete_product/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "ProductList", id: "LIST" }],
    }),
    addCategory: builder.mutation({
      query: (body) => ({
        method: "POST",
        url: `categories`,
        body,
      }),
      invalidatesTags: [{ type: "CategoryList", id: "LIST" }],
    }),
    editCategory: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: `categories/${id}`,
        method: "PUT",
        body: patch,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "CategoryList", id },
      ],
    }),
    getProductById: builder.query({
      query: (productId) => `products/get_product_by_id/${productId}`,
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetCategoriesQuery,
  useAddProductMutation,
  useEditProductMutation,
  useDeleteProductMutation,
  useAddCategoryMutation,
  useEditCategoryMutation,
  useGetProductByIdQuery,
} = productAPI;
