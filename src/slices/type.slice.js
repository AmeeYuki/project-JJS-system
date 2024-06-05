import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  type: null,
};

const TypeSlice = createSlice({
  name: "type",
  initialState,
  reducers: {
    setType: (state, action) => {
      state.type = action.payload;
    },
    clearType: (state) => {
      state.type = null;
    },
  },
});

export const { setType, clearType } = TypeSlice.actions;
export default TypeSlice.reducer;
