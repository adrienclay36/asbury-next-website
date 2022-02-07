import React from 'react';
import { useAuth } from '../../../hooks/useAuth';
import { auth } from '../../../firebase-config';
import AdminLayout from '../../../components/admin/admin-layout/admin-layout';
import BlogContextProvider from '../../../components/admin/blog-dash/blog-store';
import NewPostForm from '../../../components/admin/blog-dash/new-post-form';
const NewPost = () => {
  const user = useAuth(auth);

  if(!user) {
    return null;
  }


  return (
    <BlogContextProvider>
    <AdminLayout>
      <NewPostForm/>
    </AdminLayout>
    </BlogContextProvider>
  );
};

export default NewPost;
