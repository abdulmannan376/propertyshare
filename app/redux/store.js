"use client";

import { configureStore } from "@reduxjs/toolkit";
import adminSliceReducer from "./features/userSlice";
import userDashboardSliceReducer from "./features/dashboardSlice";
import navbarSliceReducer from "./features/navbarSlice";

export const store = configureStore({
  reducer: {
    adminSliceReducer,
    userDashboardSliceReducer,
    navbarSliceReducer,
  },
});
