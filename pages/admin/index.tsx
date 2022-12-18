import { GetServerSideProps } from 'next';
import React from 'react';
import AdminForm from '../../components/admin/admin-form';
import { supabase } from '../../supabase-client';
const Admin = () => {
  return (
      <AdminForm/>
  );
};

export default Admin;


export const getServerSideProps: GetServerSideProps = async ({req, res}) => {
  const { user, error } = await supabase.auth.api.getUserByCookie(req);
  if(error) { 
    console.log(error);
  }
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
