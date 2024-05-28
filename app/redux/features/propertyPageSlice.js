const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
  navBtnActive: "Property Details",
};

export const propertyPageSlice = createSlice({
  name: "property page actions",
  initialState,
  reducers: {
    updateActiveNavBtn: (state, action) => {
      state.navBtnActive = action.payload;
    },
  },
});

export const { updateActiveNavBtn } = propertyPageSlice.actions;
export default propertyPageSlice.reducer;
