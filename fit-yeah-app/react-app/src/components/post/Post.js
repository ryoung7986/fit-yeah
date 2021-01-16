import React from 'react';
import { Avatar } from '@material-ui/core';
import ThumbUpOutlinedIcon from '@material-ui/icons/ThumbUpOutlined';
import ChatBubbleOutlineOutlinedIcon from '@material-ui/icons/ChatBubbleOutlineOutlined';
import { selectUser } from '../user/userSlice';
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import MakeComment from '../comment/MakeComment';
import Comment from '../comment/Comment';
import { selectComments } from '../comment/commentSlice';

import './Post.css';

function Post({ profilePic, media, username, timestamp, content, postId, postComments }) {
  const [likes, setLikes] = useState(0);
  const [render, setRender] = useState(0);
  const user = useSelector(selectUser);
  const userId = user.user.id;

  const submitLike = async (e) => {
    e.preventDefault();
    const response = await fetch(`/api/users/${userId}/${postId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId, postId })
    })
    setRender(render => render + 1)
    return await response.json()
  }

  const getLikes = () => {
    (async () => {
      const response = await fetch(`/api/posts/${postId}/likes`);
      const responseData = await response.json();
      setLikes(responseData);
    })()
  }

  const renderPostComments = postComments.map((comment) => {
    return (
      <Comment
        userId={comment.user_id}
        content={comment.content}
      />
    )
  })

  useEffect(() => {
    getLikes()
  }, [render])

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
        <p>{`${likes} Likes`}</p>
        {/* <p>{numComments ? numComments : null}</p> */}
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
      <div className="post__comments">
        <MakeComment postId={postId} />
      </div>
      <div>
        {renderPostComments}
      </div>
    </div>
  )
}

export default Post
