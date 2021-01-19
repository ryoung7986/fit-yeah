import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../components/user/userSlice';
import postReducer from '../components/post/postSlice';
import commentReducer from '../components/comment/commentSlice';
import workoutsReducer from '../components/workouts/workoutSlice';
import exerciseReducer from '../components/exercises/exerciseSlice';

export default configureStore({
  reducer: {
    user: userReducer,
    posts: postReducer,
    comments: commentReducer,
    workouts: workoutsReducer,
    exercises: exerciseReducer,
  },
});
