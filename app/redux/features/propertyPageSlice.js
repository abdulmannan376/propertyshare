const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
  navBtnBuyShareActive: "Property Details",
  navBtnRentShareActive: "Rent",
};

export const propertyPageSlice = createSlice({
  name: "property page actions",
  initialState,
  reducers: {
    updateActiveBuyShareNavBtn: (state, action) => {
      state.navBtnBuyShareActive = action.payload;
    },
    updateActiveRentShareNavBtn: (state, action) => {
      state.navBtnRentShareActive = action.payload;
    },
  },
});

export const { updateActiveBuyShareNavBtn, updateActiveRentShareNavBtn } =
  propertyPageSlice.actions;
export default propertyPageSlice.reducer;
