import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: localStorage.getItem("token") || null,
    // token: null,
    auth: null,
  },
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
      localStorage.setItem("token", action.payload);
    },
    setAuth: (state, action) => {
      state.auth = action.payload;
    },

    logout: (state) => {
      state.token = null;
      state.auth = null;
      localStorage.clear();
    },
  },
});

export const { setToken, setAuth, logout } = authSlice.actions;

export const selectToken = (state) => state.auth.token;
export const selectAuth = (state) => state.auth.auth;

export default authSlice.reducer;
