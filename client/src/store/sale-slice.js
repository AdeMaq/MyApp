import { createSlice } from "@reduxjs/toolkit";

const saleSlice = createSlice({
  name: "sale",
  initialState: { itemsList: [] },
  reducers: {
    addItem(state, action) {
      state.itemsList.push(action.payload);
    },
    removeItem(state, action) {
      state.itemsList = state.itemsList.filter(item => item.id !== action.payload);
    },
    replaceData(state, action) {
      state.itemsList = action.payload;
    },
    clearAll(state) {
      state.itemsList = [];
    },
    updateItem(state, action) {
      const updatedItem = action.payload;
      const index = state.itemsList.findIndex(item => item.id === updatedItem.id);
      if (index !== -1) {
        state.itemsList[index] = updatedItem;
      }
    },
  },
});

export const saleActions = saleSlice.actions;
export default saleSlice;