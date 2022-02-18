import React from "react";
import { supabase } from "../../supabase-client";
import Layout from "../../components/layout/layout";
import FrontPrayerContextProvider from "../../components/joys-and-concerns/board-view/main-board-store";
import SectionHeading from "../../components/ui/section-heading";
import IndividualPost from "../../components/joys-and-concerns/board-view/individual-post/individual-post";
import { useRouter } from "next/router";
import CommentList from "../../components/joys-and-concerns/board-view/comment-list/comment-list";
const IndividualPrayer = (props) => {
  const { id, author, postcontent, likes, posttype, postdate } = props.post;
  const router = useRouter();
  return (
    <FrontPrayerContextProvider>
      <Layout
        title={author}
        description={
          postcontent.length > 140 ? postcontent.slice(0, 140) + "..." : postcontent
        }
      >
        <SectionHeading title={`Post By ${author}`}>
          <div className="flex flex-1 justify-center items-center">
            <button className="px-4 py-2 bg-seaFoam-600 rounded-md shadow-md text-white" onClick={() => router.push("/joys-and-concerns")}>
              Back To All Posts
            </button>
          </div>
          <IndividualPost
            id={id}
            author={author}
            content={postcontent}
            likes={likes}
            type={posttype}
            date={postdate}
          />
          <CommentList postID={id}/>
        </SectionHeading>
      </Layout>
    </FrontPrayerContextProvider>
  );
};

export default IndividualPrayer;

export const getStaticPaths = async () => {
  const { data } = await supabase.from("prayers").select();

  const paths = data.map((item) => ({
    params: { slug: [item.author, item.id.toString()] },
  }));

  return {
    paths: paths,
    fallback: "blocking",
  };
};

export const getStaticProps = async (context) => {
  const slug = context.params.slug;
  const { data } = await supabase.from("prayers").select().eq("id", slug[1]);

  return {
    props: {
      post: data[0],
    },
    revalidate: 1,
  };
};
