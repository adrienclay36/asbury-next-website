import React, { useEffect, useState} from 'react';
import AdminLayout from '../../../components/admin/admin-layout/admin-layout';
import BlogOperations from '../../../components/admin/blog-dash/blog-operations';
import { useRouter } from 'next/router';
import BlogContextProvider from '../../../components/admin/blog-dash/blog-store';
import { auth } from '../../../firebase-config';
import { useAuth } from '../../../hooks/useAuth';
const BlogDashboard = () => {
    const router = useRouter();
    const user = useAuth(auth);
   


    

    if (!user) {
      return null;
    }
  return (
          <BlogContextProvider>
      <AdminLayout>
          <BlogOperations/>
        </AdminLayout>
          </BlogContextProvider>
  );
};

export default BlogDashboard;
