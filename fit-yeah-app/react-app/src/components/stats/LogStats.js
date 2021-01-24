import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addUser } from '../user/userSlice';
import Button from '@material-ui/core/Button';
import './LogStats.css';

function LogStats({ exercise, userId }) {
  const [sets, setSets] = useState(null);
  const [reps, setReps] = useState(null);
  const [step, setStep] = useState(0);
  const [pointsEarned, setPointsEarned] = useState(0);
  const dispatch = useDispatch();

  const onSubmit = async (e) => {
    e.preventDefault();
    const hiddenValue = document.getElementById('id');
    const exercise_id = parseInt(hiddenValue.value);
    const user_id = userId;
    const pointsToSubmit = sets * reps * exercise.difficulty;
    const response = await fetch(`/api/users/upload-stats`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        sets,
        reps,
        user_id,
        exercise_id,
      })
    })
    await response.json();
    const postUserPoints = await fetch(`/api/users/add-points`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        pointsToSubmit,
        user_id
      })
    })
    const newUser = await postUserPoints.json();
    dispatch(addUser({ user: newUser }))
    setPointsEarned(pointsToSubmit)
    setStep(1);
  }

  const updateSets = (e) => {
    setSets(e.target.value);
  }

  const updateReps = (e) => {
    setReps(e.target.value);
  }

  return (
    <div className="logStats">
      {step === 0 ? (
        <form className="userStats__form" onSubmit={onSubmit}>
          <div className="create-workout__form--div">
            <label><h3>{exercise.title}</h3></label>
            <div className="inputs">
              <div className="navbar__input">
                <input
                  className="create-workout__form--input"
                  type="text"
                  name="sets"
                  value={sets}
                  onChange={updateSets}
                  placeholder="Sets" />
              </div>
              <div className="navbar__input">
                <input
                  className="create-workout__form--input"
                  type="text"
                  name="reps"
                  value={reps}
                  onChange={updateReps}
                  placeholder="Reps" />
              </div>
              <div className="navbar__input--hidden">
                <input
                  type="hidden"
                  id="id"
                  name="exercise_id"
                  value={exercise.id} />
              </div>
              <Button
                type="submit"
                variant="outlined"
                className="signup__button">
                Log Stats
              </Button>
            </div>
          </div>
        </form>
      ) :
        <div className="pointsEarned">
          <h3>{`You earned ${pointsEarned} points!`}</h3>
        </div>
      }

    </div>
  )
}

export default LogStats
