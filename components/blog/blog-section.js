import React, { useState, useEffect } from 'react';
import styles from './blog-section.module.css';
import FeaturedPosts from './featured-posts/featured-posts';
import AllPosts from './all-posts/all-posts';
const BlogSection = () => {
    const [all, setAll] = useState(false);
    const [featured, setFeatured] = useState(true);


    useEffect(() => {
        document.getElementById("featured").focus()
    },[])


    const viewAllHandler = () => {
        if(!all) {
            setAll(true);
            setFeatured(false);
            console.log('viewing all');
        }
        
    }
    const viewFeaturedHandler = () => {
        if(!featured){
            setAll(false);
            setFeatured(true);
            console.log("viewing featured");
            

        }
        
    }

  return (
    <section id="features" className="bg-gray-100 py-12">
      <div className="text-center flex flex-1 justify-center">
        <div className="h-1 w-60 rounded-lg bg-gray-400 mx-10 mt-5"></div>
        <h1 className="uppercase text-3xl">Blog</h1>
        <div className="h-1 w-60 rounded-lg bg-gray-400 mx-10 mt-5"></div>
      </div>

      <div className="container grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 sm:w-2/6">
        <button
          onClick={viewAllHandler}
          className={`${all ? "active focus" : ""} ${
            styles.btn
          } text-xl uppercase rounded-l-lg text-seaFoam-600 border-2 px-4 py-2 mt-12`}
        >
          All Posts
        </button>
        <button
          id="featured"
          onClick={viewFeaturedHandler}
          className={`${featured ? "active focus" : ""} ${
            styles.btn
          } text-xl uppercase rounded-r-lg text-seaFoam-600 border-2 px-4 py-2 mt-12`}
        >
          Featured Posts
        </button>
      </div>

      {featured && <FeaturedPosts posts={featuredPosts} />}
      {all && <AllPosts posts={all_posts} />}
    </section>
  );
};

export default BlogSection;




export const featuredPosts = [
  {
    id: "p1",
    title: "First Blog Post",
    author: "Adrien Clay",
    date: new Date(),
    featured: true,
    image:
      "https://images.unsplash.com/photo-1556711905-4bd1b6603275?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque eum est, iusto corrupti eveniet earum reprehenderit! Rerum officiis illo nobis. Recusandae natus soluta fugiat voluptates ipsum, odit mollitia totam expedita. Animi omnis explicabo numquam enim eos odio iure minima, quisquam earum! Dolor id, harum blanditiis cupiditate delectus iure dolores quibusdam?",
  },
  {
    id: "p2",
    title: "Second Blog Post",
    author: "Adrien Clay",
    date: new Date(),
    featured: true,
    image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque eum est, iusto corrupti eveniet earum reprehenderit! Rerum officiis illo nobis. Recusandae natus soluta fugiat voluptates ipsum, odit mollitia totam expedita. Animi omnis explicabo numquam enim eos odio iure minima, quisquam earum! Dolor id, harum blanditiis cupiditate delectus iure dolores quibusdam?",
  },
  {
    id: "p3",
    title: "Second Blog Post",
    author: "Adrien Clay",
    date: new Date(),
    featured: true,
    image:
      "https://images.unsplash.com/photo-1538650438361-acc2e703c17b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque eum est, iusto corrupti eveniet earum reprehenderit! Rerum officiis illo nobis. Recusandae natus soluta fugiat voluptates ipsum, odit mollitia totam expedita. Animi omnis explicabo numquam enim eos odio iure minima, quisquam earum! Dolor id, harum blanditiis cupiditate delectus iure dolores quibusdam?",
  },
];

export const all_posts = [
  {
    id: "p1",
    title: "First Blog Post",
    author: "Adrien Clay",
    date: new Date(),
    featured: true,
    image:
      "https://images.unsplash.com/photo-1556711905-4bd1b6603275?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque eum est, iusto corrupti eveniet earum reprehenderit! Rerum officiis illo nobis. Recusandae natus soluta fugiat voluptates ipsum, odit mollitia totam expedita. Animi omnis explicabo numquam enim eos odio iure minima, quisquam earum! Dolor id, harum blanditiis cupiditate delectus iure dolores quibusdam?",
  },
  {
    id: "p2",
    title: "Second Blog Post",
    author: "Adrien Clay",
    date: new Date(),
    featured: true,
    image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque eum est, iusto corrupti eveniet earum reprehenderit! Rerum officiis illo nobis. Recusandae natus soluta fugiat voluptates ipsum, odit mollitia totam expedita. Animi omnis explicabo numquam enim eos odio iure minima, quisquam earum! Dolor id, harum blanditiis cupiditate delectus iure dolores quibusdam?",
  },
  {
    id: "p3",
    title: "Third Blog Post",
    author: "Adrien Clay",
    date: new Date(),
    featured: true,
    image:
      "https://images.unsplash.com/photo-1538650438361-acc2e703c17b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque eum est, iusto corrupti eveniet earum reprehenderit! Rerum officiis illo nobis. Recusandae natus soluta fugiat voluptates ipsum, odit mollitia totam expedita. Animi omnis explicabo numquam enim eos odio iure minima, quisquam earum! Dolor id, harum blanditiis cupiditate delectus iure dolores quibusdam?",
  },
  {
    id: "p4",
    title: "Fourth Blog Post",
    author: "Adrien Clay",
    date: new Date(),
    featured: false,
    image:
      "https://images.unsplash.com/photo-1538650438361-acc2e703c17b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque eum est, iusto corrupti eveniet earum reprehenderit! Rerum officiis illo nobis. Recusandae natus soluta fugiat voluptates ipsum, odit mollitia totam expedita. Animi omnis explicabo numquam enim eos odio iure minima, quisquam earum! Dolor id, harum blanditiis cupiditate delectus iure dolores quibusdam?",
  },
];
