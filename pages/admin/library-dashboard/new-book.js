import React from "react";
import LibraryProvider from "../../../components/admin/library-dash/library-admin-store";
import AdminLayout from "../../../components/admin/admin-layout/admin-layout";
import NewBookForm from "../../../components/admin/library-dash/new-book/new-book-form";
import { useAuth } from "../../../hooks/useAuth";
import { auth } from "../../../firebase-config";
const NewBook = () => {

  const user = useAuth(auth);

  if (!user) {
    return null;
  }
  return (
    <LibraryProvider>
      <AdminLayout>
          <NewBookForm/>
      </AdminLayout>
    </LibraryProvider>
  );
};

export default NewBook;
