import React, { useEffect, useState } from "react";
import AdminLayout from "../../../components/admin/admin-layout/admin-layout";
import BlogOperations from "../../../components/admin/blog-dash/blog-operations";
import { useRouter } from "next/router";
import AdminBlogProvider from "../../../components/admin/blog-dash/blog-store";
import { supabase } from "../../../supabase-client";

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