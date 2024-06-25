"use client";

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  textColor: "text-gray-600",
  hoverTextColor: "text-gray-900",
  buttonTextColor: "text-white",
  logoURL: "/logo-bbh.png",
  notificationIconColor: "text-white",
  bgColor: "bg-transparent",
  currentPage: "Home",
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
    updateCurrentPageValue: (state, action) => {
      state.currentPage = action.payload;
    },
    updateBgColor: (state, action) => {
      state.bgColor = action.payload
    }
  },
});

export const {
  updateNavbarTextColor,
  updateNavbarLogo,
  updateNotificationIconColor,
  updateCurrentPageValue,
  updateBgColor,
} = navbarSlice.actions;
export default navbarSlice.reducer;
