import React from 'react';
import ReactPlayer from 'react-player';
import './ExerciseCard.css';

function ExerciseCard({ exercise }) {
  return (
    <div className="exerciseCard">
      <div className="videoPlayer">
        <ReactPlayer controls className="react-player" url={exercise.video_url} />
      </div>
      <h2>{exercise.title}</h2>
      <h3>{exercise.muscle_group}</h3>
      <h4>{exercise.description}</h4>
    </div>
  )
}

export default ExerciseCard
