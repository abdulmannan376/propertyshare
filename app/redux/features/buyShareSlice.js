"use client";

const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
  coordinates: [],
  propertyType: [],
  priceRange: ["0", "ANY"],
  areaRange: ["0", "ANY"],
  numberOfBeds: [],
};

export const buyShareSlice = createSlice({
  name: "buy-shares-property-data",
  initialState,
  reducers: {
    updatePropertyType: (state, action) => {
      if (action.payload.task === "add") {
        state.propertyType.push(action.payload.propertyType);
      } else {
        const newState = state.propertyType.filter(
          (type) => type !== action.payload.propertyType
        );
        state.propertyType = [...newState];
      }
    },
    updateNumberOfBeds: (state, action) => {
      if (action.payload.task === "add") {
        state.numberOfBeds.push(action.payload.beds);
      } else {
        const newState = state.numberOfBeds.filter(
          (type) => type !== action.payload.beds
        );
        state.numberOfBeds = [...newState];
      }
    },
    updateCoordinates: (state, action) => {
      state.coordinates = action.payload.coordinates;
    },
    updatePriceRange: (state, action) => {
      if (action.payload.task === "min") {
        state.priceRange[0] = action.payload.value;
      } else {
        state.priceRange[1] = action.payload.value;
      }
    },
    updateAreaRange: (state, action) => {
      if (action.payload.task === "min") {
        state.areaRange[0] = action.payload.value;
      } else {
        state.areaRange[1] = action.payload.value;
      }
    },
  },
});

export const {
  updatePropertyType,
  updateNumberOfBeds,
  updateCoordinates,
  updatePriceRange,
  updateAreaRange,
} = buyShareSlice.actions;
export default buyShareSlice.reducer;
