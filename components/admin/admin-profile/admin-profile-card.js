import React, { useState, useEffect, useContext} from 'react'
import { getSignedUrl } from '../../../supabase-util';
import { UserContext } from '../../../store/user-context';
import { useRouter } from 'next/router';
import SkeletonPost from '../../joys-and-concerns/board-view/post-item/skeleton-post';
const AdminProfileCard = ({ user }) => {
  const userContext = useContext(UserContext);
  const router = useRouter();
  
  
  return (
    <>
      {userContext.loading && <SkeletonPost />}
      {!userContext.loading && (
        <div className="flex flex-1 flex-col justify-center p-10 items-center w-11/12 lg:w-2/6 md:w-4/6 border-2 rounded-lg shadow-md mx-auto my-12">
          <div>
            <img
              className="h-40 w-40 rounded-full object-cover"
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
                  <p className="font-semibold mb-1">Moderate Social Media Posts</p>
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
          <button onClick={() => router.push("/admin/edit-profile")} className="font-semibold text-gray-500 hover:underline">Edit Information</button>
        </div>
      )}
    </>
  );
}

export default AdminProfileCard