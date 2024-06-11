"use client";

const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
  coordinates: [],
  propertyType: [],
  priceRange: ["0", "ANY"],
  areaRange: ["0", "ANY"],
  numberOfBeds: [],
  isAllDropdownsClosed: true,
};

export const buyShareSlice = createSlice({
  name: "buy-shares-property-data",
  initialState,
  reducers: {
    updatePropertyType: (state, action) => {
      if (action.payload.task === "add") {
        state.propertyType.push(action.payload.propertyType);
      } else if (action.payload.task === "remove") {
        const newState = state.propertyType.filter(
          (type) => type !== action.payload.propertyType
        );
        state.propertyType = [...newState];
      } else if (action.payload.task === "reset") {
        state.propertyType = [];
      }
    },
    updateNumberOfBeds: (state, action) => {
      if (action.payload.task === "add") {
        state.numberOfBeds.push(action.payload.beds);
      } else if (action.payload.task === "remove") {
        const newState = state.numberOfBeds.filter(
          (type) => type !== action.payload.beds
        );
        state.numberOfBeds = [...newState];
      } else if (action.payload.task === "reset") {
        state.numberOfBeds = [];
      }
    },
    updateCoordinates: (state, action) => {
      state.coordinates = action.payload.coordinates;
    },
    updatePriceRange: (state, action) => {
      if (action.payload.task === "min") {
        state.priceRange[0] = action.payload.value;
      } else if (action.payload.task === "max") {
        state.priceRange[1] = action.payload.value;
      } else if (action.payload.task === "reset") {
        state.priceRange = ["0", "ANY"];
      }
    },
    updateAreaRange: (state, action) => {
      if (action.payload.task === "min") {
        state.areaRange[0] = action.payload.value;
      } else if (action.payload.task === "max") {
        state.areaRange[1] = action.payload.value;
      } else if (action.payload.task === "reset") {
        state.areaRange = ["0", "ANY"];
      }
    },
    handleAllDropdownsActivity: (state, action) => {
      state.isAllDropdownsClosed = action.payload;
    },
  },
});

export const {
  updatePropertyType,
  updateNumberOfBeds,
  updateCoordinates,
  updatePriceRange,
  updateAreaRange,
  handleAllDropdownsActivity,
} = buyShareSlice.actions;
export default buyShareSlice.reducer;
