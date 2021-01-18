import React from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from '../user/userSlice';

import './MyInfoBar.css'

function MyInfoBar() {
  const user = useSelector(selectUser);

  console.log(user);

  return (
    <div className="infobar">
      <div className="infobar__header">
        <h2>My Workout Plan</h2>
      </div>
    </div>
  )
}

export default MyInfoBar
