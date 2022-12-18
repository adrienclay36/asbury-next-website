import React, { useState, useEffect } from "react";
import { downloadImage, getUser } from "../../supabase-util";
import Layout from "../../components/layout/layout";
import SinglePostSection from "../../components/blog/single-post/single-post-section";
import { supabase } from "../../supabase-client";
import useGetUser from "../../hooks/useGetUser";
import useGetImage from "../../hooks/useGetImage";
import { GetStaticPaths, GetStaticProps } from "next";
import { BulletinItem } from "../../types/bulletin-item";
import { useRouter } from "next/router";

interface Props {
  post: BulletinItem;

}
const SinglePost: React.FC<Props> = (props) => {
  const router = useRouter();
  const [post, setPost] = useState<BulletinItem>(props.post);


  useEffect(() => {
    if(!props.post)
    {
      router.push("/blog");
    }
  }, [props.post])

  return (
    <Layout title={post.title} description={post.postcontent}>
      <SinglePostSection
        post={post}
      />
    </Layout>
  );
};

export default SinglePost;

export const getStaticPaths: GetStaticPaths = async () => {
  const { data } = await supabase.from("posts").select();

  if(data) {

    const paths = data.map((item) => ({
      params: { slug: [item.id.toString(), item.title] },
    }));
  
    return {
      paths: paths,
      fallback: "blocking",
    };
  }
  return {
    paths: [],
    fallback: "blocking",
  }
};

export const getStaticProps: GetStaticProps = async (context) => {
  const slug = context.params!.slug;
  if(slug) {

    const { data, error } = await supabase.from("posts").select().eq("id", slug[0]);
    if(error){
      console.log(`Error getting post for ID: ${slug[0]}:: `, error.message);
    }
    if(data && data.length > 0) {

      return {
        props: {
          post: data[0],
        },
        revalidate: 10,
      };
    }
  
  }
  return {
    props: {},
    redirect: { destination: '/blog', permanent: 'true' }
  }
};
