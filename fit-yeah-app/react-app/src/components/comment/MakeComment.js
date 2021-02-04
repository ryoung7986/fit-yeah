import React, { useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectUser } from '../user/userSlice';
import { getComments, postComment, selectComments } from '../comment/commentSlice';
import { Avatar } from '@material-ui/core';
import './MakeComment.css';

function MakeComment({ postId }) {
  const [content, setContent] = useState('');
  const commentForm = useRef(null);
  const user = useSelector(selectUser);
  const userId = user.id;
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(postComment({ content, userId, postId }))
    dispatch(getComments(postId))
    setContent('')
  }


  return (
    <div className='makeComment'>
      <div className="makeComment__top">
        <Avatar src={user.avatar_url} />
        <form ref={commentForm} onSubmit={handleSubmit}>
          <input
            type="text"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="makeComment__input"
            placeholder={`Write a comment...`} />
          <button
            type="submit">
            Hidden Submit
          </button>
        </form>
      </div>
    </div>
  )
}

export default MakeComment
