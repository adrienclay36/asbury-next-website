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
      <div className="container w-11/12 lg:w-2/6 md:w-2/6 mb-4" mb-2>
        <button onClick={() => router.push("/admin/vbs")} className="font-semibold text-gray-400 hover:underline">&larr; Go Back</button>
      </div>
      <ChildRegistrationForm
        containerStyles="mb-40"
        editValues={registrant}
        editing={true}
      />
    </AdminLayout>
  );
}

export default EditRegistrant