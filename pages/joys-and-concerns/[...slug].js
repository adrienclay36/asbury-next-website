import React, { useState, useEffect, useContext } from "react";
import { supabase } from "../../supabase-client";
import Layout from "../../components/layout/layout";
import SectionHeading from "../../components/ui/section-heading";
import IndividualPost from "../../components/joys-and-concerns/board-view/individual-post/individual-post";
import { useRouter } from "next/router";
import CommentList from "../../components/joys-and-concerns/board-view/comment-list/comment-list";
import { FrontPrayerContext } from "../../components/joys-and-concerns/board-view/main-board-store";
import { getUser, downloadImage } from "../../supabase-util";
import SkeletonPost from "../../components/ui/skeleton-post";
import UserIndividualPost from "../../components/joys-and-concerns/board-view/individual-post/user-individual-post";
const IndividualPrayer = () => {
  const [post, setPost] = useState();
  const router = useRouter();
  const prayerContext = useContext(FrontPrayerContext);

  let postID;
  if (router.query.slug) {
    postID = router.query.slug[1];
  }

  const getPost = async () => {
    if (postID) {
      const { data, error } = await supabase
        .from("prayers")
        .select()
        .match({ id: postID });
      const fetchedPost = data[0];
        setPost(fetchedPost);
    }
  };
  useEffect(() => {
    getPost();
  }, [postID]);

  if (!post) {
    return (
      <Layout title="Loading Post">
        <SectionHeading title="Joys & Concerns">
          <SkeletonPost />
        </SectionHeading>
      </Layout>
    );
  }

  const navigate = () => {
    router.push("/joys-and-concerns");
  };

  if (post) {
    return (
      <Layout
        title={post.author}
        description={
          post.postcontent.length > 140
            ? post.postcontent.slice(0, 140) + "..."
            : post.postcontent
        }
      >
        <SectionHeading title={`Joys & Concerns`}>
          <div className="flex flex-1 justify-center items-center">
            <button
              className="px-4 py-2 bg-seaFoam-600 rounded-md shadow-md text-white"
              onClick={navigate}
            >
              Back To All Posts
            </button>
          </div>
          <IndividualPost
            id={post?.id}
            author={post?.author}
            content={post?.postcontent}
            likes={post?.likes}
            type={post?.posttype}
            date={post?.created_at}
            avatar_url={post?.avatar_url}
          />
          <CommentList postID={post.id} />
        </SectionHeading>
      </Layout>
    );
  }

  
};

export default IndividualPrayer;

export const getServerSideProps = (context) => {
  return {
    props: {},
    redirect: { destination: "/" } 
  }
}
