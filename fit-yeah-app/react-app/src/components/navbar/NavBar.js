import React from 'react';
import { NavLink } from 'react-router-dom';
import SearchIcon from '@material-ui/icons/Search';
import HomeIcon from '@material-ui/icons/Home';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import FitnessCenterIcon from '@material-ui/icons/FitnessCenter';
import EventAvailableIcon from '@material-ui/icons/EventAvailable';
import AssessmentOutlinedIcon from '@material-ui/icons/AssessmentOutlined';
import { Avatar } from '@material-ui/core';

import './NavBar.css';
import UserDropdown from './UserDropdown';

const NavBar = ({ setAuthenticated }) => {
  return (
    <>
      { setAuthenticated &&
        <div className="navbar">
          <div className="navbar__left">
            <img
              src="https://fit-yeah.s3.amazonaws.com/FY-Logo-3.png"
              alt="" />
            <div className="navbar__input">
              <SearchIcon fontSize="small" />
              <input type="text" placeholder="search fit-yeah" />
            </div>
          </div>
          <div className="navbar__middle">
            <div className="navbar__option" activeClassName="navbar__option--active">
              <NavLink to="/" exact={true}>
                <HomeIcon fontSize="large" />
              </NavLink>
            </div>
            <div className="navbar__option" activeClassName="navbar__option--active">
              <NavLink to="/followers" exact={true}>
                <PeopleAltIcon fontSize="large" />
              </NavLink>
            </div>
            <div className="navbar__option" activeClassName="navbar__option--active">
              <NavLink to="/user-stats" exact={true}>
                <AssessmentOutlinedIcon fontSize="large" />
              </NavLink>
            </div>
            <div className="navbar__option" activeClassName="navbar__option--active">
              <NavLink to="/workouts" exact={true}>
                <FitnessCenterIcon fontSize="large" />
              </NavLink>
            </div>
            <div className="navbar__option" activeClassName="navbar__option--active">
              <NavLink to="/your-workout-plan" exact={true}>
                <EventAvailableIcon fontSize="large" />
              </NavLink>
            </div>
          </div>
          <div className="navbar__right">
            <div className="navbar__info">
              <Avatar fontSize="large" />
              <UserDropdown setAuthenticated={setAuthenticated} userName="user name" />
            </div>
          </div>
        </div>}
    </>
  );
}

export default NavBar;
