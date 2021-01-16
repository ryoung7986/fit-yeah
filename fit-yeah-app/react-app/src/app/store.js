import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../components/user/userSlice';
import postReducer from '../components/post/postSlice';
import commentReducer from '../components/comment/commentSlice';

export default configureStore({
  reducer: {
    user: userReducer,
    posts: postReducer,
    comments: commentReducer,
  },
});
