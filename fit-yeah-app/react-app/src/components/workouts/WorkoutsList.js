import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { selectWorkouts } from './workoutSlice';
import Workout from './Workout';
import './WorkoutsList.css'

function WorkoutsList() {
  const workouts = useSelector(selectWorkouts);

  return (
    <div>
      {workouts && workouts.slice().reverse().map((workout) => (
        <NavLink
          style={{ textDecoration: 'none' }}
          to={{
            pathname: '/my-workout-plan',
            state: { workout: { workout } }
          }}>
          <Workout workout={workout} />
        </NavLink>
      ))}
    </div>
  )
}

export default WorkoutsList
