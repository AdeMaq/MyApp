import { createSlice } from "@reduxjs/toolkit";

const popularSlice = createSlice({
  name: "popular",
  initialState: {
    categories: [],
  },
  reducers: {
    replaceCategories(state, action) {
      state.categories = action.payload;
    },
  },
});

export const popularActions = popularSlice.actions;
export default popularSlice;
