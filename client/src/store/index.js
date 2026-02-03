import { configureStore } from "@reduxjs/toolkit";
import auctionSlice from "./auction-slice";
import recentSlice from "./recent-slice";
import cartSlice from "./cart-slice";
import popularSlice from "./popular-slice";
import newSlice from './new-slice';
import saleSlice from "./sale-slice";
import authSlice from "./auth-slice";
import favouriteSlice from "./favourite-slice";
import { loadState, saveState } from '../Admin/localStorage';

const preloadedState = loadState();

const store = configureStore({
    reducer: {
        auction: auctionSlice.reducer,
        recent: recentSlice.reducer,
        cart: cartSlice.reducer,
        popular: popularSlice.reducer,
        new: newSlice.reducer,
        sale: saleSlice.reducer,
        auth: authSlice.reducer,
        favourite:favouriteSlice.reducer
    },
    preloadedState,
});

store.subscribe(() => {
  saveState(store.getState());
});

export default store;