import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  product: null,
};

const ProductSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setProduct: (state, action) => {
      state.product = action.payload;
    },
    clearProduct: (state) => {
      state.product = null;
    },
  },
});

export const { setProduct, clearProduct } = ProductSlice.actions;
export default ProductSlice.reducer;
