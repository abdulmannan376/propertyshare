"use client"

import { configureStore } from "@reduxjs/toolkit"
import adminSliceReducer from "./features/userSlice"
import userDashboardSliceReducer from "./features/dashboardSlice"

export const store = configureStore({
    reducer: {
        adminSliceReducer,
        userDashboardSliceReducer,
    }
})
