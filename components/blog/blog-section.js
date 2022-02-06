import React from "react";
import styles from "./blog-section.module.css";
import BlogPostList from "./all-blog-posts/blog-post-list";
import SectionHeading from "../ui/section-heading";

const BlogSection = ({ posts }) => {


  return (
    <SectionHeading title="Blog">
      <BlogPostList posts={posts} />
    </SectionHeading>
  );
};

export default BlogSection;

