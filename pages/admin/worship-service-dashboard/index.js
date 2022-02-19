import React from 'react'
import AdminLayout from '../../../components/admin/admin-layout/admin-layout';
import WorshipServiceOperations from '../../../components/admin/service-dash/worship-service-operations';
import { checkAdmin } from '../../../supabase-util';
const ProgramsDashboard = () => {
  return (
    <AdminLayout>
      <WorshipServiceOperations/>
    </AdminLayout>
  );
}

export default ProgramsDashboard


export const getServerSideProps = async ({ req, res }) => {
  return checkAdmin(req);
};