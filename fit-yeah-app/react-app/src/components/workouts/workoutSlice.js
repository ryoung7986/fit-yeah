import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const getWorkouts = createAsyncThunk(
  'workouts/getWorkouts',
  async () => {
    const response = await fetch('/api/workouts')
    const responseData = await response.json()
    return responseData.workouts
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
  initialState: {
    searchWorkoutsResults: [],
    userWorkoutPlan: [],
    workouts: [],
  },
  reducers: {
    addWorkouts: (state, action) => {
      state.workouts = action.payload['workouts'];
    },
    addWorkoutPlan: (state, action) => {
      console.log(action.payload['workout_plan'])
    },
    searchWorkoutsResults: (state, action) => {
      console.log(action.payload)
      state.searchWorkoutsResults = action.payload
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
  addWorkoutPlan,
  searchWorkoutsResults
} = workoutSlice.actions;


export const selectWorkouts = state => state.workouts.workouts;
export const selectWorkoutExercises = (state, id) => state.filter(workout => workout.id === id)
export const selectWorkoutSearchResults = state => state.workouts.searchWorkoutsResults

export default workoutSlice.reducer;
