import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { selectAllUsers, searchUsersResults } from '../user/userSlice';
import SearchIcon from '@material-ui/icons/Search';
import './SearchUsers.css';

function SearchBar() {
  const allUsers = useSelector(selectAllUsers);
  const [input, setInput] = useState('')
  const dispatch = useDispatch();
  const history = useHistory();

  const onChange = (e) => {
    setInput(e.target.value)
  }

  const onSubmit = (e) => {
    e.preventDefault();
    let results = allUsers.filter(user => {
      return user.first_name.toLowerCase().includes(input.toLowerCase()) ||
        user.last_name.toLowerCase().includes(input.toLowerCase()) ||
        user.username.toLowerCase().includes(input.toLocaleLowerCase())
    })
    dispatch(searchUsersResults(results))
    setInput('')
    history.push('/user-search')
  }

  return (
    <form onSubmit={onSubmit} className="navbar__input">
      <SearchIcon fontSize="small" />
      <input
        type="text"
        placeholder="search for a user"
        value={input}
        onChange={onChange} />
    </form>
  )
}

export default SearchBar
