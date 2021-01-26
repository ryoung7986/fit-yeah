import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';


export const updateUser = createAsyncThunk(
  'user/getUser',
  async (id) => {
    const response = await fetch(`/api/users/${id}`)
    return await response.json()
  }
)

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
    searchUsersResults: []
  },
  reducers: {
    addUser: (state, action) => {
      state.user = action.payload.user
    },
    addUserAvatarUrl: (state, action) => {
      state.user.avatar_url = action.payload
    },
    addWorkoutPlan: (state, action) => {
      state.user.workout_plan = action.payload
    },
    addFollowers: (state, action) => {
      state.followers = action.payload.followers
    },
    addFollowing: (state, action) => {
      state.following = action.payload.following
    },
    searchUsersResults: (state, action) => {
      console.log(action.payload)
      state.searchUsersResults = action.payload
    }
  },
  extraReducers: {
    [addAllUsersToState.fulfilled]: (state, { payload }) => {
      state.users = payload.users
    },
    [followUser.fulfilled]: (state, { payload }) => {
      state.user = payload.user
    },
    [updateUser.fulfilled]: (state, { payload }) => {
      state.user = payload
    }
  }
});

export const {
  addUser,
  addFollowers,
  addFollowing,
  addUserAvatarUrl,
  addWorkoutPlan,
  searchUsersResults,
} = userSlice.actions;


export const selectUser = state => state.user.user;
export const selectUserBio = state => state.user.user.bio;
export const selectFollowing = state => state.user.following;
export const selectFollowers = state => state.user.followers;
export const selectAllUsers = state => state.user.users;
export const selectUserAvatarUrl = state => state.user.user.avatar_url;
export const selectUsersSearchResults = state => state.user.searchUsersResults;

export default userSlice.reducer;
