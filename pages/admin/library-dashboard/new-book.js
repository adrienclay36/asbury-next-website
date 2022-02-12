import React from "react";
import LibraryProvider from "../../../components/admin/library-dash/library-admin-store";
import AdminLayout from "../../../components/admin/admin-layout/admin-layout";
import NewBookForm from "../../../components/admin/library-dash/new-book/new-book-form";
import { supabase } from "../../../supabase-client";
const NewBook = () => {

  return (
    <LibraryProvider>
      <AdminLayout>
          <NewBookForm/>
      </AdminLayout>
    </LibraryProvider>
  );
};

export default NewBook;

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

