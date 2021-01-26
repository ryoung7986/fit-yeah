import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { selectWorkoutSearchResults } from './workoutSlice';
import Workout from './Workout';
import SearchWorkouts from './SearchWorkouts';

function SearchWorkoutsResults() {
  const workoutSearchResults = useSelector(selectWorkoutSearchResults);

  return (
    <div className="workoutsList">
      <div className="workoutsList__search">
        <SearchWorkouts />
      </div>
      <div>
        {workoutSearchResults && workoutSearchResults.map((workout) => (
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

export default SearchWorkoutsResults
