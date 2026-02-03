import { createSlice } from "@reduxjs/toolkit";

const favouriteSlice = createSlice({
  name: "favourite",
  initialState: { 
    items: [], 
    total: 0 
  },
  reducers: {
    setFavourites(state, action) {
      state.items = action.payload;
      state.total = action.payload.length;
    },
    addFavourite(state, action) {
      state.items.push(action.payload);
      state.total++;
    },
    removeFavourite(state, action) {
      state.items = state.items.filter((fav) => fav.favouriteId !== action.payload);
      state.total--;
    },
  },
});

export const favouriteActions = favouriteSlice.actions;
export default favouriteSlice;