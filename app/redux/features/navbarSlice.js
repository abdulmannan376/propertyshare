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
  showDropdowns: {
    user: false,
    notification: false,
  },
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
      state.bgColor = action.payload;
    },
    updateDropdrownStatus: (state, action) => {
      if (action.payload.field === "user") {
        state.showDropdowns.user = action.payload.value;
        state.showDropdowns.notification = false;
      } else if (action.payload.field === "notification") {
        state.showDropdowns.notification = action.payload.value;
        state.showDropdowns.user = false;
      } else if (action.payload.field === "close all") {
        state.showDropdowns.user = false;
        state.showDropdowns.notification = false;
      }
    },
  },
});

export const {
  updateNavbarTextColor,
  updateNavbarLogo,
  updateNotificationIconColor,
  updateCurrentPageValue,
  updateBgColor,
  updateDropdrownStatus,
} = navbarSlice.actions;
export default navbarSlice.reducer;
