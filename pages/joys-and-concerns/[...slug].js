import React, { useState, useEffect, useContext } from "react";
import { supabase } from "../../supabase-client";
import Layout from "../../components/layout/layout";
import FrontPrayerContextProvider from "../../components/joys-and-concerns/board-view/main-board-store";
import SectionHeading from "../../components/ui/section-heading";
import IndividualPost from "../../components/joys-and-concerns/board-view/individual-post/individual-post";
import { useRouter } from "next/router";
import CommentList from "../../components/joys-and-concerns/board-view/comment-list/comment-list";
import PageLoading from "../../components/PageLoading/PageLoading";
import { FrontPrayerContext } from "../../components/joys-and-concerns/board-view/main-board-store";
const IndividualPrayer = (props) => {
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
      setPost(data[0]);
    }
  };
  useEffect(() => {
    getPost();
  }, [postID]);

  if (!post) {
    return (
      <Layout title="Asbury UMC">
        <SectionHeading title="Joys & Concerns">
          <PageLoading />
        </SectionHeading>
      </Layout>
    );
  }


  const navigate = () => {
    router.push("/joys-and-concerns");
  }

  return (
      <Layout
        title={post.author}
        description={
          post.postcontent.length > 140
            ? post.postcontent.slice(0, 140) + "..."
            : post.postcontent
        }
      >
        <SectionHeading title={`Post by ${post.author}`}>
          <div className="flex flex-1 justify-center items-center">
            <button
              className="px-4 py-2 bg-seaFoam-600 rounded-md shadow-md text-white"
              onClick={navigate}
            >
              Back To All Posts
            </button>
          </div>
          <IndividualPost
            id={post.id}
            author={post.author}
            content={post.postcontent}
            likes={post.likes}
            type={post.posttype}
            date={post.postdate}
          />
          <CommentList postID={post.id} />
        </SectionHeading>
      </Layout>
  );
};

export default IndividualPrayer;

// export const getStaticPaths = async () => {
//   const { data } = await supabase.from("prayers").select();

//   const paths = data.map((item) => ({
//     params: { slug: [item.author, item.id.toString()] },
//   }));

//   return {
//     paths: paths,
//     fallback: "blocking",
//   };
// };

// export const getStaticProps = async (context) => {
//   const slug = context.params.slug;
//   const { data } = await supabase.from("prayers").select().eq("id", slug[1]);

//   return {
//     props: {
//       post: data[0],
//     },
//     revalidate: 3600,
//   };
// };
