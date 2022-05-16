import React, { useEffect, useState } from 'react'
import AdminLayout from '../../components/admin/admin-layout/admin-layout';
import { supabase } from '../../supabase-client';
import PageLoading from '../../components/PageLoading/PageLoading';
import VBSList from '../../components/admin/vbs/vbs-list';
const VBSRegistrationHistory = () => {
  const [childRegister, setChildRegister] = useState();
  const [volunteers, setVolunteers] = useState();

  const getRegistrants = async () => {
    const { data: childrenData, error: childrenError } = await supabase.from('vbs_children').select();
    if(childrenError) {
      console.log("Error getting children registrants:: ", childrenError.message);
    }
    if(childrenData){

      setChildRegister(childrenData);
    }
    console.log(childrenData);

    const { data: volunteerData, error: volunteerError } = await supabase.from('vbs_volunteer').select();
    if(volunteerError) {
      console.log("Error getting data for volunteers:: ", volunteerError.message);
    }
    if(volunteerData) {
      setVolunteers(volunteerData);
    }
  }

  useEffect(() => {
    getRegistrants();
  }, [])

  if(!childRegister || !volunteers) {
    return (
      <AdminLayout>
        <PageLoading/>
      </AdminLayout>
    )
  }
  return (
    <AdminLayout>
      <VBSList registrants={childRegister}/>
    </AdminLayout>
  )
}

export default VBSRegistrationHistory