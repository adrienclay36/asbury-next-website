import React, { useEffect, useState } from 'react';
import { getAllBlogPosts, getBlogPostByID } from '../../firebase-util';
import { getPostById, getAllPosts } from '../../mongo-util-blog';
import Layout from '../../components/layout/layout';
import SinglePostSection from '../../components/blog/single-post/single-post-section';
const SinglePost = (props) => {
    const [post, setPost] = useState(props.post);

  return (
      <Layout title={post.title} description={post.content}>
          <SinglePostSection post={post} />

      </Layout>
  );
};

export default SinglePost;


export const getStaticPaths = async () => {
    const {posts} = await getAllPosts();
    const paths = posts.map(post => ({params: { postID: post._id }}));

    return {
        paths: paths,
        fallback: 'blocking',
    }
}

export const getStaticProps = async (context) => {
    const postID = context.params.postID;
    const post = await getPostById(postID);


    return {
        props: {
            post: post.post,
        },
        revalidate: 30,
    }

}



