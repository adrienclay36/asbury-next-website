import React from 'react';
import FeaturedPostItem from './featured-post-item';
const FeaturedPosts = ({ posts }) => {
  return (
    <section className="container grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 my-12">
      {posts.map((post) => (
        <FeaturedPostItem
          key={post.id}
          id={post.id}
          title={post.title}
          author={post.author}
          date={post.date}
          content={post.content}
          image={post.image}
        />
      ))}
    </section>
  );
};

export default FeaturedPosts;


