import React, { useState, useEffect } from "react";
import { auth } from "../../../firebase-config";
import { onAuthStateChanged } from "firebase/auth";
import AdminLayout from "../../../components/admin/admin-layout/admin-layout";
import { useRouter } from "next/router";
import { getBlogPostByID } from "../../../firebase-util";
import PageLoading from "../../../components/PageLoading/PageLoading";
import PostEditForm from "../../../components/admin/blog-dash/post-edit-form";
import BlogContextProvider from "../../../components/admin/blog-dash/blog-store";
const EditPost = () => {
  const [post, setPost] = useState();
  const [user, setUser] = useState();
  const router = useRouter();
  const postID = router.query.postID;

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        router.push("/admin");
        return;
      }

      setUser(currentUser);
    });
    return unsubscribe;
  }, [user]);

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
