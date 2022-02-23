import React from 'react';
import AdminLayout from '../../../components/admin/admin-layout/admin-layout';
import AdminBlogProvider from '../../../components/admin/blog-dash/blog-store';
import NewPostForm from '../../../components/admin/blog-dash/new-post-form';
import { getPermissions } from '../../../supabase-util';
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
  return getPermissions(req, ['blog', 'master']);
};
