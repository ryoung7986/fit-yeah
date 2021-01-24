import React from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from '../user/userSlice';
import './ProgressBar.css';

function ProgressBar() {
  const user = useSelector(selectUser);
  const userPoints = user.points_earned;
  let done;


  if (userPoints < 100) {
    done = (userPoints / 100) * 100
  }
  if (userPoints >= 100 && userPoints < 500) {
    done = (userPoints / 500) * 100
  }
  if (userPoints >= 500 && userPoints < 1000) {
    done = (userPoints / 1000) * 100
  }
  if (userPoints >= 1000 && userPoints < 1500) {
    done = (userPoints / 1500) * 100
  }
  if (userPoints >= 1500 && userPoints < 2000) {
    done = (userPoints / 2000) * 100
  }
  if (userPoints >= 2000 && userPoints < 2500) {
    done = (userPoints / 2500) * 100
  }
  if (userPoints >= 2500 && userPoints < 3000) {
    done = (userPoints / 3000) * 100
  }
  if (userPoints >= 3000 && userPoints < 3500) {
    done = (userPoints / 3500) * 100
  }
  if (userPoints >= 3500 && userPoints < 4000) {
    done = (userPoints / 4000) * 100
  }
  if (userPoints >= 4000 && userPoints < 4500) {
    done = (userPoints / 4500) * 100
  }
  if (userPoints >= 4500 && userPoints < 5000) {
    done = (userPoints / 5000) * 100
  }
  if (userPoints >= 5000 && userPoints < 5500) {
    done = (userPoints / 5500) * 100
  }
  if (userPoints >= 5500) {
    done = 100
  }


  return (
    <div className="progress">
      <div
        className="progress-done"
        style={{
          opacity: 1,
          width: `${done}%`
        }}
      >
        <p>{Math.floor(done)}%</p>
      </div>
    </div>
  )
}

export default ProgressBar
