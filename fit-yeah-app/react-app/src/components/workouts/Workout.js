import React from 'react';
import './Workout.css';

function Workout({ workout }) {
  return (
    <div className="workout">
      <div className="workout__title">
        <h3>{workout.title}</h3>
        <h5>{workout.subtitle}</h5>
      </div>
      <div className="workout__description">
        <h6>{workout.description}</h6>
      </div>
    </div>
  )
}

export default Workout
