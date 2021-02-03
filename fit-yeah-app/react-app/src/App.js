import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import LoginForm from "./components/auth/LoginForm";
import SignUpForm from "./components/auth/SignUpForm";
import NavBar from "./components/navbar/NavBar";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import FollowingList from "./components/user/FollowingList";
import UploadForm from './components/UploadForm'
import Sidebar from "./components/sidebar/Sidebar";
import Feed from './components/feed/Feed';
import MyInfoBar from "./components/profile/MyInfoBar";
import WorkoutsList from "./components/workouts/WorkoutsList";
import UserStats from "./components/stats/UserStats";
import ProfileComponent from './components/profile/ProfileComponent';
import CreateWorkout from "./components/workouts/CreateWorkout";
import WorkoutPlanForm from './components/workouts/WorkoutPlanForm';
import Leaderboard from "./components/leaderboard/Leaderboard";
import User from "./components/leaderboard/User";
import SearchUsersResults from './components/navbar/SearchUsersResults';
import SearchWorkoutsResults from './components/workouts/SearchWorkoutsResults';
import { authenticate } from "./services/auth";
import WorkoutInfoPage from "./components/workouts/WorkoutInfoPage";
import { getExercises } from './components/exercises/exerciseSlice';
import { getWorkouts } from './components/workouts/workoutSlice';
import {
  addUser,
  getFollowers,
  getFollowing,
  addAllUsersToState,
  selectUser
} from './components/user/userSlice';

import './App.css';

