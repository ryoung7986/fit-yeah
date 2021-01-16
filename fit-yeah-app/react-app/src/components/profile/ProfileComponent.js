import React, { useEffect, useState } from 'react'
import { Avatar } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import './ProfileComponent.css'

function ProfileComponent({ user }) {

  return (
    <div className="profile">
      <div className="profile__avatar">
        <Avatar />
      </div>
      <div className="profile__info">
        <h1>{`${user.first_name} ${user.last_name}`}</h1>
      </div>
    </div>
  )
}

export default ProfileComponent
