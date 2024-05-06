"use client";

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userRole: "",
  userName: "",
  userEmail: "",
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
  },
});

export const { updateUserDetails } = adminSlice.actions;
export default adminSlice.reducer;
