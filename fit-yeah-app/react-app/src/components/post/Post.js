import React from 'react';
import { Avatar } from '@material-ui/core';
import ThumbUpOutlinedIcon from '@material-ui/icons/ThumbUpOutlined';
import ChatBubbleOutlineOutlinedIcon from '@material-ui/icons/ChatBubbleOutlineOutlined';
import { selectUser } from '../user/userSlice';
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import MakeComment from '../comment/MakeComment';
import Comment from '../comment/Comment';
import ReactPlayer from 'react-player';

import './Post.css';

function Post({ image, video, timestamp, content, postId, postComments, postUser }) {
  const [likes, setLikes] = useState(0);
  const [render, setRender] = useState(0);
  const [makeComment, setMakeComment] = useState(false);
  const user = useSelector(selectUser);
  const userId = user.id;

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

  const handleComment = () => {
    if (makeComment === false) {
      setMakeComment(true)
    } else {
      setMakeComment(false)
    }
  }

  const renderPostComments = postComments.map((comment) => {
    return (
      <div className="comment" id={comment.id} >
        <Comment
          id={comment.id}
          userId={comment.user_id}
          content={comment.content}
        />
      </div>
    )
  })

  useEffect(() => {
    getLikes()
  }, [render])

  return (
    <div className='post' id={postId}>
      <div className='post__top'>
        <Avatar src={postUser && `${postUser.avatar_url}`} className='post__avatar' />
        <div className="post__top--info">
          <h3>{postUser && `${postUser.first_name} ${postUser.last_name}`}</h3>
          <p>{timestamp}</p>
        </div>
      </div>
      <div className="post__bottom">
        <p>{content}</p>
      </div>
      <div className="post__media">
        {image &&
          <img src={image} alt='' />}
        {video &&
          <div className="post__mediaPlayer">
            <ReactPlayer controls url={video} />
          </div>}
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
        <div className="post__option" onClick={handleComment}>
          <ChatBubbleOutlineOutlinedIcon />
          <h3>Comment</h3>
        </div>
      </div>
      {makeComment && (
        <div className="post__comments">
          <MakeComment postId={postId} />
        </div>
      )}
      <div>
        {renderPostComments}
      </div>
    </div>
  )
}

export default Post
