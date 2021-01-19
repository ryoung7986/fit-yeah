import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const addAllUsersToState = createAsyncThunk(
  'user/addAllUsersToState',
  async () => {
    const response = await fetch(`/api/users`)
    return await response.json()
  }
)

export const followUser = createAsyncThunk(
  'user/followUser',
  async (userId, id) => {
    const response = await fetch(`/api/users/follow`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        userId,
        id
      })
    })
    return await response.json()
  }
)

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,
    users: {},
    followers: null,
    following: null,
  },
  reducers: {
    addUser: (state, action) => {
      state.user = action.payload.user;
    },
    addUserAvatarUrl: (state, action) => {
      state.user.avatar_url = action.payload;
    },
    addFollowers: (state, action) => {
      state.followers = action.payload.followers;
    },
    addFollowing: (state, action) => {
      state.following = action.payload.following;
    },
  },
  extraReducers: {
    [addAllUsersToState.fulfilled]: (state, { payload }) => {
      state.users = payload.users;
    },
    [followUser.fulfilled]: (state, { payload }) => {
      state.user = payload.user
    }
  }
});

export const {
  addUser,
  addFollowers,
  addFollowing,
  addUserAvatarUrl,
} = userSlice.actions;


export const selectUser = state => state.user.user;
export const selectUserBio = state => state.user.user.bio;
export const selectFollowing = state => state.user.following;
export const selectUserWorkoutPlan = state => state.user.user.workout_plan
export const selectAllUsers = state => state.user.users
export const selectUserAvatarUrl = state => state.user.user.avatar_url

export default userSlice.reducer;
