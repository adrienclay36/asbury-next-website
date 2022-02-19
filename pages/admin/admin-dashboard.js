import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import AdminLayout from '../../components/admin/admin-layout/admin-layout';
import WelcomeDash from '../../components/admin/welcome-dash/welcome-dash';
import { supabase } from '../../supabase-client';
import { checkAdmin } from '../../supabase-util';

const AdminDashboard = ({ user }) => {

  return (
     <AdminLayout>
         <WelcomeDash/>
     </AdminLayout>
  );
};

export default AdminDashboard;


export const getServerSideProps = async ( { req, res } ) => {
    const authStatus = await checkAdmin(req);
    return authStatus;
}
