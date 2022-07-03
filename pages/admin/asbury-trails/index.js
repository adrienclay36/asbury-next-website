import React from 'react'
import { supabase } from '../../../supabase-client'
import AdminLayout from '../../../components/admin/admin-layout/admin-layout';
import AdminTrailsList from '../../../components/admin/asbury-trails/admin-trails-list';
import { checkAdminBooleanValue } from '../../../supabase-util';
const AsburyTrailsAdmin = ({ files }) => {
  return (
    <AdminLayout>
        <AdminTrailsList existingFiles={files}/>
    </AdminLayout>
  )
}

export default AsburyTrailsAdmin

export const getServerSideProps = async ({ req, res }) => {
    const { user } = await supabase.auth.api.getUserByCookie(req);
    if (!user) {
      return {
        props: {},
        redirect: { destination: "/admin" },
      };
    }
    
    const { data, error } = await supabase.from('asbury_trails').select().order('created_at', { ascending: false });


    if(error) {
        console.log("Error getting trails:: ", error.message)
        return {
            props: {
                files: [],
            }
        }
    }
    
    return { 
        props: {
            files: data,
        }
    }
}