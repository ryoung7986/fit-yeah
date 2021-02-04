import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const getComments = createAsyncThunk(
  'comments/getComments',
  async (postId) => {
    const res = await fetch(`api/comments/${postId}`);
    return await res.json();
  }
)

export const postComment = createAsyncThunk(
  'comments/postComment',
  async (data) => {
    const { content, userId, postId } = data
    let formData = new FormData();
    formData.append('content', content);
    formData.append('user_id', userId)
    formData.append('post_id', postId);
    const response = await fetch('api/comments/new', {
      method: 'POST',
      body: formData
    })
    return await response.json()
  }
)

const commentSlice = createSlice({
  name: "comments",
  initialState: {
    post_comments: [],
    status: null,
  },
  extraReducers: {
    [getComments.fulfilled]: (state, { payload }) => {
      state.post_comments.push(...payload.comments)
    },
    [postComment.fulfilled]: (state, { payload }) => {
      state.post_comments.push(payload)
    }
  },
})

export const selectComments = (state) => state.comments;

export default commentSlice.reducer
