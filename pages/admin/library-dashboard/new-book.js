import React from "react";
import LibraryProvider from "../../../components/admin/library-dash/library-admin-store";
import AdminLayout from "../../../components/admin/admin-layout/admin-layout";
import NewBookForm from "../../../components/admin/library-dash/new-book/new-book-form";
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
