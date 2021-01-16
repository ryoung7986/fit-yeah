import React, { useState, useEffect } from 'react'
import { Avatar } from '@material-ui/core';
import './Comment.css'

function Comment({ userId, content }) {
  const [user, setUser] = useState(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      const response = await fetch(`/api/users/${userId}`)
      const responseData = await response.json()
      setUser(responseData)
      setLoaded(true)
    })()
  }, [userId])

  if (!loaded) return null;

  return (
    <div className="comment">
      <Avatar />
      <div className="comment__top">
        <div className="comment__details">
          <h5>{`${user.first_name} ${user.last_name}`}</h5>
          <h4>{content}</h4>
        </div>
      </div>
    </div>
  )
}

export default Comment
