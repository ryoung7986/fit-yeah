import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MakePost from '../post/MakePost';
import Post from '../post/Post';
import { getPosts, selectPosts } from '../post/postSlice';
import { selectFollowing, selectUser } from '../user/userSlice';
import { getComments, selectComments } from '../comment/commentSlice';

import './Feed.css';

function Feed() {
  const dispatch = useDispatch();
  const posts = useSelector(selectPosts);
  const comments = useSelector(selectComments);
  const followingUsers = useSelector(selectFollowing)
  const user = useSelector(selectUser);

  const postOrder = posts.slice().sort((a, b) => {
    return (a.id > b.id) ? -1 : 1
  })

  useEffect(() => {
    dispatch(getPosts(user.id))
  }, [dispatch, user.id])

  useEffect(() => {
    posts.map(post => dispatch(getComments(post.id)))
  }, [posts, dispatch])

  const getPostUser = (postUserId) => {
    for (let value of followingUsers) {
      if (value.id === postUserId) {
        return value
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
          key={post.id}
          postUser={user.id === post.owner_id ?
            user : getPostUser(post.owner_id)}
          profilePic={user.avatar_url ?
            user.avatar_url : null}
          image={post.img_url}
          video={post.video_url}
          content={post.description}
          timestamp={post.createdAt}
          postId={post.id}
          postComments={postComments}
          postUserId={post.owner_id}
        />
      </div>
    )
  })

  return (
    <div className="feed">
      <MakePost user={user} first_name={user} />
      {postOrder && usersPosts}
    </div >
  )
}

export default Feed;
