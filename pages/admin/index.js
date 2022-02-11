import React from 'react';
import AdminForm from '../../components/admin/admin-form';
import { supabase } from '../../supabase-client';
const Admin = () => {
  return (
      <AdminForm/>
  );
};

export default Admin;


export const getServerSideProps = async ({req, res}) => {
  const { user } = await supabase.auth.api.getUserByCookie(req);
  if (user) {
    return {
      props: {},
      redirect: { destination: "/admin/admin-dashboard" },
    };
  }
  return {
    props: {},
  };
}
