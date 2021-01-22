import React, { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectUser } from '../user/userSlice';
import { selectComments, getComments } from '../comment/commentSlice';
import { Avatar } from '@material-ui/core';
import './MakeComment.css';

function MakeComment({ postId }) {
  const [content, setContent] = useState('');
  const commentForm = useRef(null);
  const user = useSelector(selectUser);
  const comments = useSelector(selectComments);
  const userId = user.id;
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append('content', content);
    formData.append('user_id', userId)
    formData.append('post_id', postId);
    for (let value of formData.values()) {
      console.log(value)
    }
    const response = await fetch('api/comments/new', {
      method: 'POST',
      body: formData
    })
    setContent('')
    dispatch(getComments(postId))
    return await response.json()
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
