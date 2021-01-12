import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../components/auth/userSlice';

export default configureStore({
  reducer: {
    user: userReducer,
  },
});
