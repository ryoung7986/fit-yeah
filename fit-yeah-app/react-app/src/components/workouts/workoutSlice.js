import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const getWorkouts = createAsyncThunk(
  'workouts/getWorkouts',
  async () => {
    return fetch(`/api/workouts`)
      .then((res) => res.json())
  }
)

export const getWorkoutExercises = createAsyncThunk(
  'workouts/getWorkoutExercises',
  async (id) => {
    return fetch(`api/workouts/exercises/${id}`)
  }
)

export const workoutSlice = createSlice({
  name: 'workouts',
  initialState: {},
  reducers: {
    addWorkouts: (state, action) => {
      state.workouts = action.payload['workouts'];
    },
    addWorkoutPlan: (state, action) => {
      console.log(action.payload['workout_plan'])
    }
  },
  extraReducers: {
    [getWorkouts.fulfilled]: (state, { payload }) => {
      state.workouts = payload;
    },
  }
});

export const {
  addWorkouts,
  addWorkoutPlan
} = workoutSlice.actions;


export const selectWorkouts = state => state.workouts.workouts;
export const selectWorkoutExercises = (state, id) => state.filter(workout => workout.id === id)

export default workoutSlice.reducer;
