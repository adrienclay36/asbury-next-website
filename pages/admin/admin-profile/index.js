import React from 'react'
import { checkAdmin } from '../../../supabase-util'
import AdminLayout from '../../../components/admin/admin-layout/admin-layout'
import AdminProfileCard from '../../../components/admin/admin-profile/admin-profile-card'
const AdminProfile = ({ user }) => {
  return (
      <AdminLayout>
          <AdminProfileCard user={user}/>
      </AdminLayout>
  )
}

export default AdminProfile


export const getServerSideProps = async ({ req, res }) => {
  return checkAdmin(req);
};