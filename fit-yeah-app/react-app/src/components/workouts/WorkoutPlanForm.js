import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { selectWorkouts } from './workoutSlice';
import { selectUser, updateUser } from '../user/userSlice';
import Button from '@material-ui/core/Button';
import './WorkoutPlanForm.css';

function WorkoutPlanForm() {
  const [mon, setMon] = useState(1);
  const [tue, setTue] = useState(1);
  const [wed, setWed] = useState(1);
  const [thurs, setThurs] = useState(1);
  const [fri, setFri] = useState(1);
  const [sat, setSat] = useState(1);
  const [sun, setSun] = useState(1);
  const workouts = useSelector(selectWorkouts);
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const history = useHistory();

  const onSubmit = async (e) => {
    e.preventDefault();
    const user_id = user.id
    const response = await fetch('/api/workouts/workout-plan/new', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        user_id,
        mon,
        tue,
        wed,
        thurs,
        fri,
        sat,
        sun,
      })
    })
    const responseData = await response.json()
    dispatch(updateUser(user.id))
    history.push('/my-profile')
    return responseData
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
              {workoutMap}
            </select>
          </div>
          <div className="input">
            <label for="tuesday">Tuesday</label>
            <select value={tue} onChange={(e) => setTue(e.target.value)}>
              {workoutMap}
            </select>
          </div>
          <div className="input">
            <label for="wednesday">Wednesday</label>
            <select value={wed} onChange={(e) => setWed(e.target.value)}>
              {workoutMap}
            </select>
          </div>
          <div className="input">
            <label for="thursday">Thursday</label>
            <select value={thurs} onChange={(e) => setThurs(e.target.value)}>
              {workoutMap}
            </select>
          </div>
          <div className="input">
            <label for="friday">Friday</label>
            <select value={fri} onChange={(e) => setFri(e.target.value)}>
              {workoutMap}
            </select>
          </div>
          <div className="input">
            <label for="saturday">Saturday</label>
            <select value={sat} onChange={(e) => setSat(e.target.value)}>
              {workoutMap}
            </select>
          </div>
          <div className="input">
            <label for="sunday">Sunday</label>
            <select value={sun} onChange={(e) => setSun(e.target.value)}>
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
