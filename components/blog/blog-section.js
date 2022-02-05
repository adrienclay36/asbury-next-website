import React from "react";
import styles from "./blog-section.module.css";
import BlogPostList from "./all-blog-posts/blog-post-list";
import SectionHeading from "../ui/section-heading";
const BlogSection = () => {


  return (
    <SectionHeading title="Blog">
      <BlogPostList posts={blogPosts} />
    </SectionHeading>
  );
};

export default BlogSection;

export const blogPosts = [
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
    author: "Kevin Chavez",
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
    author: "John Doe",
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
    author: "Jane Doe",
    date: new Date(),
    featured: false,
    image:
      "https://images.unsplash.com/photo-1538650438361-acc2e703c17b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque eum est, iusto corrupti eveniet earum reprehenderit! Rerum officiis illo nobis. Recusandae natus soluta fugiat voluptates ipsum, odit mollitia totam expedita. Animi omnis explicabo numquam enim eos odio iure minima, quisquam earum! Dolor id, harum blanditiis cupiditate delectus iure dolores quibusdam?",
  },
];
