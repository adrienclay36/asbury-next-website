import React, { useContext, useState } from 'react'
import { UserContext } from '../../../store/user-context';
import { useRouter } from 'next/router';
import { HiOutlinePhotograph } from 'react-icons/hi';
import Dropzone from 'react-dropzone';
import SkeletonPost from '../../ui/skeleton-post';
import Image from 'next/image';
import { Modal, Skeleton } from '@mantine/core';
import { AiOutlineCheckCircle } from 'react-icons/ai';

import { Loader } from '@mantine/core';
import { supabase } from '../../../supabase-client';
import { updateItemInTable } from '../../../supabase-util';
const AdminProfileCard = ({ user }) => {
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const userContext = useContext(UserContext);
  const router = useRouter();


  const uploadPhoto = async (files) => {
    setLoading(true);
    
    try{
      const { data, error } = await supabase.storage.from("avatars").remove([userContext.avatarURL])

    } catch(err) {
      console.log(err.message);
    }
    console.log(files[0].name);

    const { data: photoData, error: photoError} = await supabase.storage
      .from("avatars")
      .upload(files[0].name, files[0]);
      if(!photoError) {
        setSuccess(true);
      }

    const response = await updateItemInTable('users', userContext.user.id, {avatar_url: files[0].name})
    

      setLoading(false)
      userContext.checkUser();
  }
  if(userContext.loading) {
    return <SkeletonPost/>
  }
  
  return (
    <>
      <Modal centered opened={success} onClose={() => setSuccess(false)}>
        <div className="flex flex-1 flex-col justify-center items-center text-center">

        <AiOutlineCheckCircle size={75} className="text-emerald-700 mb-12"/>
        <p className="font-semibold text-lg">
          Your Profile picture has been updated successfully! This make take a
          while to show up everywhere.
        </p>
        </div>
      </Modal>

      <div className="flex flex-1 flex-col justify-center p-10 items-center w-11/12 lg:w-2/6 md:w-4/6 border-2 rounded-lg shadow-md mx-auto my-12">
        <div>
          <Image
            loading="lazy"
            key={userContext.user.id}
            height={200}
            width={200}
            className="rounded-full object-cover shadow-lg"
            src={userContext.avatarURL}
            alt={userContext.firstName}
          />
          <p className="mt-4 font-extrabold text-center">
            {userContext.firstName} {userContext.lastName}
          </p>
          <p className="font-semibold text-seaFoam-500 text-center">
            {userContext.title}
          </p>
        </div>

        <div className="my-4">
          <p className="font-semibold text-center mb-6 uppercase">
            Permissions:
          </p>
          <ul className="text-center">
            {userContext.blogPermissions && (
              <li>
                <p className="font-semibold mb-1">Edit The Blog</p>
              </li>
            )}
            {userContext.socialPermissions && (
              <li>
                <p className="font-semibold mb-1">
                  Moderate Social Media Posts
                </p>
              </li>
            )}
            {userContext.libraryPermissions && (
              <li>
                <p className="font-semibold mb-1">Curate the Library</p>
              </li>
            )}
            {userContext.invitePermissions && (
              <li>
                <p className="font-semibold mb-1">Invite Other Moderators</p>
              </li>
            )}
          </ul>
        </div>

        {!loading && (
          <Dropzone onDrop={(files) => uploadPhoto(files)}>
            {({ getRootProps, getInputProps }) => (
              <section className="p-10 border-2 rounded-lg flex flex-1 justify-center items-center w-full mx-auto">
                <div {...getRootProps()}>
                  <input {...getInputProps()} />
                  <HiOutlinePhotograph size={50} />
                </div>
              </section>
            )}
          </Dropzone>
        )}
        {loading && <Loader color="dark" size="lg" variant="dots" />}


        <button onClick={() => router.push("/admin/change-password")} className="mt-12 font-semibold text-gray-500 hover:underline">Change Your Password</button>
      </div>
    </>
  );
}

export default AdminProfileCard