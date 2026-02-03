import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    AuthenticatedUserId: null,
    name: '',
    profilePic: '',
    email:'',
    isLoggedIn: false,
  },
  reducers: {
    login(state, action) {
      state.AuthenticatedUserId = action.payload.id;
      state.name = action.payload.name;
      state.email=action.payload.email;
      state.profilePic = action.payload.profilePic;
      state.isLoggedIn = true;
    },
    logout(state) {
      state.AuthenticatedUserId = null;
      state.name = '';
      state.email='';
      state.profilePic = '';
      state.isLoggedIn = false;
    }
  }
});

export const authActions = authSlice.actions;
export default authSlice;
