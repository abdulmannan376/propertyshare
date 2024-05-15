"use client";

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userRole: "",
  userName: "",
  userEmail: "",
  settingActiveTab: "Profile Setting",
  profileSettingActiveTab: "Primary Details",
};

export const adminSlice = createSlice({
  name: "user details",
  initialState,
  reducers: {
    updateUserDetails: (state, action) => {
      if (action.payload) {
        state.userRole = action.payload.role;
        state.userName = action.payload.name;
        state.userEmail = action.payload.email;
      }
    },
    handleUserSettingNavigation: (state, action) => {
      if (state.settingActiveTab !== action.payload) {
        state.settingActiveTab = action.payload;
      }
    },
    handleUserProfileSettingNavigation: (state, action) => {
      if (state.profileSettingActiveTab !== action.payload) {
        state.profileSettingActiveTab = action.payload;
      }
    }
  },
});

export const { updateUserDetails, handleUserSettingNavigation, handleUserProfileSettingNavigation } =
  adminSlice.actions;
export default adminSlice.reducer;
