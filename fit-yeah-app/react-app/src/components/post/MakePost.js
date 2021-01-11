import React, { useState } from 'react';
import { Avatar } from '@material-ui/core';
import VideocamIcon from '@material-ui/icons/Videocam';
import AddPhotoAlternateIcon from '@material-ui/icons/AddPhotoAlternate';
import './MakePost.css';

function MakePost() {
  const [input, setInput] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault();
    setInput('')
  }

  return (
    <div className='makePost'>
      <div className="makePost__top">
        <Avatar />
        <form>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="makePost__input"
            placeholder="What's on your mind, User?" />
          <button
            type="submit"
            onClick={handleSubmit}>
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
