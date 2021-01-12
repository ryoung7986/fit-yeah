import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import LoginForm from "./components/auth/LoginForm";
import SignUpForm from "./components/auth/SignUpForm";
import NavBar from "./components/navbar/NavBar";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import FollowersList from "./components/auth/FollowersList";
import User from "./components/auth/User";
import UploadForm from './components/UploadForm'
import Sidebar from "./components/sidebar/Sidebar";
import Feed from './components/feed/Feed';
import { authenticate } from "./services/auth";

import './App.css';

function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      const user = await authenticate();
      if (!user.errors) {
        setAuthenticated(true);
      }
      setLoaded(true);
    })();
  }, []);

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
          <SignUpForm authenticated={authenticated} setAuthenticated={setAuthenticated} />
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

        <ProtectedRoute path="/upload" exact={true} authenticated={authenticated}>
          <UploadForm />
        </ProtectedRoute>
        <ProtectedRoute path="/followers" exact={true} authenticated={authenticated}>
          <div className="app">
            <NavBar setAuthenticated={setAuthenticated} />
            <div className="app__body">
              <FollowersList />
            </div>
          </div>
        </ProtectedRoute>
        <ProtectedRoute path="/users/:userId" exact={true} authenticated={authenticated}>
          <User />
        </ProtectedRoute>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
