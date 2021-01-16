import React, { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectUser } from '../user/userSlice';
import { selectComments, getComments } from '../comment/commentSlice';
import { Avatar } from '@material-ui/core';
import './MakeComment.css';

function MakeComment({ postId }) {
  const [content, setContent] = useState('');
  const [trigger, setTrigger] = useState(0);
  const commentForm = useRef(null);
  const user = useSelector(selectUser);
  const comments = useSelector(selectComments);
  const userId = user.user.id;
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
    setTrigger(trigger => trigger + 1)
    return await response.json()
  }

  useEffect(() => {
    dispatch(getComments(postId))
  }, [trigger])

  return (
    <div className='makeComment'>
      <div className="makeComment__top">
        <Avatar />
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
