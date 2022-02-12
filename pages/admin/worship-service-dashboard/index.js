import React from 'react'
import AdminLayout from '../../../components/admin/admin-layout/admin-layout';
import WorshipServiceOperations from '../../../components/admin/service-dash/worship-service-operations';
import { supabase } from '../../../supabase-client';
const ProgramsDashboard = () => {
  return (
    <AdminLayout>
      <WorshipServiceOperations/>
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