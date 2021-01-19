import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectWorkouts } from './workoutSlice';
import { selectUser, addWorkoutPlan, selectUserWorkoutPlan } from '../user/userSlice';
import Button from '@material-ui/core/Button';
import './WorkoutPlanForm.css';

function WorkoutPlanForm() {
  const [mon, setMon] = useState(null);
  const [tue, setTue] = useState(null);
  const [wed, setWed] = useState(null);
  const [thurs, setThurs] = useState(null);
  const [fri, setFri] = useState(null);
  const [sat, setSat] = useState(null);
  const [sun, setSun] = useState(null);
  const workouts = useSelector(selectWorkouts);
  const workoutPlan = useSelector(selectUserWorkoutPlan);
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  const onSubmit = async (e) => {
    e.preventDefault();
    const user_id = user.id
    console.log(user_id)
    const response = await fetch('/api/workouts/workout-plan/new', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        user_id,
        mon,
        tue,
        thurs,
        fri,
        sat,
        sun,
      })
    })
    const responseData = await response.json()
    dispatch(addWorkoutPlan(responseData))
  }

  const workoutMap = workouts.map((workout) => {
    return (
      <option value={workout.id}>
        {workout.title}
      </option>
    )
  })

  return (
    <div className="workoutPlan">
      <form className="workoutPlan__form" onSubmit={onSubmit}>
        <div className="title">
          <h2>Create your plan:</h2>
        </div>
        <div className="input__container">
          <div className="input">
            <label for="monday">Monday</label>
            <select value={mon} onChange={(e) => setMon(e.target.value)}>
              <option>Skip</option>
              {workoutMap}
            </select>
          </div>
          <div className="input">
            <label for="tuesday">Tuesday</label>
            <select value={tue} onChange={(e) => setTue(e.target.value)}>
              <option>Skip</option>
              {workoutMap}
            </select>
          </div>
          <div className="input">
            <label for="wednesday">Wednesday</label>
            <select value={wed} onChange={(e) => setWed(e.target.value)}>
              <option>Skip</option>
              {workoutMap}
            </select>
          </div>
          <div className="input">
            <label for="thursday">Thursday</label>
            <select value={thurs} onChange={(e) => setThurs(e.target.value)}>
              <option>Skip</option>
              {workoutMap}
            </select>
          </div>
          <div className="input">
            <label for="friday">Friday</label>
            <select value={fri} onChange={(e) => setFri(e.target.value)}>
              <option>Skip</option>
              {workoutMap}
            </select>
          </div>
          <div className="input">
            <label for="saturday">Saturday</label>
            <select value={sat} onChange={(e) => setSat(e.target.value)}>
              <option>Skip</option>
              {workoutMap}
            </select>
          </div>
          <div className="input">
            <label for="sunday">Sunday</label>
            <select value={sun} onChange={(e) => setSun(e.target.value)}>
              <option>Skip</option>
              {workoutMap}
            </select>
          </div>
        </div>
        <Button
          type="submit"
          variant="outlined">
          Submit Your Workout Plan!
        </Button>
      </form>
    </div>
  )
}

export default WorkoutPlanForm
