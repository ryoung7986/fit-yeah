import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../components/user/userSlice';
import postReducer from '../components/post/postSlice';

export default configureStore({
  reducer: {
    user: userReducer,
    posts: postReducer,
  },
});
