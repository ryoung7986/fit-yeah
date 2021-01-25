import React from 'react';
import { useLocation } from 'react-router-dom';
import ExerciseCard from '../exercises/ExerciseCard';
import './WorkoutInfoPage.css';

function WorkoutInfoPage() {
  const location = useLocation();
  const workout = location.state.workout.workout;

  return (
    <div className="workoutInfo">
      <div className="workoutInfo__workout">
        <div className="workout__title">
          <h2>{workout.title}</h2>
          <h5>{workout.subtitle}</h5>
        </div>
        <div className="workout__description">
          <h6>{workout.description}</h6>
        </div>
      </div>
      <ol className="workoutList">
        {workout.exercises.map(workout => <li>{workout.title}</li>)}
      </ol>
      <div className="workoutInfo__exercises">
        {workout.exercises.map(exercise => (
          <ExerciseCard exercise={exercise} />
        ))}
      </div>
    </div>
  )
}

export default WorkoutInfoPage
