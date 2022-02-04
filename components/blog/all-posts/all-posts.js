import React from 'react';
import AllPostItem from './all-post-item';
const AllPosts = ({ posts }) => {
  return (
      <div className="mt-12">
      {posts.map(post => (
          <AllPostItem key={post.id} id={post.id} title={post.title} author={post.author} date={post.date} content={post.content} image={post.image} />
          ))}
    </div>
  );
};

export default AllPosts;
