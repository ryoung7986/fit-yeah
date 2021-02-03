import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';


export const updateUser = createAsyncThunk(
  'user/getUser',
  async (id) => {
    const response = await fetch(`/api/users/${id}`)
    return await response.json()
  }
)

export const getFollowers = createAsyncThunk(
  'user/getFollowers',
  async (userId) => {
    const response = await fetch(`/api/users/${userId}/followers`);
    const responseData = await response.json();
    return responseData.followers
  }
)

export const getFollowing = createAsyncThunk(
  'user/getFollowing',
  async (userId) => {
    const response = await fetch(`/api/users/${userId}/following`);
    const responseData = await response.json();
    return responseData.following
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

export const uploadUserAvatar = createAsyncThunk(
  'user/uploadUserAvatar',
  async (data, userId) => {
    console.log(userId)
    console.log('Uploading image...');
    let formData = new FormData();
    formData.append('image', data);
    const response = await fetch('/api/aws/upload', {
      method: 'POST',
      body: formData
    })
    const responseData = await response.json();
    console.log("image upload successful")
    console.log("uploading user avatar URL...")
    return responseData
  }
)

export const deleteUserPlan = createAsyncThunk(
  'user/deleteUserPlan',
  async (userId) => {
    const response = await fetch(`api/users/delete-plan/${userId}`, {
      method: 'DELETE'
    })
    return await response.json()
  }
)

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,
    users: {},
    followers: [],
    following: [],
    searchUsersResults: []
  },
  reducers: {
    addUser: (state, action) => {
      state.user = action.payload.user
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
    },
    [deleteUserPlan.fulfilled]: (state, { payload }) => {
      state.user = payload
    },
    [getFollowers.fulfilled]: (state, { payload }) => {
      state.followers = payload
    },
    [getFollowing.fulfilled]: (state, { payload }) => {
      state.following = payload
    },
    [uploadUserAvatar.fulfilled]: (state, { payload }) => {
      state.user.avatar_url = payload.img_url
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
