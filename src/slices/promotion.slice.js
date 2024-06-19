import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  promotion: null,
};

const PromotionSlice = createSlice({
  name: "promotion",
  initialState,
  reducers: {
    setCounter: (state, action) => {
      state.promotion = action.payload;
    },
    clearCounter: (state) => {
      state.promotion = null;
    },
  },
});

export const { setCounter, clearCounter } = PromotionSlice.actions;
export default PromotionSlice.reducer;
