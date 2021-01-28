import React from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { selectUser } from '../user/userSlice';
import LogStats from './LogStats';
import './UserStats.css';

function UserStats() {
  const user = useSelector(selectUser);
  const location = useLocation();
  const idx = Object.keys(location.state.workout);
  const workout = location.state.workout[idx][0];

  console.log(workout.id)

  return (
    <div className="userStats">
      {workout.id === 1 ? (
        <div className="gif">
          <h1>Day off</h1>
        </div>
      ) : (
          <>
            <div className="userStats__header">
              <h1>{workout.title}</h1>
              <h2>Log your stats!</h2>
            </div>
            <div className="userStats__logStats">
              {workout.exercises.map(exercise => (
                <LogStats exercise={exercise} userId={user.id} />
              ))}
            </div >
          </>
        )
      }
    </div >
  )
}

export default UserStats
