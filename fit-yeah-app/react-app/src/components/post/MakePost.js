import React, { useState, useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getPosts } from '../post/postSlice';
import { Avatar } from '@material-ui/core';
import VideocamIcon from '@material-ui/icons/Videocam';
import AddPhotoAlternateIcon from '@material-ui/icons/AddPhotoAlternate';
import './MakePost.css';

function MakePost({ user }) {
  const [description, setDescription] = useState('');
  const [trigger, setTrigger] = useState(0);
  const form = useRef(null);
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append('description', description);
    formData.append('user_id', user.id)
    for (let value of formData.values()) {
      console.log(value)
    }
    const response = await fetch('api/posts/new', {
      method: 'POST',
      body: formData
    })
    setDescription('')
    setTrigger(trigger => trigger + 1)
    return await response.json()
  }

  useEffect(() => {
    dispatch(getPosts(user.id))
  }, [trigger, dispatch, user.id])


  return (
    <div className='makePost'>
      <div className="makePost__top">
        <Avatar />
        <form ref={form} onSubmit={handleSubmit}>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="makePost__input"
            placeholder={`What's on your mind, ${user.first_name}?`} />
          <button
            type="submit">
            Hidden Submit
          </button>
        </form>
      </div>
      <div className="makePost__bottom">
        <div className="makePost__option">
          <VideocamIcon />
          <h3>Add Video</h3>
        </div>
        <div className="makePost__option">
          <AddPhotoAlternateIcon />
          <h3>Add Photo</h3>
        </div>
      </div>
    </div>
  )
}

export default MakePost
