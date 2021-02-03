import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const getExercises = createAsyncThunk(
  'exercises/getExercises',
  async () => {
    const response = await fetch('/api/exercises');
    const responseData = await response.json();
    console.log(responseData);
    return responseData.exercises
  }
)

export const exerciseSlice = createSlice({
  name: 'exercises',
  initialState: {
    exercises: [],
  },
  reducers: {
    addExercises: (state, action) => {
      state.exercises = action.payload['exercises']
    }
  },
  extraReducers: {
    [getExercises.pending]: (state, action) => {
      state.status = 'fetching workouts...'
    },
    [getExercises.fulfilled]: (state, action) => {
      console.log(action.payload)
      state.exercises = action.payload;
      state.status = 'successfully fetched workouts'
    },
    [getExercises.rejected]: (state, action) => {
      state.status = 'failed fetching workouts'
    },
  }
});

export const {
  addExercises
} = exerciseSlice.actions;


export const selectExercises = state => state.exercises.exercises;

export default exerciseSlice.reducer;