function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const user = useSelector(selectUser);
  const dispatch = useDispatch();


  useEffect(() => {
    (async () => {
      const user = await authenticate();
      dispatch(addUser({ user }));
      if (!user.errors) {
        setAuthenticated(true);
        setLoaded(true)
      }
    })();
  }, [dispatch]);

  useEffect(() => {
    dispatch(getExercises())
    dispatch(getWorkouts())
  }, [user, dispatch]);

  useEffect(() => {
    user &&
      dispatch(getFollowers(user.id))
  }, [user, dispatch]);

  useEffect(() => {
    user &&
      dispatch(getFollowing(user.id))
  }, [user, dispatch]);

  useEffect(() => {
    dispatch(addAllUsersToState())
  }, [dispatch])

  useEffect(() => {
    setLoaded(true)
  }, [user, dispatch]);


  if (!loaded && !user) {
    return null;
  }

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login" exact={true}>
          <LoginForm
            authenticated={authenticated}
            setAuthenticated={setAuthenticated} />
        </Route>
        <Route path="/sign-up" exact={true}>
          <SignUpForm
            authenticated={authenticated}
            setAuthenticated={setAuthenticated} />
        </Route>

        <ProtectedRoute path="/" exact={true} authenticated={authenticated} user={user} >
          <div className="app">
            <NavBar setAuthenticated={setAuthenticated} user={user} />
            <div className="app__body">
              <div className="body__sidebar">
                <Sidebar user={user} />
              </div>
              <div className="body__feed">
                <Feed user={user} />
              </div>
            </div>
          </div>
        </ProtectedRoute>

        <ProtectedRoute path="/my-profile" exact={true} authenticated={authenticated}>
          <div className="app">
            <NavBar setAuthenticated={setAuthenticated} />
            <div className="app__body">
              <div className="body__left">
                <div className="body__sidebar">
                  <Sidebar user={user} />
                </div>
              </div>
              <div className="body__feed">
                <ProfileComponent user={user} />
                <Feed user={user} />
              </div>
              <div className="body__right">
                <div className="body__userInfo">
                  <MyInfoBar user={user} />
                </div>
              </div>
            </div>
          </div>
        </ProtectedRoute>

        <ProtectedRoute path="/leaderboard" exact={true} authenticated={authenticated}>
          <div className="app">
            <NavBar setAuthenticated={setAuthenticated} />
            <div className="app__body">
              <div className="body__sidebar">
                <Sidebar user={user} />
              </div>
              <div className="body__feed">
                <Leaderboard user={user} />
              </div>
            </div>
          </div>
        </ProtectedRoute>

        <ProtectedRoute path="/user-search" exact={true} authenticated={authenticated}>
          <div className="app">
            <NavBar setAuthenticated={setAuthenticated} />
            <div className="app__body">
              <div className="body__sidebar">
                <Sidebar user={user} />
              </div>
              <div className="body__feed">
                <SearchUsersResults />
              </div>
            </div>
          </div>
        </ProtectedRoute>

        <ProtectedRoute path="/workout-search" exact={true} authenticated={authenticated}>
          <div className="app">
            <NavBar setAuthenticated={setAuthenticated} />
            <div className="app__body">
              <div className="body__sidebar">
                <Sidebar user={user} />
              </div>
              <div className="body__feed">
                <SearchWorkoutsResults />
              </div>
            </div>
          </div>
        </ProtectedRoute>

        <ProtectedRoute path="/user/:id" exact={true} authenticated={authenticated}>
          <div className="app">
            <NavBar setAuthenticated={setAuthenticated} />
            <div className="app__body">
              <div className="body__sidebar">
                <Sidebar user={user} />
              </div>
              <div className="body__feed">
                <User />
              </div>
            </div>
          </div>
        </ProtectedRoute>

        <ProtectedRoute path="/followers" exact={true} authenticated={authenticated}>
          <div className="app">
            <NavBar setAuthenticated={setAuthenticated} />
            <div className="app__body">
              <div className="body__sidebar">
                <Sidebar user={user} />
              </div>
              <div className="body__feed">
                <FollowingList user={user} />
              </div>
            </div>
          </div>
        </ProtectedRoute>

        <ProtectedRoute path="/workouts" exact={true} authenticated={authenticated}>
          <div className="app">
            <NavBar setAuthenticated={setAuthenticated} />
            <div className="app__body">
              <div className="body__sidebar">
                <Sidebar user={user} />
              </div>
              <div className="body__feed">
                <WorkoutsList user={user} />
              </div>
            </div>
          </div>
        </ProtectedRoute>

        <ProtectedRoute path="/my-stats" exact={true} authenticated={authenticated}>
          <div className="app">
            <NavBar setAuthenticated={setAuthenticated} />
            <div className="app__body">
              <div className="body__sidebar">
                <Sidebar user={user} />
              </div>
              <div className="body__feed">
                <UserStats user={user} />
              </div>
            </div>
          </div>
        </ProtectedRoute>

        <ProtectedRoute path="/my-workout-plan" exact={true} authenticated={authenticated}>
          <div className="app">
            <NavBar setAuthenticated={setAuthenticated} />
            <div className="app__body">
              <div className="body__sidebar">
                <Sidebar user={user} />
              </div>
              <div className="body__feed">
                <WorkoutInfoPage />
              </div>
            </div>
          </div>
        </ProtectedRoute>

        <ProtectedRoute path="/my-workout-plan/new" exact={true} authenticated={authenticated}>
          <div className="app">
            <NavBar setAuthenticated={setAuthenticated} />
            <div className="app__body">
              <div className="body__sidebar">
                <Sidebar user={user} />
              </div>
              <div className="body__feed">
                <WorkoutPlanForm user={user} />
              </div>
            </div>
          </div>
        </ProtectedRoute>

        <ProtectedRoute path="/create-a-workout" exact={true} authenticated={authenticated}>
          <div className="app">
            <NavBar setAuthenticated={setAuthenticated} />
            <div className="app__body">
              <div className="body__sidebar">
                <Sidebar user={user} />
              </div>
              <div className="body__feed">
                <CreateWorkout user={user} />
              </div>
            </div>
          </div>
        </ProtectedRoute>

        <ProtectedRoute path="/upload" exact={true} authenticated={authenticated}>
          <UploadForm user={user} />
        </ProtectedRoute>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
