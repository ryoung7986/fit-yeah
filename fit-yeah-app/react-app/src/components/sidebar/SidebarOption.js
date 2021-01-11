import React from 'react';
import { Avatar } from '@material-ui/core';
import './SidebarOption.css';

function SidebarOption({ src, Icon, title }) {
  return (
    <div className="sidebar__option">
      {src && <Avatar src={src} />}
      {Icon && <Icon />}
      <h4>{title}</h4>
    </div>
  )
}

export default SidebarOption
