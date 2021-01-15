import React from 'react';
import { Avatar } from '@material-ui/core';
import ThumbUpOutlinedIcon from '@material-ui/icons/ThumbUpOutlined';
import ChatBubbleOutlineOutlinedIcon from '@material-ui/icons/ChatBubbleOutlineOutlined';
import { selectUser } from '../user/userSlice';
import { useSelector } from 'react-redux';

import './Post.css';

function Post({ profilePic, media, username, timestamp, content, postId, numLikes, numComments }) {
  const user = useSelector(selectUser)
  const userId = user.user.id

  const submitLike = () => {
    (async () => {
      await fetch(`/api/users/${userId}/${postId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, postId })
      })
    })()
  }

  return (
    <div className='post'>
      <div className='post__top'>
        <Avatar src={profilePic} className='post__avatar' />
        <div className="post__top--info">
          <h3>{username}</h3>
          <p>{timestamp}</p>
        </div>
      </div>
      <div className="post__bottom">
        <p>{content}</p>
      </div>
      <div className="post__media">
        {media &&
          <img src={media} alt='' />}
      </div>
      <div className="post__likes">
        <p>{numLikes ? numLikes : null}</p>
        <p>{numComments ? numComments : null}</p>
      </div>
      <div className="post__options">
        <div onClick={submitLike} className="post__option">
          <ThumbUpOutlinedIcon />
          <h3>Like</h3>
        </div>
        <div className="post__option">
          <ChatBubbleOutlineOutlinedIcon />
          <h3>Comment</h3>
        </div>
      </div>
    </div>
  )
}

export default Post
