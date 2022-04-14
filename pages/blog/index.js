import React, { useEffect, useState } from "react";
import Layout from "../../components/layout/layout";
import BlogSection from "../../components/blog/blog-section";
import BulletinProvider from "../../store/blog-store";
const BlogHome = () => {
  return (
    <BulletinProvider>
      <Layout
        title="Bulletins"
        description={"Asbury Bulletin Board - Keep up to date with us!"}
      >
        <BlogSection />
      </Layout>
    </BulletinProvider>
  );
};

export default BlogHome;
