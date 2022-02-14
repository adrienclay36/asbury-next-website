import React from 'react'
import { supabase } from '../../../supabase-client'
import AdminLayout from '../../../components/admin/admin-layout/admin-layout'
import AddAdminForm from '../../../components/admin/add-admin/add-admin-form'
const AddAdminHome = (props) => {
  return (
    <AdminLayout>
        <AddAdminForm/>
    </AdminLayout>
  )
}

export default AddAdminHome

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