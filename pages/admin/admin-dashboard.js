import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import AdminLayout from '../../components/admin/admin-layout/admin-layout';
import WelcomeDash from '../../components/admin/welcome-dash/welcome-dash';
import { supabase } from '../../supabase-client';

const AdminDashboard = ({ user }) => {
   

    

  return (
     <AdminLayout>
         <WelcomeDash/>
     </AdminLayout>
  );
};

export default AdminDashboard;


export const getServerSideProps = async ( { req, res } ) => {
    const { user } = await supabase.auth.api.getUserByCookie(req);
    if(!user) {
        return {
            props: {},
            redirect: { destination: "/admin"}
        }
    }
    return {
        props: { user }
    }
}
