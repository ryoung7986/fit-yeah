import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from 'react-redux';
import { selectUser } from './userSlice';
import { useDispatch } from 'react-redux';
import { addFollowing } from './userSlice';
import UserCard from './UserCard';

import './FollowingList.css';

function FollowingList() {
  const dispatch = useDispatch();
  const [following, setFollowing] = useState([]);
  const stateUser = useSelector(selectUser);
  const userId = stateUser.id

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(`/api/users/${userId}/following`);
      const responseData = await response.json();
      setFollowing(responseData.following);
    }
    fetchData();
  }, []);

  useEffect(() => {
    dispatch(addFollowing({ following: following }))
  }, [following])

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
