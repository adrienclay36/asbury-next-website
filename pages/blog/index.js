import React, { useEffect } from 'react';
import Layout from '../../components/layout/layout';
import BlogSection from '../../components/blog/blog-section';
import { getAllBlogPosts } from "../../firebase-util";
import { BASE_URL } from '../../base_url';
import axios from 'axios';


const BlogHome = (props) => {
  return (
      <Layout title="Blog" description={"Asbury Blog - Keep up to date with us!"}>
          <BlogSection posts={props.posts}/>
      </Layout>
  );
};

export default BlogHome;


export const getStaticProps = async (context) => {
  const { posts, totalPages } = await getAllBlogPosts();


  return {
    props: {
      posts: posts,
      totalPages: totalPages,
    },
    revalidate: 60,
  }
}


