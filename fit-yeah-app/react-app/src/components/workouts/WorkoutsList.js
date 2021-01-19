import React from 'react';
import { useSelector } from 'react-redux';
import { selectWorkouts } from './workoutSlice';
import Workout from './Workout';
import './WorkoutsList.css'

function WorkoutsList() {
  const workouts = useSelector(selectWorkouts);

  return (
    <div>
      {workouts.slice().reverse().map((workout) => (
        <Workout workout={workout} />
      ))}
    </div>
  )
}

export default WorkoutsList
