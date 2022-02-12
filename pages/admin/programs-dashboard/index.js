import React from 'react'
import AdminLayout from '../../../components/admin/admin-layout/admin-layout';
import ProgramOperations from '../../../components/admin/programs-dash/program-operations';
import { supabase } from '../../../supabase-client';
const ProgramsDashboard = () => {
  return (
    <AdminLayout>
      <ProgramOperations/>
    </AdminLayout>
  );
}

export default ProgramsDashboard


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