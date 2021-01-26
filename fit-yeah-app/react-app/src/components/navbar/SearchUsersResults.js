import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { selectUsersSearchResults } from '../user/userSlice';
import UserCard from '../user/UserCard';
import './SearchUsersResults.css';

function SearchUsersResults() {
  const searchResults = useSelector(selectUsersSearchResults);
  console.log(searchResults)

  return (
    <div className="usersSearchResults">
      {searchResults && searchResults.map((user) => (
        <NavLink to={`/user/${user.id}`} className="leaderboard__users">
          <UserCard user={user} />
        </NavLink>
      ))}
    </div>
  )
}

export default SearchUsersResults
