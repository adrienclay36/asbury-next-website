import React, { useState, useEffect} from 'react'
import { useRouter } from 'next/router';
import AdminLayout from '../../../../components/admin/admin-layout/admin-layout'
import VolunteerRegistrationForm from '../../../../components/vbs/volunteer-registration-form';
import { getItemById } from '../../../../supabase-util';
import { supabase } from '../../../../supabase-client';
import { checkAdmin } from '../../../../supabase-util';
const EditVolunteer = () => {
    const router = useRouter();
    const registrantID = router.query.id;
    const [registrant, setRegistrant] = useState(null);

    const deleteRegistrant = async () => {
      if(registrantID) {
        const { data, error } = await supabase.from('vbs_volunteer').delete().match({ id: registrantID });
        if(error) {
          console.log("Error deleting registrant:: ", error.message);
          alert(error.message);
          return;
        }
        router.push("/admin/vbs");
      }
    }

    const confirmDelete = () => {
      const confirmation = confirm("Are you sure you want to delete this registrant? This action cannot be undone.");
      if(confirmation) {
        deleteRegistrant();
      }
    }

    const getRegistrant = async () => {
      const data = await getItemById("vbs_volunteer", registrantID);
      setRegistrant(data[0]);
    };
    useEffect(() => {
      if (registrantID) {
        getRegistrant();
      }
    }, [registrantID]);

    if (!registrant) {
      return null;
    }
  return (
    <AdminLayout>
      <div className="container flex flex-1 justify-between w-11/12 lg:w-2/6 md:w-2/6 mb-4">
        <button
          onClick={() => router.push("/admin/vbs")}
          className="font-semibold text-gray-400 hover:underline"
        >
          &larr; Go Back
        </button>
        <button
          onClick={() => confirmDelete()}
          className="font-semibold text-red-300 hover:underline"
        >
          Delete record
        </button>
      </div>
      <VolunteerRegistrationForm editValues={registrant} editing={true} />
    </AdminLayout>
  );
}

export default EditVolunteer


export const getServerSideProps = async ({ req, res }) => {
  return checkAdmin(req);
};