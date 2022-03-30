import React from "react";
import styles from "./blog-section.module.css";
import BlogPostList from "./all-blog-posts/blog-post-list";
import SectionHeading from "../ui/section-heading";

const BlogSection = () => {


  return (
    <SectionHeading title="Bulletins">
      <BlogPostList />
    </SectionHeading>
  );
};

export default BlogSection;

