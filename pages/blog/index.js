import React from 'react';
import Layout from '../../components/layout/layout';
import BlogSection from '../../components/blog/blog-section';
const BlogHome = () => {
  return (
      <Layout title="Blog" description={"Asbury Blog - Keep up to date with us!"}>
          <BlogSection/>
      </Layout>
  );
};

export default BlogHome;
