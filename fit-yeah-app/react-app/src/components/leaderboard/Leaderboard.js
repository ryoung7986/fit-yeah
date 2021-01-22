import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectAllUsers } from '../user/userSlice';
import UserCard from '../user/UserCard';

import './Leaderboard.css';

function Leaderboard() {
  const allUsers = useSelector(selectAllUsers);

  const users = allUsers.slice().sort((a, b) => {
    return (a.points_earned > b.points_earned) ? -1 : 1
  })

  console.log(allUsers)


  return (
    <div className="leaderboard">
      {users && users.map((user) => (
        <NavLink to={`/user/${user.id}`} className="leaderboard__users">
          <UserCard user={user} />
        </NavLink>
      ))}
    </div>
  )
}

export default Leaderboard;
