import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { selectUser } from '../user/userSlice';
import Button from '@material-ui/core/Button';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';

import './MyInfoBar.css'

function MyInfoBar() {
  const user = useSelector(selectUser);
  const workoutPlan = user.workout_plan;

  return (
    <div className="infobar">
      <div className="infobar__header">
        <h2>My Workout Plan</h2>
      </div>
      {workoutPlan.length < 1 && (
        <Button
          component={NavLink} to="/my-workout-plan/new"
          variant="contained"
          style={{ textTransform: 'none' }}
          startIcon={<CloudUploadIcon />}
          onClick={() => console.log("sup")}
        >
          Create your workout plan!
        </Button>
      )}
    </div>
  )
}

export default MyInfoBar
