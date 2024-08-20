"use client";

import { configureStore } from "@reduxjs/toolkit";
import adminSliceReducer from "./features/userSlice";
import userDashboardSliceReducer from "./features/dashboardSlice";
import navbarSliceReducer from "./features/navbarSlice";
import buyShareSliceReducer from "./features/buyShareSlice";
import propertyPageSliceReducer from "./features/propertyPageSlice";
import mapPageSliceReducer from "./features/mapPageSlice";
import conversationSliceReducer from "./features/conversationSlice";

export const store = configureStore({
  reducer: {
    adminSliceReducer,
    userDashboardSliceReducer,
    navbarSliceReducer,
    buyShareSliceReducer,
    propertyPageSliceReducer,
    mapPageSliceReducer,
    conversationSliceReducer,
  },
});
