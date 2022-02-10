import React, { useEffect, useState } from "react";
import Layout from "../../components/layout/layout";
import BlogSection from "../../components/blog/blog-section";
import MainBlogProvider from "../../components/blog/blog-store-main";

const BlogHome = () => {
  return (
    <MainBlogProvider>
      <Layout
        title="Blog"
        description={"Asbury Blog - Keep up to date with us!"}
      >
        <BlogSection />
      </Layout>
    </MainBlogProvider>
  );
};

export default BlogHome;
