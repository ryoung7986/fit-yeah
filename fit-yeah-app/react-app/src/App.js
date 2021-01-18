import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import LoginForm from "./components/auth/LoginForm";
import SignUpForm from "./components/auth/SignUpForm";
import NavBar from "./components/navbar/NavBar";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import FollowersList from "./components/user/FollowersList";
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

import { authenticate } from "./services/auth";
import { useDispatch } from 'react-redux';
import { addUser, addFollowing, addFollowers } from './components/user/userSlice';
import { addExercises } from './components/exercises/exerciseSlice';
import { addWorkouts } from './components/workouts/WorkoutSlice';

import './App.css';

function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);
  const [workouts, setWorkouts] = useState([]);
  const [exercises, setExercises] = useState({});
  const [user, setUser] = useState(null)
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      const user = await authenticate();
      if (!user.errors) {
        setAuthenticated(true);
        dispatch(addUser({ user: user }));
        setUser(user);
      }
      setLoaded(true);
    })();
  }, []);

  useEffect(() => {
    user &&
      (async () => {
        const response = await fetch('/api/exercises')
        const responseData = await response.json()
        await setExercises(responseData.exercises)
      })()
  }, [user]);

  useEffect(() => {
    user &&
      (async () => {
        const response = await fetch('/api/workouts')
        const responseData = await response.json()
        await setWorkouts(responseData.workouts)
      })()
  }, [user]);

  useEffect(() => {
    user &&
      (async () => {
        const response = await fetch(`/api/users/${user.id}/followers`);
        const responseData = await response.json();
        await setFollowers(responseData.followers);
      })()
  }, [user]);

  useEffect(() => {
    user &&
      (async function fetchData() {
        const response = await fetch(`/api/users/${user.id}/following`);
        const responseData = await response.json();
        await setFollowing(responseData.following);
      })()
  }, [user]);

  useEffect(() => {
    dispatch(addFollowers({ followers: followers }))
  }, [followers])

  useEffect(() => {
    dispatch(addFollowing({ following: following }))
  }, [following])

  useEffect(() => {
    dispatch(addExercises({ exercises: exercises }))
  }, [exercises])

  useEffect(() => {
    dispatch(addWorkouts({ workouts: workouts }))
  }, [workouts])

  if (!loaded) {
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

        <ProtectedRoute path="/" exact={true} authenticated={authenticated}>
          <div className="app">
            <NavBar setAuthenticated={setAuthenticated} />
            <div className="app__body">
              <div className="body__sidebar">
                <Sidebar />
              </div>
              <div className="body__feed">
                <Feed />
              </div>
              <div className="body__right">
                <h3>What goes here?</h3>
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
                  <Sidebar />
                </div>
              </div>
              <div className="body__feed">
                <ProfileComponent user={user} />
                <Feed />
              </div>
              <div className="body__right">
                <div className="body__userInfo">
                  <MyInfoBar />
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
                <Sidebar />
              </div>
              <div className="body__feed">
                <h1>Leaderboard</h1>
              </div>
              <div className="body__right">
                <h1>Your current rank</h1>
              </div>
            </div>
          </div>
        </ProtectedRoute>

        <ProtectedRoute path="/followers" exact={true} authenticated={authenticated}>
          <div className="app">
            <NavBar setAuthenticated={setAuthenticated} />
            <div className="app__body">
              <div className="body__sidebar">
                <Sidebar />
              </div>
              <div className="body__feed">
                <FollowersList />
                <FollowingList />
              </div>
              <div className="body__right">
                <h1>Follower leaderboard?</h1>
              </div>
            </div>
          </div>
        </ProtectedRoute>

        <ProtectedRoute path="/workouts" exact={true} authenticated={authenticated}>
          <div className="app">
            <NavBar setAuthenticated={setAuthenticated} />
            <div className="app__body">
              <div className="body__sidebar">
                <Sidebar />
              </div>
              <div className="body__feed">
                <WorkoutsList />
              </div>
              <div className="body__right">
                <h1>Follower leaderboard?</h1>
              </div>
            </div>
          </div>
        </ProtectedRoute>

        <ProtectedRoute path="/my-stats" exact={true} authenticated={authenticated}>
          <div className="app">
            <NavBar setAuthenticated={setAuthenticated} />
            <div className="app__body">
              <div className="body__sidebar">
                <Sidebar />
              </div>
              <div className="body__feed">
                <UserStats />
              </div>
              <div className="body__right">
                <h1>Follower leaderboard?</h1>
              </div>
            </div>
          </div>
        </ProtectedRoute>

        <ProtectedRoute path="/my-workout-plan" exact={true} authenticated={authenticated}>
          <div className="app">
            <NavBar setAuthenticated={setAuthenticated} />
            <div className="app__body">
              <div className="body__sidebar">
                <Sidebar />
              </div>
              <div className="body__feed">
                <UserStats />
              </div>
              <div className="body__right">
                <h1>Follower leaderboard?</h1>
              </div>
            </div>
          </div>
        </ProtectedRoute>

        <ProtectedRoute path="/my-workout-plan/new" exact={true} authenticated={authenticated}>
          <div className="app">
            <NavBar setAuthenticated={setAuthenticated} />
            <div className="app__body">
              <div className="body__sidebar">
                <Sidebar />
              </div>
              <div className="body__feed">
                <WorkoutPlanForm />
              </div>
              <div className="body__right">
                <h1>Follower leaderboard?</h1>
              </div>
            </div>
          </div>
        </ProtectedRoute>

        <ProtectedRoute path="/create-a-workout" exact={true} authenticated={authenticated}>
          <div className="app">
            <NavBar setAuthenticated={setAuthenticated} />
            <div className="app__body">
              <div className="body__sidebar">
                <Sidebar />
              </div>
              <div className="body__feed">
                <CreateWorkout />
              </div>
              <div className="body__right">
                <h1>Follower leaderboard?</h1>
              </div>
            </div>
          </div>
        </ProtectedRoute>

        <ProtectedRoute path="/upload" exact={true} authenticated={authenticated}>
          <UploadForm />
        </ProtectedRoute>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
