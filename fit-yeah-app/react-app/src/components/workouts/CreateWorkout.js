import React, { useState, useEffect } from 'react'
import WorkoutDropdown from './WorkoutDropdown';
import { selectUser } from '../user/userSlice';
import { useSelector } from 'react-redux';
import Button from '@material-ui/core/Button';
import './CreateWorkout.css'

function CreateWorkout() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [exercises, setExercises] = useState("");
  const [workoutId, setWorkoutId] = useState("");
  const [step, setStep] = useState(0);

  const user = useSelector(selectUser)
  const userId = user.id

  const onSubmit = async (e) => {
    e.preventDefault();
    const user_id = userId
    const response = await fetch(`/api/workouts/new`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        user_id,
        title,
        description,
      })
    })
    const responseData = await response.json()
    setWorkoutId(responseData.id)
    setStep(1)
  };

  const updateTitle = (e) => {
    setTitle(e.target.value);
  };

  const updateDescription = (e) => {
    setDescription(e.target.value);
  };

  useEffect(() => {
    (async () => {
      const response = await fetch('/api/exercises');
      const responseData = await response.json();
      setExercises(responseData.exercises)
    })()
  }, [])

  return (
    <>
      {step === 0 && (
        <div className="create-workout">
          <form onSubmit={onSubmit} className="create-workout__form">
            <div className="create-workout__form--title">
              <h2>Title</h2>
              <input
                className="create-workout__form--input"
                type="text"
                name="title"
                onChange={updateTitle}
                value={title}
              ></input>
            </div>
            <div className="create-workout__form--description">
              <h2>Description</h2>
              <input
                className="create-workout__form--input"
                type="text"
                name="description"
                onChange={updateDescription}
                value={description}
              ></input>
            </div>
            <div className="create-workout__button">
              <Button
                variant="contained"
                type="submit">Create Workout</Button>
            </div>
          </form>
        </div>
      )}
      {step === 1 && (
        <div className="workout-dropdown">
          <div className="workout-dropdown__title">
            <h1>Add Exercises</h1>
          </div>
          <WorkoutDropdown title="select exercise" items={exercises} workoutId={workoutId} setStep={setStep} />
        </div>
      )}
      {step === 2 && (
        <div className="thankyou">
          <h1>Workout created! Add it to your workout plan!</h1>
        </div>
      )}
    </>
  )
}

export default CreateWorkout
