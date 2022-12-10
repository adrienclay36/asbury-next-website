import React from 'react';
import { BulletinItem } from '../../../types/bulletin-item';
import BlogHomePage from './blog-home-page';
import EventsHomePage from './events-home-page.js';

interface Props {
  posts: BulletinItem[];
}

const BlogEvents: React.FC<Props> = ({ posts }) => {
  return (
    <section id="features" className="bg-gray-100 py-12">
      <div className="text-center flex flex-1 justify-center">
        <div className="h-1 w-60 rounded-lg bg-gray-400 mx-10 mt-5"></div>
        <h1 className="uppercase text-3xl">Blog & Events</h1>
        <div className="h-1 w-60 rounded-lg bg-gray-400 mx-10 mt-5"></div>
      </div>
      <div className="container grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-5 mt-12 w-full">
          <BlogHomePage posts={posts}/>
          <EventsHomePage/>
      </div>
    </section>
  );
};

export default BlogEvents;
