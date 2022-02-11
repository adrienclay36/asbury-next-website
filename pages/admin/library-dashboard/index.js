import React, { useEffect, useState } from "react";
import AdminLayout from "../../../components/admin/admin-layout/admin-layout";
import { supabase } from "../../../supabase-client";
import LibraryOperations from "../../../components/admin/library-dash/library-operations";
import LibraryProvider from "../../../components/admin/library-dash/library-admin-store";
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
