import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectWorkouts } from './WorkoutSlice';
import { selectUser } from '../user/userSlice';
import Button from '@material-ui/core/Button';
import './WorkoutPlanForm.css';

function WorkoutPlanForm() {
  const [mon, setMon] = useState(0);
  const [tues, setTues] = useState(0);
  const [wed, setWed] = useState(0);
  const [thurs, setThurs] = useState(0);
  const [fri, setFri] = useState(0);
  const [sat, setSat] = useState(0);
  const [sun, setSun] = useState(0);
  const workouts = useSelector(selectWorkouts);
  const user = useSelector(selectUser);

  const onSubmit = async (e) => {
    e.preventDefault();
    const userId = user.id
    const response = await fetch('/api/workouts/workout-plan/new', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        userId,
        mon,
        tues,
        thurs,
        fri,
        sat,
        sun,
      })
    })
    const responseData = await response.json()
    console.log(responseData)
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
      <form className="workoutPlan__form" onSubmit={onsubmit}>
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
            <select value={tues} onChange={(e) => setTues(e.target.value)}>
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
          variant="outlined">
          Submit Your Workout Plan!
        </Button>
      </form>
    </div>
  )
}

export default WorkoutPlanForm
