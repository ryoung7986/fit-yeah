import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const getPosts = createAsyncThunk(
  'posts/getPosts',
  async (id) => {
    const response = await fetch(`/api/posts/${id}`);
    return await response.json();
  }
)

export const makePost = createAsyncThunk(
  'posts/makePost',
  async (data) => {
    const { formData, id } = data;
    const newPost = await fetch('api/posts/new', {
      method: 'POST',
      body: formData
    })
    const newPostData = await newPost.json()
    const postsById = await fetch(`/api/posts/${id}`);
    return await postsById.json();
  }
)

export const deletePost = createAsyncThunk(
  'posts/deletePost',
  async (id) => {
    const response = await fetch(`api/posts/delete/${id}`)
    return await response.json()
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
    [getPosts.fulfilled]: (state, { payload }) => {
      state.list = payload.posts.reverse()
      state.status = 'successfully loaded posts'
    },
    [deletePost.fulfilled]: (state, { payload }) => {
      state.list = payload.posts.reverse()
      state.status = 'successfully deleted post'
    },
    [makePost.fulfilled]: (state, { payload }) => {
      state.list = payload.posts.reverse()
    },
  },
})

export const selectPosts = state => state.posts.list;

export default postSlice.reducer;
