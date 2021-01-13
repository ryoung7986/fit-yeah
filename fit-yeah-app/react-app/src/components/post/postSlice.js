import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const getPosts = createAsyncThunk(
  'posts/getPosts',
  async (id) => {
    return fetch(`/api/posts/${id}`)
      .then((res) => res.json())
  }
)

// export const makePost = createAsyncThunk(
//   'posts/makePost',
//   async (id) => {
//     const res = await fetch('api/posts/new', {
//       method: 'POST',

//     }
//     )
//     const resData = await res.json
//   }
// )

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
