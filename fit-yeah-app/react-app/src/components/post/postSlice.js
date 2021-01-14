import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const getPosts = createAsyncThunk(
  'posts/getPosts',
  async (id) => {
    return fetch(`/api/posts/${id}`)
      .then((res) => res.json())
  }
)

const postSlice = createSlice({
  name: 'posts',
  initialState: {
    list: [],
    post_users: [],
    status: null,
  },
  extraReducers: {
    [getPosts.pending]: (state, action) => {
      state.status = 'loading posts...'
    },
    [getPosts.fulfilled]: (state, { payload }) => {
      state.list = payload.posts.reverse()
      state.status = 'successfully loaded posts'
    },
    [getPosts.rejected]: (state, action) => {
      state.status = 'failed loading posts'
    },
  },
})

export const selectPosts = state => state.posts.list;

export default postSlice.reducer
