"use client"

import { configureStore } from "@reduxjs/toolkit"
import adminSliceReducer from "./features/userSlice"

export const store = configureStore({
    reducer: {
        adminSliceReducer
    }
})
