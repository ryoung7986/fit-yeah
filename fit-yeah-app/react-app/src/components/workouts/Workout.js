import React from 'react';
import './Workout.css';

function Workout({ workout }) {
  return (
    <div className="workout">
      <div className="workout__title">
        <h2>{workout.title}</h2>
        <h5>{workout.subtitle}</h5>
      </div>
      <div className="workout__description">
        <h4>{workout.description}</h4>
      </div>
    </div>
  )
}

export default Workout
