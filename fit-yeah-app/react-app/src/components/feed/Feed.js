import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MakePost from '../post/MakePost';
import Post from '../post/Post';
import { getPosts, selectPosts } from '../post/postSlice';
import { selectUser, selectFollowing } from '../user/userSlice';
import { getComments, selectComments } from '../comment/commentSlice';

import './Feed.css';

function Feed() {
  const dispatch = useDispatch();
  const stateUser = useSelector(selectUser);
  const posts = useSelector(selectPosts);
  const comments = useSelector(selectComments);
  const followingUsers = useSelector(selectFollowing)

  useEffect(() => {
    dispatch(getPosts(stateUser.user.id))
  }, [])

  useEffect(() => {
    posts.map(post => dispatch(getComments(post.id)))
  }, [posts])



  const getPostUser = (postUserId) => {
    for (let value of followingUsers) {
      if (value.id === postUserId) {
        return `${value.first_name} ${value.last_name}`
      }
    }
  }

  const usersPosts = posts.map((post) => {
    const postComments = Array.from(new Set(comments.post_comments.map(
      comment => comment.id)))
      .map((id) => comments.post_comments.find(comment => id === comment.id))
      .filter((comment) => comment.post_id === post.id).reverse()

    return (
      <div key={post.id}>
        <Post
          profilePic={stateUser.user.avatar_url ?
            stateUser.user.avatar_url : null}
          media={post.img_url}
          username={stateUser.user.id === post.owner_id ?
            `${stateUser.user.first_name} ${stateUser.user.last_name}` :
            `${getPostUser(post.owner_id)}`}
          content={post.description}
          timestamp={post.createdAt}
          postId={post.id}
          postComments={postComments}
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
