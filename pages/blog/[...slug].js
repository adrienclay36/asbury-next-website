import React, { useState } from 'react';
import { getItemById, getAllItems } from '../../supabase-util';
import Layout from '../../components/layout/layout';
import SinglePostSection from '../../components/blog/single-post/single-post-section';
import { supabase } from '../../supabase-client';
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
    const { data } = await supabase.from('posts').select();


    const paths = data.map((item) => ({
      params: { slug: [item.id.toString(), item.title] },
    }));

    return {
      paths: paths,
      fallback: "blocking",
    };
}

export const getStaticProps = async (context) => {
    const slug = context.params.slug;
    const { data } = await supabase.from("posts").select().eq("id", slug[0]);


    return {
        props: {
            post: data[0],
        },
        revalidate: 3600,
    }

}



