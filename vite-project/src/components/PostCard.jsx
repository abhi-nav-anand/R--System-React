import React from 'react';
import './PostCard.jsx';

const PostCard = ({ post }) => {
  return (
    <div className="post-card">
      <h2>{post.title}</h2>
      <p>{post.body}</p>
      <small>User ID: {post.userId}</small>
    </div>
  );
};

export default PostCard;
