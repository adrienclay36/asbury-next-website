import React, { useEffect, useState } from "react";
import AdminLayout from "../../../components/admin/admin-layout/admin-layout";
import BlogOperations from "../../../components/admin/blog-dash/blog-operations";
import { useRouter } from "next/router";
import AdminBlogProvider from "../../../components/admin/blog-dash/blog-store";
import { supabase } from "../../../supabase-client";
import { checkAdmin } from "../../../supabase-util";

const BlogDashboard = () => {

  
  

  return (
    <AdminBlogProvider>
      <AdminLayout>
        <BlogOperations />
      </AdminLayout>
    </AdminBlogProvider>
  );
};


export default BlogDashboard;

export const getServerSideProps = async ({ req, res }) => {
  const authStatus = await checkAdmin(req);

  return authStatus;
};