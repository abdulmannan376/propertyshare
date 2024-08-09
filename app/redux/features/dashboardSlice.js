"use client";

import { createSlice } from "@reduxjs/toolkit";
import { act } from "react";

const initialState = {
  activeTab: "Profile",
  userRole: "",
  activePropertyManagementTab: "Listings",
  activeOffersTab: "Sent",
  activeOfferCategoryTab: "Rent",
  activeInspectionTab: "My Inspections",
  activeRaiseRequestTab: "My Requests",
};

export const userDashboardSlice = createSlice({
  name: "user dashboard",
  initialState,
  reducers: {
    updateActiveTab: (state, action) => {
      state.activeTab = action.payload;
    },
    updateUserRole: (state, action) => {
      state.userRole = action.payload;
    },
    updateActivePropertyManagementTab: (state, action) => {
      state.activePropertyManagementTab = action.payload;
    },
    updateOffersTab: (state, action) => {
      state.activeOffersTab = action.payload;
    },
    updateOfferCategoryTab: (state, action) => {
      state.activeOfferCategoryTab = action.payload;
    },
    updateActiveInspectionTab: (state, action) => {
      state.activeInspectionTab = action.payload;
    },
    updateActiveRaiseRequestTab: (state, action) => {
      state.activeRaiseRequestTab = action.payload;
    },
  },
});

export const {
  updateActiveTab,
  updateUserRole,
  updateActivePropertyManagementTab,
  updateOffersTab,
  updateOfferCategoryTab,
  updateActiveInspectionTab,
  updateActiveRaiseRequestTab
} = userDashboardSlice.actions;
export default userDashboardSlice.reducer;
