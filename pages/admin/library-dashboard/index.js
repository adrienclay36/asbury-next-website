import React, { useEffect, useState } from "react";
import AdminLayout from "../../../components/admin/admin-layout/admin-layout";
import { useRouter } from "next/router";
import { auth } from "../../../firebase-config";
import { useAuth } from "../../../hooks/useAuth";
import LibraryOperations from "../../../components/admin/library-dash/library-operations";
import LibraryContextProvider from '../../../components/admin/library-dash/library-store';
const LibraryDashboard = () => {

  const user = useAuth(auth);

  if(!user) {
    return null;
  }
  return (
    <LibraryContextProvider>
      <AdminLayout>
          <LibraryOperations/>
      </AdminLayout>
    </LibraryContextProvider>
  );
};

export default LibraryDashboard;
