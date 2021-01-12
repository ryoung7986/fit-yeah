import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

import { useSelector, useDispatch } from 'react-redux';
import { selectUser } from './userSlice';

function FollowersList() {
  const [users, setUsers] = useState([]);

  const stateUser = useSelector(selectUser);
  const userId = stateUser

  console.log(stateUser);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch("/api/users/");
      const responseData = await response.json();
      setUsers(responseData.users);
      console.log('users', responseData.users)
    }
    fetchData();
  }, []);

  const userComponents = users.map((user) => {
    return (
      <li key={user.id}>
        <NavLink to={`/users/${user.id}`}>{user.username}</NavLink>
      </li>
    );
  });

  return (
    <>
      <h1>User List: </h1>
      <ul>{userComponents}</ul>
    </>
  );
}

export default FollowersList;
