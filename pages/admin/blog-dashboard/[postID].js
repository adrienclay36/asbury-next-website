import React, { useState, useEffect } from "react";
import { auth } from "../../../firebase-config";

import AdminLayout from "../../../components/admin/admin-layout/admin-layout";
import { useRouter } from "next/router";
import { getBlogPostByID } from "../../../firebase-util";
import PageLoading from "../../../components/PageLoading/PageLoading";
import PostEditForm from "../../../components/admin/blog-dash/post-edit-form";
import BlogContextProvider from "../../../components/admin/blog-dash/blog-store";
import { useAuth } from "../../../hooks/useAuth";
const EditPost = () => {
  const [post, setPost] = useState();
  const user = useAuth(auth);
  
  const router = useRouter();
  const postID = router.query.postID;

  
  const getPost = async () => {
    const fetchedPost = await getBlogPostByID(postID);
    setPost(fetchedPost);
  };

  useEffect(() => {
    if (postID) {
      getPost();
    }
  }, [postID]);

  if (!user) {
    return null;
  }

  return (
    <BlogContextProvider>
      <AdminLayout>
        {!post && <PageLoading />}
        {post && <PostEditForm post={post} id={postID} />}
      </AdminLayout>
    </BlogContextProvider>
  );
};

export default EditPost;
