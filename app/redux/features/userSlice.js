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
  socket: null,
  notificationsList: [],
  isNewNotificationAdded: false,
  isNewMessageRecieved: false,
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
        state.profilePicURL = action.payload.profilePicURL;
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
    setSocket: (state, action) => {
      // if(action.payload)
      state.socket = action.payload;
    },
    updateNotificationsList: (state, action) => {
      state.notificationsList = action.payload;
    },
    addNewNotification: (state, action) => {
      state.notificationsList.unshift(action.payload);
      state.isNewNotificationAdded = true;
    },
    handleNotificationRead: (state, action) => {
      state.notificationsList[action.payload].inAppStatus = "read";
    },
    updateNewNotificationFlag: (state, action) => {
      state.isNewNotificationAdded = action.payload;
    },
    updateNewMessageFlag: (state, action) => {
      state.isNewMessageRecieved = action.payload;
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
  setSocket,
  updateNotificationsList,
  addNewNotification,
  handleNotificationRead,
  updateNewNotificationFlag,
  updateNewMessageFlag,
} = adminSlice.actions;
export default adminSlice.reducer;
