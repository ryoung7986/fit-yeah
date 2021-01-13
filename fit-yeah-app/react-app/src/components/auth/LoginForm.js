import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { login } from "../../services/auth";
import Button from '@material-ui/core/Button';

import { useDispatch } from 'react-redux';
import { addUser } from '../user/userSlice';

import './LoginForm.css'


const LoginForm = ({ authenticated, setAuthenticated }) => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const onLogin = async (e) => {
    e.preventDefault();

    const user = await login(email, password);
    if (!user.errors) {
      localStorage.setItem('user', JSON.stringify(user))
      setAuthenticated(true);
      dispatch(addUser({ user: user }));
    } else {
      setErrors(user.errors);
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (authenticated) {
    return <Redirect to="/" />;
  }

  return (
    <div className="login">
      <div className="login__logo">
        <img src="https://fit-yeah.s3.amazonaws.com/FY-Logo-3.png" />
      </div>
      <form onSubmit={onLogin} className="login__form">
        <div>
          {errors.map((error) => (
            <div>{error}</div>
          ))}
        </div>
        <div className="login__form--input">
          <label htmlFor="email" />
          <input
            name="email"
            type="text"
            placeholder="Email"
            value={email}
            onChange={updateEmail}
          />
        </div>
        <div className="login__form--input">
          <label htmlFor="password" />
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={updatePassword}
          />
        </div>
        <Button
          type="submit"
          variant="outlined"
          className="login__button">
          Login
        </Button>
      </form>
    </div >
  );
};

export default LoginForm;
