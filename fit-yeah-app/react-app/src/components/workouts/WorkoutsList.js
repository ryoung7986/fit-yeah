import React from 'react';
import { useSelector } from 'react-redux';
import { selectWorkouts } from '../workouts/WorkoutSlice';
import Workout from './Workout';
import './WorkoutsList.css'

function WorkoutsList() {
  const workouts = useSelector(selectWorkouts);

  return (
    <div>
      {workouts.map((workout) => (
        <Workout workout={workout} />
      ))}
    </div>
  )
}

export default WorkoutsList
