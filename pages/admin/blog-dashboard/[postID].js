import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import AdminLayout from "../../../components/admin/admin-layout/admin-layout";
import PageLoading from "../../../components/PageLoading/PageLoading";
import PostEditForm from "../../../components/admin/blog-dash/post-edit-form";
import AdminBlogProvider from "../../../components/admin/blog-dash/blog-store";
import { supabase } from "../../../supabase-client";
import { getItemById } from "../../../supabase-util";
import { getPermissions } from "../../../supabase-util";
const table = "posts";
const EditPost = () => {
  const [post, setPost] = useState();
  const router = useRouter();
  const postID = router.query.postID;

  

  const getPost = async () => {
    const post = await getItemById(table, postID);
    setPost(post[0]);
  };

  useEffect(() => {
    if (postID) {
      getPost();
    }
  }, [postID]);

  return (
    <AdminBlogProvider>
      <AdminLayout>
        {!post && <PageLoading />}
        {post && <PostEditForm post={post} id={post.id} />}
      </AdminLayout>
    </AdminBlogProvider>
  );
};

export default EditPost;


export const getServerSideProps = async ({ req, res }) => {
  return getPermissions(req, ['blog', 'master']);
};