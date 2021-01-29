import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
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
import { useDispatch, useSelector } from 'react-redux';
import { addUser, addFollowing, addFollowers, addAllUsersToState, selectUser } from './components/user/userSlice';
import { addExercises } from './components/exercises/exerciseSlice';
import { addWorkouts } from './components/workouts/workoutSlice';
import WorkoutInfoPage from "./components/workouts/WorkoutInfoPage";

import './App.css';

function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);
  const [exercises, setExercises] = useState({});
  const [workouts, setWorkouts] = useState([]);
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
    user &&
      (async () => {
        const response = await fetch('/api/exercises')
        const responseData = await response.json()
        await setExercises(responseData.exercises)
      })()
  }, [user, dispatch]);

  useEffect(() => {
    user &&
      (async () => {
        const response = await fetch('/api/workouts')
        const responseData = await response.json()
        await setWorkouts(responseData.workouts)
      })()
  }, [user, dispatch]);

  useEffect(() => {
    user &&
      (async () => {
        const response = await fetch(`/api/users/${user.id}/followers`);
        const responseData = await response.json();
        await setFollowers(responseData.followers);
      })()
  }, [user, dispatch]);

  useEffect(() => {
    user &&
      (async function fetchData() {
        const response = await fetch(`/api/users/${user.id}/following`);
        const responseData = await response.json();
        await setFollowing(responseData.following);
      })()
  }, [user, dispatch]);

  useEffect(() => {
    dispatch(addAllUsersToState())
  }, [dispatch])

  useEffect(() => {
    setLoaded(true)
  }, [user, dispatch]);

  useEffect(() => {
    dispatch(addFollowers({ followers: followers }))
  }, [followers, dispatch])

  useEffect(() => {
    dispatch(addFollowing({ following: following }))
  }, [following, dispatch])

  useEffect(() => {
    dispatch(addExercises({ exercises: exercises }))
  }, [exercises, dispatch])

  useEffect(() => {
    dispatch(addWorkouts({ workouts: workouts }))
  }, [workouts, dispatch])


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
