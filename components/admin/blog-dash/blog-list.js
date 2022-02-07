import React from 'react';
import BlogItem from './blog-item';
const BlogList = ({ posts }) => {
  return (
      <div>
          {posts.map(post => (
              <BlogItem key={post.id} post={post}/>
          ))}
      </div>
  );
};

export default BlogList;
