import React from 'react';
import BlogHomePage from './blog-home-page';
import EventsHomePage from './events-home-page.js';
const BlogEvents = ({ posts }) => {
  return (
    <section id="features" className="bg-gray-100 py-12">
      <div className="text-center flex flex-1 justify-center">
        <div className="h-1 w-60 rounded-lg bg-gray-400 mx-10 mt-5"></div>
        <h1 className="uppercase text-3xl">Blog & Events</h1>
        <div className="h-1 w-60 rounded-lg bg-gray-400 mx-10 mt-5"></div>
      </div>
      <div className="container grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-20 max-w-screen-lg mt-12">
          <BlogHomePage posts={posts}/>
          <EventsHomePage/>
      </div>
    </section>
  );
};

export default BlogEvents;
