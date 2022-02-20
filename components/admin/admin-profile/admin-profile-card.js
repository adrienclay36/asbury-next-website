import React, { useContext, useState } from 'react'
import { UserContext } from '../../../store/user-context';
import { useRouter } from 'next/router';
import { HiOutlinePhotograph } from 'react-icons/hi';
import Dropzone from 'react-dropzone';
import SkeletonPost from '../../joys-and-concerns/board-view/post-item/skeleton-post';
import Image from 'next/image';
import { Modal } from '@mantine/core';
import { LoadingOverlay } from '@mantine/core';
import { supabase } from '../../../supabase-client';
const AdminProfileCard = ({ user }) => {
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const userContext = useContext(UserContext);
  const router = useRouter();


  const uploadPhoto = async (files) => {
    setLoading(true);
    try{
      const { data, error } = await supabase.storage.from("avatars").remove([`${userContext.user.id}_avatar.jpg`])

    } catch(err) {
      console.log(err.message);
    }

    const { data: photoData, error: photoError} = await supabase.storage
      .from("avatars")
      .upload(`${userContext.user.id}_avatar.jpg`, files[0]);
      if(!photoError) {
        setSuccess(true);
      }

      setLoading(false)
  }
  
  
  return (
    <>
    <Modal centered opened={success} onClose={() => setSuccess(false)}>
      <p>Your Profile picture has been updated successfully! This make take a while to show up everywhere.</p>
    </Modal>
      {userContext.loading && <SkeletonPost />}
      {
      
      !userContext.loading && (
        <div className="flex flex-1 flex-col justify-center p-10 items-center w-11/12 lg:w-2/6 md:w-4/6 border-2 rounded-lg shadow-md mx-auto my-12">
          <div>
            <Image
            loading="eager"
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
        </div>
      )}
    </>
  );
}

export default AdminProfileCard