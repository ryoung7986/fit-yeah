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
      console.log(action.payload['workouts']);
      state.workouts = action.payload['workouts'];
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
  addWorkouts
} = workoutSlice.actions;


export const selectWorkouts = state => state.workouts.workouts;

export default workoutSlice.reducer;
