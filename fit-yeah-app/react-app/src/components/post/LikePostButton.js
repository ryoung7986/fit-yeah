import React from 'react'
import ThumbUpOutlinedIcon from '@material-ui/icons/ThumbUpOutlined';

function LikePostButton() {
  const submitLike = () => {
    console.log("sup yo")
  }

  return (
    <button onClick={submitLike}>
      <ThumbUpOutlinedIcon />
      <h3>Like</h3>
    </button>
  )
}

export default LikePostButton
