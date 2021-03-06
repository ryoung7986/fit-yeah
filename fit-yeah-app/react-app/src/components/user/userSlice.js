import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const updateUser = createAsyncThunk(
  'users/getUser',
  async (id) => {
    const response = await fetch(`/api/users/${id}`)
    return await response.json()
  }
)

export const updateUserBio = createAsyncThunk(
  'users/updateUserBio',
  async (data) => {
    const { userId, bio } = data;
    const response = await fetch(`/api/users/upload-bio/${userId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ bio })
    })
    return await response.json();
  }
)

export const getFollowers = createAsyncThunk(
  'user/getFollowers',
  async (userId) => {
    const response = await fetch(`/api/users/${userId}/followers`);
    return await response.json();
  }
)

export const getFollowing = createAsyncThunk(
  'users/getFollowing',
  async (userId) => {
    const response = await fetch(`/api/users/${userId}/following`);
    return await response.json();
  }
)

export const submitFollow = createAsyncThunk(
  'users/submitFollow',
  async (data) => {
    const { userId, id } = data;
    const response = await fetch(`/api/users/follow/${userId}/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
    })
    return await response.json()
  }
)

export const submitUnfollow = createAsyncThunk(
  'users/submitUnfollow',
  async (data) => {
    const { userId, id } = data;
    const response = await fetch(`/api/users/unfollow/${userId}/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
    })
    return await response.json()
  }
)

export const submitLike = createAsyncThunk(
  'users/submitLike',
  async (data) => {
    const { userId, postId } = data;
    const response = await fetch(`/api/users/${userId}/${postId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId, postId })
    })
    return await response.json();
  }
)

export const postUserPoints = createAsyncThunk(
  'users/postUserPoints',
  async (data) => {
    const { pointsToSubmit, user_id } = data;
    const response = await fetch(`/api/users/add-points`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        pointsToSubmit: Math.floor(parseInt(pointsToSubmit)),
        user_id
      })
    })
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

export const uploadUserAvatar = createAsyncThunk(
  'user/uploadUserAvatar',
  async (data) => {
    const { image, userId } = data;
    console.log('Uploading image...');
    let formData = new FormData();
    formData.append('image', image);
    const response = await fetch('/api/aws/upload', {
      method: 'POST',
      body: formData
    })
    const responseData = await response.json();
    const imgUrl = responseData.img_url
    console.log("image upload successful")
    console.log("uploading user avatar URL...")
    const avatarResponse = await fetch(`/api/users/upload-avatar/${userId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ imgUrl })
    })
    const avatarResponseData = await avatarResponse.json();
    return avatarResponseData.avatar_url
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
      state.followers = payload.followers
    },
    [getFollowing.fulfilled]: (state, { payload }) => {
      state.following = payload.following
    },
    [uploadUserAvatar.fulfilled]: (state, { payload }) => {
      state.user.avatar_url = payload
    },
    [submitFollow.fulfilled]: (state, { payload }) => {
      state.user = payload
    },
    [submitUnfollow.fulfilled]: (state, { payload }) => {
      state.user = payload
    },
    [updateUserBio.fulfilled]: (state, { payload }) => {
      state.user = payload.user
    },
    [submitLike.fulfilled]: (state, { payload }) => {
      state.user = payload
    },
    [postUserPoints.fulfilled]: (state, { payload }) => {
      state.user = payload
    }
  }
});

export const {
  addUser,
  addFollowers,
  addFollowing,
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
