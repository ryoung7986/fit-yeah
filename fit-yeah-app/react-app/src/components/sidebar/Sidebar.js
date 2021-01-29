import React from 'react';
import { NavLink } from 'react-router-dom';
import SidebarOption from './SidebarOption';
import PersonOutlineOutlinedIcon from '@material-ui/icons/PersonOutlineOutlined';
import FitnessCenterOutlinedIcon from '@material-ui/icons/FitnessCenterOutlined';
import TrendingUpOutlinedIcon from '@material-ui/icons/TrendingUpOutlined';
import WhatshotIcon from '@material-ui/icons/Whatshot';
// import EqualizerIcon from '@material-ui/icons/Equalizer';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import './Sidebar.css';

function Sidebar() {
  return (
    <div className="sidebar">
      <NavLink to='/my-profile' exact={true} className="navlink">
        <SidebarOption Icon={PersonOutlineOutlinedIcon} title='Your Profile' />
      </NavLink>
      <NavLink to='/followers' exact={true} className='navlink'>
        <SidebarOption Icon={PeopleAltIcon} title='Following' />
      </NavLink>
      <NavLink to='/leaderboard' exact={true} className='navlink'>
        <SidebarOption Icon={TrendingUpOutlinedIcon} title='Leaderboard' />
      </NavLink>
      <NavLink to='/workouts' exact={true} className='navlink'>
        <SidebarOption Icon={FitnessCenterOutlinedIcon} title='Popular Workouts' />
      </NavLink>
      <NavLink to='/create-a-workout' exact={true} className='navlink'>
        <SidebarOption Icon={WhatshotIcon} title='Create-A-Workout' />
      </NavLink>
    </div>
  )
}

export default Sidebar
