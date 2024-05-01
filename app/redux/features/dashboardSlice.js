"use client";

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  activeTab: "Profile",
  userRole: "",
};

export const userDashboardSlice = createSlice({
  name: "user dashboard",
  initialState,
  reducers: {
    updateActiveTab: (state, action) => {
      state.activeTab = action.payload;
    },
    updateUserRole: (state, action) => {
        state.userRole = action.payload
    }
  },
});

export const { updateActiveTab, updateUserRole} = userDashboardSlice.actions
export default userDashboardSlice.reducer