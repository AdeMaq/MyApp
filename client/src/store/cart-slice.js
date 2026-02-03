import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    totalQuantity: 0, 
    badgeCount: 0, 
    showCart: false,
  },
  reducers: {
    toggleCart(state) {
      state.showCart = !state.showCart;
    },

    replaceCart(state, action) {
      state.items = action.payload;
      state.totalQuantity = action.payload.reduce((acc, item) => acc + item.quantity, 0);
      state.badgeCount = state.totalQuantity; 
    },

    addToCart(state, action) {
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.productId === newItem.productId);

      if (existingItem) {
        existingItem.quantity += newItem.quantity || 1;
      } else {
        state.items.push({ ...newItem, quantity: newItem.quantity || 1 });
      }
      state.totalQuantity += newItem.quantity || 1;
      state.badgeCount += newItem.quantity || 1; 
    },

    setAddToCart(state, action) {
      const cartData = action.payload; 
      state.items = cartData;
      state.totalQuantity = cartData.reduce((acc, item) => acc + item.quantity, 0);
      state.badgeCount = state.totalQuantity; 
    },

    removeFromCart(state, action) {
      const cartId = action.payload;
      const existingItem = state.items.find((item) => item.cartId === cartId);
      if (!existingItem) return;

      state.totalQuantity -= existingItem.quantity;
      state.badgeCount -= existingItem.quantity; 
      state.items = state.items.filter((item) => item.cartId !== cartId);
    },

    clearCart(state) {
      state.items = [];
      state.totalQuantity = 0;
      state.badgeCount = 0; 
    },

    increaseQuantity(state, action) {
      const cartId = action.payload;
      const item = state.items.find((item) => item.cartId === cartId);
      if (item) {
        item.quantity++;
        state.totalQuantity++;
      }
    },

    decreaseQuantity(state, action) {
      const cartId = action.payload;
      const item = state.items.find((item) => item.cartId === cartId);
      if (item && item.quantity > 1) {
        item.quantity--;
        state.totalQuantity--;
      }
    },
  },
});

export const cartActions = cartSlice.actions;
export default cartSlice;
