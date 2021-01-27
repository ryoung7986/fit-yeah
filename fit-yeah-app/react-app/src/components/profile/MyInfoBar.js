import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import moment from 'moment';
import { selectWorkouts } from '../workouts/workoutSlice';
import { selectUser } from '../user/userSlice';
import Button from '@material-ui/core/Button';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import './MyInfoBar.css'

function MyInfoBar() {
  const user = useSelector(selectUser);
  const workoutPlan = user ? user.workout_plan[0] : null;
  const workouts = useSelector(selectWorkouts);
  const today = moment().format('dddd');


  const mon = workoutPlan && workouts.filter((workout) => {
    return workout.id === workoutPlan['mon']
  })

  const tue = workoutPlan && workouts.filter((workout) => {
    return workout.id === workoutPlan['tue']
  })

  const wed = workoutPlan && workouts.filter((workout) => {
    return workout.id === workoutPlan['wed']
  })

  const thurs = workoutPlan && workouts.filter((workout) => {
    return workout.id === workoutPlan['thurs']
  })

  const fri = workoutPlan && workouts.filter((workout) => {
    return workout.id === workoutPlan['fri']
  })

  const sat = workoutPlan && workouts.filter((workout) => {
    return workout.id === workoutPlan['sat']
  })

  const sun = workoutPlan && workouts.filter((workout) => {
    return workout.id === workoutPlan['sun']
  })

  return (
    <div className="infobar">
      <div className="infobar__header">
        <h2>My Workout Plan</h2>
      </div>
      {!workoutPlan ?
        <Button
          component={NavLink} to="/my-workout-plan/new"
          variant="contained"
          style={{ textTransform: 'none' }}
          startIcon={<CloudUploadIcon />}
        >
          Create your workout plan!
        </Button>
        :
        <div className="workout__plan">
          <NavLink
            className={today === 'Monday' ?
              'workout__plan--option activesauce' :
              'workout__plan--option'}
            style={{ textDecoration: 'none' }}
            to={{
              pathname: '/my-stats',
              state: { workout: { mon } }
            }}
          >
            <div>
              <h3>Monday:</h3>
              {mon[0] ? mon[0].title : <p>Day off</p>}
            </div>
          </NavLink>
          <NavLink
            className={today === 'Tuesday' ?
              'workout__plan--option activesauce' :
              'workout__plan--option'}
            style={{ textDecoration: 'none' }}
            to={{
              pathname: '/my-stats',
              state: { workout: { tue } }
            }}
          >
            <div>
              <h3>Tuesday:</h3>
              {tue[0] ? tue[0].title : <p>Day off</p>}
            </div>
          </NavLink>
          <NavLink
            className={today === 'Wednesday' ?
              'workout__plan--option activesauce' :
              'workout__plan--option'}
            style={{ textDecoration: 'none' }}
            to={{
              pathname: '/my-stats',
              state: { workout: { wed } }
            }}
          >
            <div>
              <h3>Wednesday:</h3>
              {wed[0] ? wed[0].title : <p>Day off</p>}
            </div>
          </NavLink>
          <NavLink
            className={today === 'Thursday' ?
              'workout__plan--option activesauce' :
              'workout__plan--option'}
            style={{ textDecoration: 'none' }}
            to={{
              pathname: '/my-stats',
              state: { workout: { thurs } }
            }}
          >
            <div>
              <h3>Thursday:</h3>
              {thurs[0] ? thurs[0].title : <p>Day off</p>}
            </div>
          </NavLink>
          <NavLink
            className={today === 'Friday' ?
              'workout__plan--option activesauce' :
              'workout__plan--option'}
            style={{ textDecoration: 'none' }}
            to={{
              pathname: '/my-stats',
              state: { workout: { fri } }
            }}
          >
            <div>
              <h3>Friday:</h3>
              {fri[0] ? fri[0].title : <p>Day off</p>}
            </div>
          </NavLink>
          <NavLink
            className={today === 'Saturday' ?
              'workout__plan--option activesauce' :
              'workout__plan--option'}
            style={{ textDecoration: 'none' }}
            to={{
              pathname: '/my-stats',
              state: { workout: { sat } }
            }}
          >
            <div>
              <h3>Saturday:</h3>
              {sat[0] ? sat[0].title : <p>Day off</p>}
            </div>
          </NavLink>
          <NavLink
            className={today === 'Sunday' ?
              'workout__plan--option activesauce' :
              'workout__plan--option'}
            style={{ textDecoration: 'none' }}
            to={{
              pathname: '/my-stats',
              state: { workout: { tue } }
            }}
          >
            <div>
              <h3>Sunday:</h3>
              {sun[0] ? sun[0].title : <p>Day off</p>}
            </div>
          </NavLink>
        </div>}
    </div>
  )
}

export default MyInfoBar
