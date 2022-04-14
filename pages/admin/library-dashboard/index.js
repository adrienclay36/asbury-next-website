import React, { useEffect, useState } from "react";
import AdminLayout from "../../../components/admin/admin-layout/admin-layout";
import LibraryOperations from "../../../components/admin/library-dash/library-operations";
import LibraryProvider from "../../../store/library-store";
import { checkAdmin } from "../../../supabase-util";
const LibraryDashboard = () => {


  return (
    <LibraryProvider>
      <AdminLayout>
          <LibraryOperations/>
      </AdminLayout>
    </LibraryProvider>
  );
};

export default LibraryDashboard;


export const getServerSideProps = async ({ req, res }) => {
  return checkAdmin(req);
};
