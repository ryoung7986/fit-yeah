import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const getExercises = createAsyncThunk(
  'exercises/getExercises',
  async () => {
    console.log("FUCK")
    return fetch(`/api/exercises`)
      .then((res) => res.json())
  }
)

export const exerciseSlice = createSlice({
  name: 'exercises',
  initialState: {},
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
      console.log(action)
      state = action.payload;
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


export const selectExercises = state => state.exercises;

export default exerciseSlice.reducer;
