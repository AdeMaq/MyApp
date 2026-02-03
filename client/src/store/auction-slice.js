import { createSlice } from '@reduxjs/toolkit';

const convertTimeToSeconds = (timeStr) => {
  const regex = /(?:(\d+)d)?\s*:?(\d+)h\s*:?(\d+)m\s*:?(\d+)s/i;
  const match = timeStr.match(regex);
  if (!match) return 0;
  const days = parseInt(match[1]) || 0;
  const hours = parseInt(match[2]) || 0;
  const mins = parseInt(match[3]) || 0;
  const secs = parseInt(match[4]) || 0;
  return days * 86400 + hours * 3600 + mins * 60 + secs;
};

const auctionSlice = createSlice({
  name: 'auction',
  initialState: { itemsList: [] },
  reducers: {
    addItem(state, action) {
      const item = action.payload;
      state.itemsList.push({
        ...item,
        timeLeftSeconds: convertTimeToSeconds(item.timeLeft)
      });
    },
    updateItem(state, action) {
      const updatedItem = action.payload;
      const index = state.itemsList.findIndex(item => item.id === updatedItem.id);
      if (index !== -1) {
        state.itemsList[index] = {
          ...updatedItem,
          timeLeftSeconds: convertTimeToSeconds(updatedItem.timeLeft)
        };
      }
    },
    removeItem(state, action) {
      state.itemsList = state.itemsList.filter(item => item.id !== action.payload);
    },
    replaceData(state, action) {
      state.itemsList = action.payload.map(item => ({
        ...item,
        timeLeftSeconds: convertTimeToSeconds(item.timeLeft)
      }));
    },
    clearAll(state) {
      state.itemsList = [];
    },
    tick(state) {
      state.itemsList.forEach(item => {
        if (item.timeLeftSeconds > 0) {
          item.timeLeftSeconds -= 1;
        }
      });
    },
  }
});

export const auctionActions = auctionSlice.actions;
export default auctionSlice;
