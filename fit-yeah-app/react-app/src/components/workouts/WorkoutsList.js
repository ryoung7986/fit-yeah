import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { selectWorkouts } from './workoutSlice';
import Workout from './Workout';
import SearchWorkouts from './SearchWorkouts';
import './WorkoutsList.css'

function WorkoutsList() {
  const workouts = useSelector(selectWorkouts);

  return (
    <div className="workoutsList">
      <div className="workoutsList__search">
        <SearchWorkouts />
      </div>
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
    </div>
  )
}

export default WorkoutsList
