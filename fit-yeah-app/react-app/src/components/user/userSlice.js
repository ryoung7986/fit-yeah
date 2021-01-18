import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const updateUserBio = createAsyncThunk(
  'user/updateUserBio',
  async (id) => {
    return fetch(`/api/users/${id}`)
      .then((res) => res.json())
  }
)

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,
    followers: null,
    following: null,
  },
  reducers: {
    addUser: (state, action) => {
      state.user = action.payload.user;
    },
    // updateUserBio: (state, action) => {
    //   console.log("HELOLOOO")
    //   console.log(action.payload)
    //   state.user.user.bio = action.payload.user.bio;
    // },
    addFollowers: (state, action) => {
      state.followers = action.payload.followers;
    },
    addFollowing: (state, action) => {
      state.following = action.payload.following;
    },
  },
  extraReducers: {
    [updateUserBio.pending]: (state, action) => {
      state.status = 'updating bio...'
    },
    [updateUserBio.fulfilled]: (state, { payload }) => {
      state.user.bio = payload.bio;
      state.status = 'successfully updated bio'
    },
    [updateUserBio.rejected]: (state, action) => {
      state.status = 'failed updating bio'
    },
  }
});

export const {
  addUser,
  addFollowers,
  addFollowing,
  addUserPosts,
  addAllPosts
} = userSlice.actions;


export const selectUser = state => state.user;
export const selectUserBio = state => state.user.user.bio;
export const selectFollowing = state => state.user.following;

export default userSlice.reducer;
