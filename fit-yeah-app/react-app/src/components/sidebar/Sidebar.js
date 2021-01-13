import React from 'react';
import { NavLink } from 'react-router-dom';
import SidebarOption from './SidebarOption';
import PersonOutlineOutlinedIcon from '@material-ui/icons/PersonOutlineOutlined';
import FitnessCenterOutlinedIcon from '@material-ui/icons/FitnessCenterOutlined';
import TrendingUpOutlinedIcon from '@material-ui/icons/TrendingUpOutlined';
import EqualizerIcon from '@material-ui/icons/Equalizer';
import './Sidebar.css';

function Sidebar() {
  return (
    <div className="sidebar">
      <NavLink to='/my-profile' exact={true} className="navlink">
        <SidebarOption Icon={PersonOutlineOutlinedIcon} title='Your Profile' />
      </NavLink>
      <NavLink to='/leaderboard' exact={true} className='navlink'>
        <SidebarOption Icon={TrendingUpOutlinedIcon} title='Leaderboard' />
      </NavLink>
      <NavLink to='/workouts' exact={true} className='navlink'>
        <SidebarOption Icon={FitnessCenterOutlinedIcon} title='Popular Workouts' />
      </NavLink>
      <NavLink to='/my-stats' exact={true} className='navlink'>
        <SidebarOption Icon={EqualizerIcon} title='Your Stats' />
      </NavLink>
    </div>
  )
}

export default Sidebar
