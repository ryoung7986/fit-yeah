import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from 'react-redux';
import { selectUser } from './userSlice';
import { useDispatch } from 'react-redux';
import { addFollowing } from './userSlice';

function FollowingList() {
  const dispatch = useDispatch();
  const [following, setFollowing] = useState([]);
  const stateUser = useSelector(selectUser);
  const userId = stateUser.user.id

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(`/api/users/${userId}/following`);
      const responseData = await response.json();
      setFollowing(responseData.following);
      console.log('followers', responseData.following)
    }
    fetchData();
  }, []);

  useEffect(() => {
    dispatch(addFollowing({ following: following }))
  }, [following])

  const userComponents = following.map((user) => {
    return (
      <li key={user.id}>
        <NavLink to={`/users/${user.id}`}>{user.username}</NavLink>
      </li>
    );
  });

  return (
    <>
      <h1>Following: </h1>
      <ul>{userComponents}</ul>
    </>
  );
}

export default FollowingList;
