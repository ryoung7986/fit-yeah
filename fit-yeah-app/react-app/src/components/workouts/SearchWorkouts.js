import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { selectWorkouts, searchWorkoutsResults } from './workoutSlice';
import SearchIcon from '@material-ui/icons/Search';
import './SearchWorkouts.css';

function SearchWorkouts() {
  const allWorkouts = useSelector(selectWorkouts);
  const [input, setInput] = useState('')
  const dispatch = useDispatch();
  const history = useHistory();

  const onChange = (e) => {
    setInput(e.target.value)
  }

  const onSubmit = (e) => {
    e.preventDefault();
    let results = allWorkouts.filter(workout => {
      return workout.title.toLowerCase().includes(input.toLowerCase()) ||
        workout.subtitle.toLowerCase().includes(input.toLowerCase()) ||
        workout.description.toLowerCase().includes(input.toLowerCase())
    })
    console.log(results)
    dispatch(searchWorkoutsResults(results))
    setInput('')
    history.push('/workout-search')
  }

  return (
    <div className="workoutSearch">
      <div className="workoutSearch__header">
        <h2>Search for a workout</h2>
      </div>
      <form onSubmit={onSubmit} className="workoutSearch__input">
        <SearchIcon fontSize="small" />
        <input
          type="text"
          placeholder="search for a workout"
          value={input}
          onChange={onChange} />
      </form>
    </div>
  )
}

export default SearchWorkouts
