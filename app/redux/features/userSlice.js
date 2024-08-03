"use client";

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userRole: "",
  userName: "",
  userEmail: "",
  profilePicURL: "",
  settingActiveTab: "Profile Setting",
  profileSettingActiveTab: "Primary Details",
  currentLocation: [],
  favouriteList: [],
  wishList: [],
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
        state.profilePicURL = action.payload.profilePicURL
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
    },
    updateCurrentLocation: (state, action) => {
      state.currentLocation = action.payload;
    },
    updateFavoritesList: (state, action) => {
      console.log("payload: ", action.payload);
      if (action.payload.action === "all") {
        state.favouriteList = action.payload.body;
      } else if (action.payload.action === "add") {
        state.favouriteList.push(action.payload.body);
      } else if (action.payload.action === "remove") {
        const prevDetails = [...state.favouriteList];
        state.favouriteList = prevDetails.filter((data) => {
          return data !== action.payload.body;
        });
      }
    },
    updateWishList: (state, action) => {
      console.log("payload: ", action.payload);
      if (action.payload.action === "all") {
        state.wishList = action.payload.body;
      } else if (action.payload.action === "add") {
        state.wishList.push(action.payload.body);
      } else if (action.payload.action === "remove") {
        const prevDetails = [...state.wishList];
        state.wishList = prevDetails.filter((data) => {
          return data !== action.payload.body;
        });
      }
    },
  },
});

export const {
  updateUserDetails,
  handleUserSettingNavigation,
  handleUserProfileSettingNavigation,
  updateCurrentLocation,
  updateFavoritesList,
  updateWishList,
} = adminSlice.actions;
export default adminSlice.reducer;
