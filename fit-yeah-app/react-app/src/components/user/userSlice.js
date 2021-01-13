import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,
    followers: null,
    following: null,
  },
  reducers: {
    addUser: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.user = action.payload.user;
    },
    addFollowers: (state, action) => {
      state.followers = action.payload.followers;
    },
    addFollowing: (state, action) => {
      state.following = action.payload.following;
    },
  },
});

export const {
  addUser,
  addFollowers,
  addFollowing,
  addUserPosts,
  addAllPosts
} = userSlice.actions;


export const selectUser = state => state.user;
export const selectFollowing = state => state.user.following;

export default userSlice.reducer;
