import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userInfo: {},
  IsLogged: false,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    connectUser: (state, action) => {
      (state.userInfo = action.payload), (state.IsLogged = true);
    },
    logoutUser: (state) => {
      (state.userInfo = {}), (state.IsLogged = false);
    },
  },
});

export const { connectUser, logoutUser } = userSlice.actions;
export const selectUser = (state) => state.user;
export default userSlice.reducer;
