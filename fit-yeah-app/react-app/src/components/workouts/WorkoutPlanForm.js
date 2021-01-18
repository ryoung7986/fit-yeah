import React from 'react';
import { useSelector } from 'react-redux';
import { selectWorkouts } from './WorkoutSlice';
import './WorkoutPlanForm.css';

function WorkoutPlanForm() {
  const workouts = useSelector(selectWorkouts)
  console.log(workouts);

  const workoutMap = workouts.map((workout) => {
    return (
      <option value={workout.id}>
        {workout.title}
      </option>
    )
  })

  return (
    <div className="workoutPlan">
      <form className="workoutPlan__form">
        <div className="title">
          <h2>Create your plan:</h2>
        </div>
        <div className="input__container">
          <div className="input">
            <label for="monday">Monday</label>
            <select>
              <option>Skip</option>
              {workoutMap}
            </select>
          </div>
          <div className="input">
            <label for="tuesday">Tuesday</label>
            <select>
              <option>Skip</option>
              {workoutMap}
            </select>
          </div>
          <div className="input">
            <label for="wednesday">Wednesday</label>
            <select>
              <option>Skip</option>
              {workoutMap}
            </select>
          </div>
          <div className="input">
            <label for="thursday">Thursday</label>
            <select>
              <option>Skip</option>
              {workoutMap}
            </select>
          </div>
          <div className="input">
            <label for="friday">Friday</label>
            <select>
              <option>Skip</option>
              {workoutMap}
            </select>
          </div>
          <div className="input">
            <label for="saturday">Saturday</label>
            <select>
              <option>Skip</option>
              {workoutMap}
            </select>
          </div>
          <div className="input">
            <label for="sunday">Sunday</label>
            <select>
              <option>Skip</option>
              {workoutMap}
            </select>
          </div>
        </div>
      </form>
    </div>
  )
}

export default WorkoutPlanForm
