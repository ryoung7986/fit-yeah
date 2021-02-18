import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { postUserPoints } from '../user/userSlice';
import Button from '@material-ui/core/Button';
import './LogStats.css';

function LogStats({ exercise, userId }) {
  const [sets, setSets] = useState(null);
  const [reps, setReps] = useState(null);
  const [weight, setWeight] = useState(null);
  const [duration, setDuration] = useState(null);
  const [step, setStep] = useState(0);
  const [pointsEarned, setPointsEarned] = useState(0);
  const dispatch = useDispatch();


  const onSubmitTemp = async (e) => {
    e.preventDefault();
    const user_id = userId;

    let pointsToSubmit;
    if (weight !== null) {
      const lbs = parseInt(weight);
      const diff = sets * reps
      pointsToSubmit = diff + lbs
    } else if (duration !== null) {
      pointsToSubmit = duration * 3
    } else {
      pointsToSubmit = sets * reps * exercise.difficulty
    }

    dispatch(postUserPoints({ pointsToSubmit, user_id }))
    setPointsEarned(pointsToSubmit)
    setStep(1);
  }

  const updateSets = (e) => {
    setSets(e.target.value);
  }

  const updateReps = (e) => {
    setReps(e.target.value);
  }

  const updateWeight = (e) => {
    setWeight(e.target.value);
  }

  const updateDuration = (e) => {
    setDuration(e.target.value);
  }

  return (
    <div className="logStats">
      {step === 0 ? (
        <form className="userStats__form" onSubmit={onSubmitTemp}>
          <div className="create-workout__form--div">
            <label><h3>{exercise.title}</h3></label>
            <div className="inputs">
              {exercise.muscle_group === "Resistance" && (
                <>
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
                </>
              )}
              {exercise.muscle_group === "Added Weight" && (
                <>
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
                  <div className="navbar__input">
                    <input
                      className="create-workout__form--input"
                      type="text"
                      name="reps"
                      value={weight}
                      onChange={updateWeight}
                      placeholder="Weight" />
                  </div>
                </>
              )}
              {exercise.muscle_group === "Cardio" && (
                <>
                  <div className="navbar__input">
                    <input
                      className="create-workout__form--input"
                      type="text"
                      name="duration"
                      value={duration}
                      onChange={updateDuration}
                      placeholder="Duration (in minutes)" />
                  </div>
                </>
              )}
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
          <h3>{`You earned ${Math.floor(pointsEarned)} points!`}</h3>
        </div>
      }

    </div>
  )
}

export default LogStats
