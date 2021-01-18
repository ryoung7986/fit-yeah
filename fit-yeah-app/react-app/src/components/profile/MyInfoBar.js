import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectWorkouts } from '../workouts/WorkoutSlice';
import { NavLink } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';

import './MyInfoBar.css'

function MyInfoBar({ user }) {
  const workoutPlan = user.workout_plan[0];
  const workouts = useSelector(selectWorkouts);

  const mon = workouts.filter((workout) => {
    return workout.id === workoutPlan['mon']
  })

  const tue = workouts.filter((workout) => {
    return workout.id === workoutPlan['tue']
  })

  const wed = workouts.filter((workout) => {
    return workout.id === workoutPlan['wed']
  })

  const thurs = workouts.filter((workout) => {
    return workout.id === workoutPlan['thurs']
  })

  const fri = workouts.filter((workout) => {
    return workout.id === workoutPlan['fri']
  })

  const sat = workouts.filter((workout) => {
    return workout.id === workoutPlan['sat']
  })

  const sun = workouts.filter((workout) => {
    return workout.id === workoutPlan['sun']
  })

  console.log(tue[0])

  return (
    <div className="infobar">
      <div className="infobar__header">
        <h2>My Workout Plan</h2>
      </div>
      {user.workout_plan.length < 1 && (
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
      <div className="workout__plan">
        <div className="workout__plan--option">
          <h3>Monday:</h3>
          {mon[0] ? mon[0].title : <p>Day off</p>}
        </div>
        <div className="workout__plan--option">
          <h3>Tuesday:</h3>
          {tue[0] ? tue[0].title : <p>Day off</p>}
        </div>
        <div className="workout__plan--option">
          <h3>Wednesday:</h3>
          {wed[0] ? wed[0].title : <p>Day off</p>}
        </div>
        <div className="workout__plan--option">
          <h3>Thursday:</h3>
          {thurs[0] ? thurs[0].title : <p>Day off</p>}
        </div>
        <div className="workout__plan--option">
          <h3>Friday:</h3>
          {fri[0] ? fri[0].title : <p>Day off</p>}
        </div>
        <div className="workout__plan--option">
          <h3>Saturday</h3>
          {sat[0] ? sat[0].title : <p>Day off</p>}
        </div>
        <div className="workout__plan--option">
          <h3>Sunday:</h3>
          {sun[0] ? sun[0].title : <p>Day off</p>}
        </div>
      </div>
    </div>
  )
}

export default MyInfoBar
