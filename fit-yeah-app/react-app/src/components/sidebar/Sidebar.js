import React from 'react';
import SidebarOption from './SidebarOption';
import PersonOutlineOutlinedIcon from '@material-ui/icons/PersonOutlineOutlined';
import FitnessCenterOutlinedIcon from '@material-ui/icons/FitnessCenterOutlined';
import TrendingUpOutlinedIcon from '@material-ui/icons/TrendingUpOutlined';
import EqualizerIcon from '@material-ui/icons/Equalizer';
import './Sidebar.css';

function Sidebar() {
  return (
    <div className="sidebar">
      <SidebarOption Icon={PersonOutlineOutlinedIcon} title='Your Profile' />
      <SidebarOption Icon={TrendingUpOutlinedIcon} title='Leaderboard' />
      <SidebarOption Icon={FitnessCenterOutlinedIcon} title='Popular Workouts' />
      <SidebarOption Icon={EqualizerIcon} title='Your Stats' />
    </div>
  )
}

export default Sidebar
