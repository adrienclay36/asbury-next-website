import React from "react";
import LibraryProvider from "../../../store/library-store";
import AdminLayout from "../../../components/admin/admin-layout/admin-layout";
import NewBookForm from "../../../components/admin/library-dash/new-book/new-book-form";
import { getPermissions } from "../../../supabase-util";
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
  return getPermissions(req, ['master', 'library'])
};

