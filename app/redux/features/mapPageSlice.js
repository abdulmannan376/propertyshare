"use client";

const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
  coordinates: [],
  propertyType: [],
  availableShares: [],
  isAllDropdownsClosed: true,
};

export const mapPageSlice = createSlice({
  name: "map page",
  initialState,
  reducers: {
    updateMapPageCoordinates: (state, action) => {
      state.coordinates = action.payload;
    },
    updatePropertyType: (state, action) => {
      console.log(action)
      if (action.payload.task === "add") {
        state.propertyType.push(action.payload.value);
      } else {
        const newState = state.propertyType.filter((type) => {
          return type !== action.payload.value;
        });
        state.propertyType = [...newState];
      }
    },
    updateAvailableShares: (state, action) => {
      if (action.payload.task === "add") {
        state.availableShares.push(action.payload.value);
      } else {
        const newState = state.availableShares.filter((type) => {
          return type !== action.payload.value;
        });
        state.availableShares = [...newState];
      }
    },
    handleAllDropdownsActivity: (state, action) => {
      state.isAllDropdownsClosed = action.payload;
    },
  },
});

export const {
  updateAvailableShares,
  updateMapPageCoordinates,
  updatePropertyType,
  handleAllDropdownsActivity,
} = mapPageSlice.actions;
export default mapPageSlice.reducer;
