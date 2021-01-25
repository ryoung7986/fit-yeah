import React from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from '../user/userSlice';
import './ProgressBar.css';

function ProgressBar() {
  const user = useSelector(selectUser);
  const userPoints = user.points_earned;
  let done;


  if (userPoints < 1000) {
    done = (userPoints / 1000) * 100
  }
  if (userPoints >= 1000 && userPoints < 3000) {
    done = (userPoints / 3000) * 100
  }
  if (userPoints >= 3000 && userPoints < 6000) {
    done = (userPoints / 6000) * 100
  }
  if (userPoints >= 6000 && userPoints < 10000) {
    done = (userPoints / 10000) * 100
  }
  if (userPoints >= 10000 && userPoints < 15000) {
    done = (userPoints / 15000) * 100
  }
  if (userPoints >= 15000 && userPoints < 21000) {
    done = (userPoints / 21000) * 100
  }
  if (userPoints >= 21000 && userPoints < 28000) {
    done = (userPoints / 28000) * 100
  }
  if (userPoints >= 28000 && userPoints < 36000) {
    done = (userPoints / 36000) * 100
  }
  if (userPoints >= 36000 && userPoints < 45000) {
    done = (userPoints / 45000) * 100
  }
  if (userPoints >= 45000 && userPoints < 55000) {
    done = (userPoints / 55000) * 100
  }
  if (userPoints >= 55000 && userPoints < 66000) {
    done = (userPoints / 66000) * 100
  }
  if (userPoints >= 66000 && userPoints < 78000) {
    done = (userPoints / 78000) * 100
  }
  if (userPoints >= 78000) {
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
        {done < 15 ? null : <p>{Math.floor(done)}%</p>}
      </div>
    </div>
  )
}

export default ProgressBar
