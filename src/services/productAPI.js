import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_URL_BE } from "../config";
import { selectToken } from "../slices/auth.slice";

export const productAPI = createApi({
  reducerPath: "productManagement",
  tagTypes: ["ProductList"],
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
      query: ({ id, ...patch }) => {
        const product = {
          product_name: patch.product_name,
          barcode: patch.barcode,
          quantity: patch.quantity,
          price_processing: patch.price_processing,
          price_stone: patch.price_stone,
          weight: patch.weight,
          weight_unit: patch.weight_unit,
          description: patch.description,
          image_url: patch.image_url,
          type_id: patch.type_id,
          counter_id: patch.counter_id,
        };
        return {
          url: `products/update/${id}`,
          method: "PUT",
          body: product,
        };
      },
      invalidatesTags: (result, error, { id }) => [{ type: "ProductList", id }],
    }),

    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `products/soft_delete_product/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "ProductList", id: "LIST" }],
    }),
    getProductById: builder.query({
      query: (productId) => `products/get_product_by_id/${productId}`,
    }),
    getProductsByCounterId: builder.query({
      query: (counterId) => `products/get_products_by_counter/${counterId}`,
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "ProductList", id })),
              { type: "ProductList", id: "LIST" },
            ]
          : [{ type: "ProductList", id: "LIST" }],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useAddProductMutation,
  useEditProductMutation,
  useDeleteProductMutation,
  useGetProductByIdQuery,
  useGetProductsByCounterIdQuery,
} = productAPI;
