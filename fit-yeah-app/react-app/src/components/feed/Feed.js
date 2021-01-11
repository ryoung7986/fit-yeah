import React from 'react';
import MakePost from '../post/MakePost';
import Post from '../post/Post';
import './Feed.css';

function Feed() {
  return (
    <div className="feed">
      <MakePost />
      <Post
        profilePic='https://scontent-lga3-2.xx.fbcdn.net/v/t31.0-8/10562589_10106877577980484_4161768625193891982_o.jpg?_nc_cat=106&ccb=2&_nc_sid=09cbfe&_nc_ohc=KG5BHhrJWJkAX8OLYr0&_nc_ht=scontent-lga3-2.xx&oh=20a5a2038ff737f47b63ff2f52c536ad&oe=60202ADA'
        media='https://images.unsplash.com/photo-1517836357463-d25dfeac3438?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80'
        username='ryoung7986'
        timestamp='Timestamp...'
        content='This is a post!'
      />
    </div>
  )
}

export default Feed
