import React from 'react';
import AdminLayout from '../../../components/admin/admin-layout/admin-layout';
import AdminBlogProvider from '../../../components/admin/blog-dash/blog-store';
import NewPostForm from '../../../components/admin/blog-dash/new-post-form';
import { supabase } from '../../../supabase-client';
const NewPost = () => {
  return (
    <AdminBlogProvider>
    <AdminLayout>
      <NewPostForm/>
    </AdminLayout>
    </AdminBlogProvider>
  );
};

export default NewPost;


export const getServerSideProps = async ({ req, res }) => {
  const { user } = await supabase.auth.api.getUserByCookie(req);
  if (!user) {
    return {
      props: {},
      redirect: { destination: "/admin" },
    };
  }
  return {
    props: { user },
  };
};
