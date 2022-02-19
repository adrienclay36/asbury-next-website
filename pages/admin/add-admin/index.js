import React from 'react'
import { supabase } from '../../../supabase-client'
import AdminLayout from '../../../components/admin/admin-layout/admin-layout'
import AddAdminForm from '../../../components/admin/add-admin/add-admin-form'
import { getPermissions } from '../../../supabase-util'
const AddAdminHome = (props) => {
  return (
    <AdminLayout>
        <AddAdminForm/>
    </AdminLayout>
  )
}

export default AddAdminHome

export const getServerSideProps = async ({ req, res }) => {
  return getPermissions(req, ['invite', 'master']);
};