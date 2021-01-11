import React from 'react';
import { Avatar } from '@material-ui/core';
import ThumbUpOutlinedIcon from '@material-ui/icons/ThumbUpOutlined';
import ChatBubbleOutlineOutlinedIcon from '@material-ui/icons/ChatBubbleOutlineOutlined';
import './Post.css';

function Post({ profilePic, media, username, timestamp, content }) {
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
      <div className="post__options">
        <div className="post__option">
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
