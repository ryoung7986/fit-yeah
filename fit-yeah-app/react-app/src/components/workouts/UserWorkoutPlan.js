import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import moment from 'moment';
import { selectWorkouts, addWorkoutPlan } from '../workouts/workoutSlice';
import { selectUser, deleteUserPlan } from '../user/userSlice';
import Button from '@material-ui/core/Button';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';

function UserWorkoutPlan() {
  const user = useSelector(selectUser);
  const workoutPlan = user ? user.workout_plan[0] : null;
  const workouts = useSelector(selectWorkouts);
  const today = moment().format('dddd');
  const dispatch = useDispatch();

  console.log(workoutPlan)
  console.log(workouts)

  return (
    <div>
      <h1>Workout Plan</h1>
    </div>
  )
}

export default UserWorkoutPlan
