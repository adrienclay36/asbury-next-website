import React, { useEffect, useCallback, useState } from 'react'
import { useRouter } from 'next/router';
import { getItemById } from '../../../../supabase-util';
import AdminLayout from '../../../../components/admin/admin-layout/admin-layout';
import ChildRegistrationForm from '../../../../components/vbs/child-registration-form';

const EditRegistrant = () => {
  const router = useRouter();
  const registrantID = router.query.id;
  const [registrant, setRegistrant] = useState(null);
  

  const getRegistrant = async () => {
    const data = await getItemById('vbs_children', registrantID);
    setRegistrant(data[0]);
    console.log(data[0]);
  }
  useEffect(() => {
    console.log(registrantID);
    if(registrantID) {
      getRegistrant()
    }
  }, [registrantID])

  if(!registrant) {
    return null;
  }
  return (
    <AdminLayout>
      <ChildRegistrationForm editValues={registrant} editing={true}/>
    </AdminLayout>
  )
}

export default EditRegistrant