import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Avatar } from '@material-ui/core';
import ThumbUpOutlinedIcon from '@material-ui/icons/ThumbUpOutlined';
import ChatBubbleOutlineOutlinedIcon from '@material-ui/icons/ChatBubbleOutlineOutlined';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';
import { selectUser, submitLike } from '../user/userSlice';
import { deletePost } from './postSlice';
import MakeComment from '../comment/MakeComment';
import Comment from '../comment/Comment';
import ReactPlayer from 'react-player';

import './Post.css';

function Post({ image, video, timestamp, content, postId, postComments, postUser, postUserId }) {
  const [likes, setLikes] = useState(0);
  const [makeComment, setMakeComment] = useState(false);
  const user = useSelector(selectUser);
  const userId = user.id;
  const dispatch = useDispatch();


  useEffect(() => {
    getNumLikes()
  }, [user])

  const onSubmit = async (e) => {
    e.preventDefault();
    dispatch(submitLike({ userId, postId }))
  }

  const deleteUserPost = () => {
    dispatch(deletePost(postId))
  }

  const getNumLikes = () => {
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
      <div key={comment.id} >
        <Comment
          id={comment.id}
          userId={comment.user_id}
          content={comment.content}
        />
      </div>
    )
  })

  return (
    <div className='post' id={postId}>
      <div className='post__top'>
        <Avatar src={postUser && `${postUser.avatar_url}`} className='post__avatar' />
        <div className="post__top--info">
          <h3>{postUser && `${postUser.first_name} ${postUser.last_name}`}</h3>
          <p>{timestamp}</p>
        </div>
        {postUserId === user.id ? (
          <div className="post__top--deletePost">
            <Button variant="contained" onClick={deleteUserPost}>
              <DeleteIcon style={{ color: "#107D7E" }} />
            </Button>
          </div>) : null}
      </div>
      <div className="post__bottom">
        <p>{content}</p>
      </div>
      <div className="post__media">
        {image &&
          <img src={image} alt='' />}
        {video &&
          <div className="post__mediaPlayer">
            <ReactPlayer
              width="100%"
              maxHeight="100px"
              controls
              url={video} />
          </div>}
      </div>
      <div className="post__likes">
        <p>{`${likes} Likes`}</p>
        {/* <p>{numComments ? numComments : null}</p> */}
      </div>
      <div className="post__options">
        <div onClick={onSubmit} className="post__option">
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
