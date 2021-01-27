import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectUser } from '../user/userSlice';
import { getPosts } from '../post/postSlice';
import { addWorkouts } from './workoutSlice';
import Button from '@material-ui/core/Button';
import './WorkoutDropdown.css';

function WorkoutDropdown({ title, items, workoutId, setStep }) {
  const [open, setOpen] = useState(false);
  const [selection, setSelection] = useState([]);
  const [render, setRender] = useState(false);
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  console.log(user);

  const toggle = () => setOpen(!open);

  function handleOnClick(item) {
    if (!selection.some(current => current.id === item.id)) {
      setSelection([...selection, item])
    } else {
      let selectionAfterRemoval = selection;
      selectionAfterRemoval = selectionAfterRemoval.filter(
        current => current.id !== item.id
      );
      setSelection([...selectionAfterRemoval])
    }
  }

  useEffect(() => {
    dispatch(getPosts(user.id))
  }, [render])

  function isItemInSelection(item) {
    if (selection.some(current => current.id === item.id)) {
      return true;
    }
    return false;
  }

  const onSubmit = (e) => {
    e.preventDefault();
    const workout_id = workoutId
    selection.map(async (exercise) => {
      const exercise_id = exercise.id
      const response = await fetch('/api/workouts/add-exercises', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          workout_id,
          exercise_id
        })
      })
      const responseData = await response.json()
      dispatch(addWorkouts(responseData))
      setRender(true)
      setStep(2)
      return responseData;
    })
  }

  return (
    <div className="dd-wrapper">
      <Button
        variant="contained"
        tabIndex={0}
        className="dd-header"
        role="button"
        onKeyPress={() => toggle(!open)}
        onClick={() => toggle(!open)}
      >
        <div className="dd-header__title">
          <p className="dd-header__title--bold">{title}</p>
        </div>
      </Button>
      {open && (
        <div className="dd-list__container">
          <ul className="dd-list">
            {items.map((item) => (
              <li key={item.id} className="dd-list__item">
                <Button variant="outlined" type="button" onClick={() => handleOnClick(item)}>
                  <span>{item.title}</span>
                  <span>{isItemInSelection(item) && ' --  (Selected)'}</span>
                </Button>
              </li>
            ))}
          </ul>
          <Button variant="contained" onClick={onSubmit}>Submit your exercises</Button>
        </div>
      )}
    </div>
  )
}

export default WorkoutDropdown
