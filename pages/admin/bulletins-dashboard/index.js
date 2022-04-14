import React, { useEffect, useState } from "react";
import AdminLayout from "../../../components/admin/admin-layout/admin-layout";
import BlogOperations from "../../../components/admin/blog-dash/blog-operations";
import BulletinProvider from "../../../store/blog-store";
import { checkAdmin } from "../../../supabase-util";
const BlogDashboard = () => {
  return (
    <BulletinProvider>
      <AdminLayout>
        <BlogOperations />
      </AdminLayout>
    </BulletinProvider>
  );
};

export default BlogDashboard;

export const getServerSideProps = async ({ req, res }) => {
  const authStatus = await checkAdmin(req);

  return authStatus;
};
