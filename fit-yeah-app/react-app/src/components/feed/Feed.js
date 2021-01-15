import React, { useEffect, useState } from 'react';
import MakePost from '../post/MakePost';
import Post from '../post/Post';
import { getPosts, selectPosts } from '../post/postSlice';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser, selectFollowing } from '../user/userSlice';

import './Feed.css';

function Feed() {
  const dispatch = useDispatch();
  const stateUser = useSelector(selectUser);
  const posts = useSelector(selectPosts);
  const userId = stateUser.user.id
  const followingUsers = useSelector(selectFollowing)

  useEffect(() => {
    dispatch(getPosts(userId))
  }, [])

  const getPostUser = (postUserId) => {
    for (let value of followingUsers) {
      if (value.id === postUserId) {
        return `${value.first_name} ${value.last_name}`
      }
    }
  }

  const usersPosts = posts.map((post) => {
    return (
      <div key={post.id}>
        <Post
          profilePic={stateUser.user.avatar_url ?
            stateUser.user.avatar_url : null}
          media={post.img_url}
          username={userId === post.owner_id ?
            `${stateUser.user.first_name} ${stateUser.user.last_name}` :
            `${getPostUser(post.owner_id)}`}
          content={post.description}
          timestamp={post.createdAt}
          postId={post.id}
        />
      </div>
    )
  })

  return (
    <div className="feed">
      <MakePost />
      <div className="feed__post">
        {posts && usersPosts}
      </div>
    </div >
  )
}

export default Feed;
