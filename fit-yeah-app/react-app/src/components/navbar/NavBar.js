import React from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUser } from '../user/userSlice';
import HomeIcon from '@material-ui/icons/Home';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import FitnessCenterIcon from '@material-ui/icons/FitnessCenter';
import EventAvailableIcon from '@material-ui/icons/EventAvailable';
import AssessmentOutlinedIcon from '@material-ui/icons/AssessmentOutlined';
import TrendingUpOutlinedIcon from '@material-ui/icons/TrendingUpOutlined';
import { Avatar } from '@material-ui/core';
import UserDropdown from './UserDropdown';
import SearchUsers from './SearchUsers';
import SidebarOption from '../sidebar/SidebarOption';

import './NavBar.css';

const NavBar = ({ setAuthenticated }) => {
  const user = useSelector(selectUser);
  const history = useHistory();

  return (
    <>
      { setAuthenticated && user &&
        <div className="navbar">
          <div className="navbar__left">
            <img
              onClick={() => history.push('/')}
              src="https://fit-yeah.s3.amazonaws.com/FY-Logo-3.png"
              alt="" />
            <SearchUsers />
          </div>
          <div className="navbar__middle">
            <div className="navbar__option" activeclassname="navbar__option--active">
              <NavLink to="/" exact={true}>
                <HomeIcon fontSize="large" />
              </NavLink>
            </div>
            <div className="navbar__option" activeclassname="navbar__option--active">
              <NavLink to="/followers" exact={true}>
                <PeopleAltIcon fontSize="large" />
              </NavLink>
            </div>
            <div className="navbar__option" activeclassname="navbar__option--active">
              <NavLink to='/leaderboard' exact={true} className='navlink'>
                <TrendingUpOutlinedIcon fontSize="large" />
              </NavLink>
            </div>
            <div className="navbar__option" activeclassname="navbar__option--active">
              <NavLink to="/workouts" exact={true}>
                <FitnessCenterIcon fontSize="large" />
              </NavLink>
            </div>
            {/* <div className="navbar__option" activeclassname="navbar__option--active">
              <NavLink to="/my-workout-plan" exact={true}>
                <EventAvailableIcon fontSize="large" />
              </NavLink>
            </div> */}
          </div>
          <div className="navbar__right">
            <div className="navbar__info">
              <Avatar src={user.avatar_url} fontSize="large" style={{ width: '60px', height: '60px' }} />
              <UserDropdown setAuthenticated={setAuthenticated} className="userDropdown" userName={user.first_name} />
            </div>
          </div>
        </div>}
    </>
  );
}

export default NavBar;
