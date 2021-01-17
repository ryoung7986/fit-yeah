import React, { useState, useEffect } from 'react';
import './WorkoutDropdown.css';

function WorkoutDropdown({ title, items, workoutId }) {
  const [open, setOpen] = useState(false);
  const [selection, setSelection] = useState([]);
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
    console.log(selection)
  }, [selection])

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
      console.log(responseData)
    })
  }

  return (
    <div className="dd-wrapper">
      <div
        tabIndex={0}
        className="dd-header"
        role="button"
        onKeyPress={() => toggle(!open)}
        onClick={() => toggle(!open)}
      >
        <div className="dd-header__title">
          <p className="dd-header__title--bold">{title}</p>
        </div>
        <div className="dd-header__action">
          <p>{open ? 'Close' : 'Open'}</p>
        </div>
      </div>
      {open && (
        <>
          <ul className="dd-list">
            {items.map((item) => (
              <li key={item.id} className="dd-list__item">
                <button type="button" onClick={() => handleOnClick(item)}>
                  <span>{item.title}</span>
                  <span>{isItemInSelection(item) && '   (Selected)'}</span>
                </button>
              </li>
            ))}
          </ul>
          <button onClick={onSubmit}>Submit your exercises</button>
        </>
      )}
    </div>
  )
}

export default WorkoutDropdown
