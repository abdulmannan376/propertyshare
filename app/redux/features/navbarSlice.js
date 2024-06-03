"use client";

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  textColor: "text-gray-600",
  hoverTextColor: "text-gray-900",
  buttonTextColor: "text-white",
  logoURL: "/logo-bbh.png"
};

export const navbarSlice = createSlice({
  name: "navbar slice",
  initialState,
  reducers: {
    updateNavbarTextColor: (state, action) => {
      state.textColor = action.payload.textColor;
      state.hoverTextColor = action.payload.hoverTextColor;
    },
    updateNavbarLogo: (state, action) => {
      state.logoURL = action.payload
    }
  },
});

export const { updateNavbarTextColor, updateNavbarLogo } = navbarSlice.actions;
export default navbarSlice.reducer;
