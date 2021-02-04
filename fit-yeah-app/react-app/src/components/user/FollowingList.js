import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from 'react-redux';
import { selectUser } from './userSlice';
import { useDispatch } from 'react-redux';
import { addFollowing, getFollowing, selectFollowing } from './userSlice';
import UserCard from './UserCard';

import './FollowingList.css';

function FollowingList() {
  const following = useSelector(selectFollowing);
  const user = useSelector(selectUser);
  const userId = user.id
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFollowing(userId))
  }, [userId])

  const userComponents = following.map((user) => {
    return (
      <div key={user.id}>
        <NavLink to={`/user/${user.id}`} className="leaderboard__users">
          <UserCard user={user} />
        </NavLink>
      </div>
    );
  });

  return (
    <div className="followingList">
      <div className="followingList__header">
        <h1>Following: </h1>
      </div>
      <ul>{userComponents}</ul>
    </div>
  );
}

export default FollowingList;
