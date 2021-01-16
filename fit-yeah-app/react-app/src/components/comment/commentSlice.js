import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const getComments = createAsyncThunk(
  'comments/getComments',
  async (postId) => {
    const res = await fetch(`api/comments/${postId}`);
    return await res.json();
  }
)

const commentSlice = createSlice({
  name: "comments",
  initialState: {
    post_comments: [],
    status: null,
  },
  extraReducers: {
    [getComments.pending]: (state, action) => {
      state.status = 'loading comments...'
    },
    [getComments.fulfilled]: (state, action) => {
      // console.log(action.payload.comments)
      state.post_comments.push(...action.payload.comments)
    },
    [getComments.rejected]: (state, action) => {
      state.status = 'failed loading comments'
    },
  },
})

export const selectComments = (state) => state.comments;
// export const selectComments = (state, id) => state.comments.post_comments['comments_post_6'];
export default commentSlice.reducer
