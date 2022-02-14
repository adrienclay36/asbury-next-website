import React from 'react'
import AdminLayout from '../../../components/admin/admin-layout/admin-layout'
import { supabase } from '../../../supabase-client'
import UserOperations from '../../../components/admin/change-password/user-operations'
const ChangePasswordHome = ({ user }) => {
  return (
    <AdminLayout>
        <UserOperations user={user}/>
    </AdminLayout>
  )
}

export default ChangePasswordHome


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