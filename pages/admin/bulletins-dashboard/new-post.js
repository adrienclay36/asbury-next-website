import React from "react";
import AdminLayout from "../../../components/admin/admin-layout/admin-layout";
import BulletinProvider from "../../../store/blog-store";
import NewPostForm from "../../../components/admin/blog-dash/new-post-form";
import { getPermissions } from "../../../supabase-util";
const NewPost = () => {
  return (
    <BulletinProvider>
      <AdminLayout>
        <NewPostForm />
      </AdminLayout>
    </BulletinProvider>
  );
};

export default NewPost;

export const getServerSideProps = async ({ req, res }) => {
  return getPermissions(req, ["blog", "master"]);
};
