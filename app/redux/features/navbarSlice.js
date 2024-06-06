"use client";

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  textColor: "text-gray-600",
  hoverTextColor: "text-gray-900",
  buttonTextColor: "text-white",
  logoURL: "/logo-bbh.png",
  notificationIconColor: "text-white",
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
      state.logoURL = action.payload;
    },
    updateNotificationIconColor: (state, action) => {
      state.notificationIconColor = action.payload;
    },
  },
});

export const { updateNavbarTextColor, updateNavbarLogo, updateNotificationIconColor } = navbarSlice.actions;
export default navbarSlice.reducer;
