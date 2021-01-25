import React from 'react';
import { useSelector } from 'react-redux';
import { selectAllUsers, selectFollowing, selectFollowers } from '../user/userSlice';
import SearchIcon from '@material-ui/icons/Search';
import './SearchBar.css';

function SearchBar() {
  const allUsers = useSelector(selectAllUsers);
  const userFollwers = useSelector(selectFollowers);
  const userFollowing = useSelector(selectFollowing);

  return (
    <div className="navbar__input">
      <SearchIcon fontSize="small" />
      <input type="text" placeholder="search fit-yeah" />
    </div>
  )
}

export default SearchBar
