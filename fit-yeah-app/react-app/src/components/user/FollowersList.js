import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from 'react-redux';
import { selectUser } from './userSlice';
import { useDispatch } from 'react-redux';
import { addFollowers, getFollowers, selectFollowers } from './userSlice';

function FollowersList() {
  const dispatch = useDispatch();
  const [followers, setFollowers] = useState([]);
  const user = useSelector(selectUser);
  const userId = user.id

  const helloThere = useSelector(selectFollowers)
  console.log(helloThere)

  // useEffect(() => {
  //   (async () => {
  //     const response = await fetch(`/api/users/${userId}/followers`);
  //     const responseData = await response.json();
  //     await setFollowers(responseData.followers);
  //     console.log('followers', responseData.followers)
  //   })()
  // }, []);

  // useEffect(() => {
  //   dispatch(addFollowers({ followers: followers }))
  // }, [followers])

  useEffect(() => {
    dispatch(getFollowers(userId))
    console.log(userId)
  }, [user])

  const userComponents = followers.map((user) => {
    return (
      <li key={user.id}>
        <NavLink to={`/users/${user.id}`}>{user.username}</NavLink>
      </li>
    );
  });

  return (
    <>
      <h1>Followers: </h1>
      <ul>{userComponents}</ul>
    </>
  );
}

export default FollowersList;
