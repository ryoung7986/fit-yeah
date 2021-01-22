import React, { useState } from "react";
import { Redirect } from 'react-router-dom';
import { signUp } from '../../services/auth';
import { useDispatch } from 'react-redux';
import { addUser } from '../user/userSlice';
import Button from '@material-ui/core/Button';
import './SignUpForm.css';

const SignUpForm = ({ authenticated, setAuthenticated }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const dispatch = useDispatch();

  const onSignUp = async (e) => {
    e.preventDefault();
    console.log(email)
    if (password === repeatPassword) {
      const user = await signUp(username, firstName, lastName, email, password);
      if (!user.errors) {
        dispatch(addUser({ user: user }));
        setAuthenticated(true);
      }
    }
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateFirstName = (e) => {
    setFirstName(e.target.value);
  };

  const updateLastName = (e) => {
    setLastName(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  if (authenticated) {
    return <Redirect to="/" />;
  }

  return (
    <div className="signup">
      <div className="signup__logo">
        <img src="https://fit-yeah.s3.amazonaws.com/FY-Logo-3.png" />
      </div>
      <form onSubmit={onSignUp} className="signup__form">
        <div>
          <label>First Name</label>
          <input
            className="signup__form--input"
            type="text"
            name="first_name"
            onChange={updateFirstName}
            value={firstName}
          ></input>
        </div>
        <div>
          <label>Last Name</label>
          <input
            className="signup__form--input"
            type="text"
            name="last_name"
            onChange={updateLastName}
            value={lastName}
          ></input>
        </div>
        <div>
          <label>Desired User Name</label>
          <input
            className="signup__form--input"
            type="text"
            name="username"
            onChange={updateUsername}
            value={username}
          ></input>
        </div>
        <div>
          <label>Email</label>
          <input
            className="signup__form--input"
            type="text"
            name="email"
            onChange={updateEmail}
            value={email}
          ></input>
        </div>
        <div>
          <label>Password</label>
          <input
            className="signup__form--input"
            type="password"
            name="password"
            onChange={updatePassword}
            value={password}
          ></input>
        </div>
        <div>
          <label>Repeat Password</label>
          <input
            className="signup__form--input"
            type="password"
            name="repeat_password"
            onChange={updateRepeatPassword}
            value={repeatPassword}
            required={true}
          ></input>
        </div>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default SignUpForm;
