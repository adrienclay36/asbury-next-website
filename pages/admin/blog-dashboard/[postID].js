import React, { useState, useEffect } from "react";
import { useSupaBaseAuth } from "../../../hooks/useSupaBaseAuth";
import { useRouter } from "next/router";
import AdminLayout from "../../../components/admin/admin-layout/admin-layout";
import PageLoading from "../../../components/PageLoading/PageLoading";
import PostEditForm from "../../../components/admin/blog-dash/post-edit-form";
import AdminBlogProvider from "../../../components/admin/blog-dash/blog-store";
import axios from 'axios';
const EditPost = () => {
  const [post, setPost] = useState();
  const router = useRouter();
  const postID = router.query.postID;
  const user = useSupaBaseAuth();
  

  const getPost = async () => {
    const response = await axios.get(`/api/blog/${postID}`);
    setPost(response.data.post);
  };

  useEffect(() => {
    if (postID) {
      getPost();
    }
  }, [postID]);

  if (!user) return null;

 

  return (
    <AdminBlogProvider>
      <AdminLayout>
        {!post && <PageLoading />}
        {post && <PostEditForm post={post} id={post._id} />}
      </AdminLayout>
    </AdminBlogProvider>
  );
};

export default EditPost;

// export const getStaticPaths = async () => {
//   const { posts } = await getAllPosts();
//   const paths = posts.map((post) => ({ params: { postID: post._id } }));

//   return {
//     paths: paths,
//     fallback: "blocking",
//   };
// };

// export const getStaticProps = async (context) => {
//   const postID = context.params.postID;
//   const post = await getPostById(postID);

//   return {
//     props: {
//       post: post.post,
//     },
//     revalidate: 30,
//   };
// };
