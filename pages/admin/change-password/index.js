import React from 'react'
import AdminLayout from '../../../components/admin/admin-layout/admin-layout'
import { supabase } from '../../../supabase-client'
import UserOperations from '../../../components/admin/change-password/user-operations'
import { checkAdmin } from '../../../supabase-util'
const ChangePasswordHome = ({ user }) => {
  return (
    <AdminLayout>
        <UserOperations user={user}/>
    </AdminLayout>
  )
}

export default ChangePasswordHome


export const getServerSideProps = async ({ req, res }) => {
  return checkAdmin(req);
};