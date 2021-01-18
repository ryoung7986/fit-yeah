import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const getWorkouts = createAsyncThunk(
  'workouts/getWorkouts',
  async () => {
    return fetch(`/api/workouts`)
      .then((res) => res.json())
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
    [getWorkouts.pending]: (state, action) => {
      state.status = 'fetching workouts...'
    },
    [getWorkouts.fulfilled]: (state, { payload }) => {
      state.workouts = payload;
      state.status = 'successfully fetched workouts'
    },
    [getWorkouts.rejected]: (state, action) => {
      state.status = 'failed fetching workouts'
    },
  }
});

export const {
  addWorkouts,
  addWorkoutPlan
} = workoutSlice.actions;


export const selectWorkouts = state => state.workouts.workouts;

export default workoutSlice.reducer;
